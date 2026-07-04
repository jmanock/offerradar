#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OFFERS_PATH = path.join(ROOT, "data", "offers.json");
const OUTBOX_DIR = path.join(ROOT, "signals", "outbox");
const SITE_URL = "https://offerradar.io";
const TODAY = new Date().toISOString().slice(0, 10);

const SOURCE_TYPE_BY_CATEGORY = {
  "bank-bonuses": "banking_offer",
  "brokerage-bonuses": "financial_offer",
  "referral-offers": "deal_alert",
  "high-yield-savings": "banking_offer",
  "business-banking": "banking_offer",
  "credit-card-offers": "credit_card_offer",
  "cash-back-apps": "cashback_offer",
};

function main() {
  fs.mkdirSync(OUTBOX_DIR, { recursive: true });
  const offers = JSON.parse(fs.readFileSync(OFFERS_PATH, "utf8"));
  const scored = offers
    .map((offer) => ({ offer, score: scoreOffer(offer), reasons: priorityReasons(offer) }))
    .filter(({ offer, score }) => shouldExportOffer(offer, score))
    .sort((a, b) => b.score - a.score);

  let exported = 0;
  let duplicates = 0;
  const files = [];

  for (const item of scored) {
    const filePath = signalFilePath(item.offer);
    if (fs.existsSync(filePath)) {
      duplicates += 1;
      continue;
    }
    const signal = signalForOffer(item.offer, item.score, item.reasons);
    fs.writeFileSync(filePath, `${JSON.stringify(signal, null, 2)}\n`);
    exported += 1;
    files.push(path.relative(ROOT, filePath));
  }

  console.log(`Offers considered: ${offers.length}`);
  console.log(`Signals exported: ${exported}`);
  console.log(`Duplicates skipped: ${duplicates}`);
  console.log(`Weak/incomplete skipped: ${offers.length - scored.length}`);
  for (const file of files) {
    console.log(`- ${file}`);
  }
}

function shouldExportOffer(offer, score) {
  if (offer.status !== "active") return false;
  if (offer.verificationStatus === "expired") return false;
  if (!offer.slug || !offer.title || !offer.provider || !offer.category) return false;
  if (!offer.sourceUrl && !offer.referralUrl) return false;
  if (isExpired(offer.expirationDate)) return false;
  return score >= 65;
}

function scoreOffer(offer) {
  let score = 0;
  const value = estimatedValue(offer);
  if (value >= 500) score += 30;
  else if (value >= 300) score += 24;
  else if (value >= 150) score += 18;
  else if (value > 0) score += 10;

  if (offer.featured) score += 12;
  if (offer.expirationDate && daysUntil(offer.expirationDate) <= 30) score += 12;
  if (beginnerFriendly(offer)) score += 10;
  if (broadAppeal(offer)) score += 10;
  if (strongAffiliatePotential(offer)) score += 10;
  if (clearCta(offer)) score += 8;
  if (offer.verificationStatus === "verified_today") score += 8;
  else if (offer.verificationStatus === "verified_this_week") score += 5;

  return Math.min(100, score);
}

function signalForOffer(offer, score, reasons) {
  const value = estimatedValue(offer);
  const sourceUrl = offer.sourceUrl || offer.referralUrl || `${SITE_URL}/${offer.slug}`;
  const affiliateUrl = offer.referralUrl || "";
  const category = categoryLabel(offer.category);
  return {
    source_project: "offer-radar",
    source_type: SOURCE_TYPE_BY_CATEGORY[offer.category] || "financial_offer",
    brand: "Offer Radar",
    title: `${offer.provider}: ${offer.title}`,
    summary: summaryForOffer(offer, value),
    description: offer.description || summaryForOffer(offer, value),
    url: sourceUrl,
    affiliate_url: affiliateUrl,
    category,
    priority: priorityFor(score, offer),
    confidence: confidenceFor(offer, score),
    tags: tagsForOffer(offer),
    expiration: offer.expirationDate || "",
    image_prompt: imagePromptForOffer(offer),
    metadata: {
      offer_id: offer.slug,
      offer_category: offer.category,
      estimated_value: value,
      affiliate_network: affiliateNetworkFor(offer),
      merchant_provider: offer.provider,
      expiration: offer.expirationDate || "",
      source_url: sourceUrl,
      priority_reason: reasons.join("; "),
      offer_amount: offer.offerAmount || "",
      offer_type: offer.offerType || "",
      verification_status: offer.verificationStatus,
      last_verified: offer.lastVerified,
      status: offer.status,
      requirements: offer.requirements || [],
      fees: offer.fees || [],
      risk_notes: offer.riskNotes || [],
    },
  };
}

function summaryForOffer(offer, value) {
  const valueText = value > 0 ? `worth about $${value}` : "with clear tracked terms";
  return `${offer.provider} has a ${offer.offerType || "financial offer"} ${valueText}. Offer Radar flagged it as useful for a quick social or newsletter mention.`;
}

function priorityReasons(offer) {
  const reasons = [];
  const value = estimatedValue(offer);
  if (value >= 300) reasons.push("high-value bonus");
  if (offer.expirationDate && daysUntil(offer.expirationDate) <= 30) reasons.push("limited-time offer");
  if (beginnerFriendly(offer)) reasons.push("beginner-friendly");
  if (broadAppeal(offer)) reasons.push("broad appeal");
  if (strongAffiliatePotential(offer)) reasons.push("strong affiliate potential");
  if (clearCta(offer)) reasons.push("clear CTA");
  if (!reasons.length) reasons.push("useful tracked offer");
  return reasons;
}

function priorityFor(score, offer) {
  if (score >= 90) return 9;
  if (score >= 78) return 8;
  if (score >= 65) return 7;
  return offer.featured ? 6 : 5;
}

function confidenceFor(offer, score) {
  let confidence = Math.max(60, Math.min(95, score));
  if (offer.verificationStatus === "verified_today") confidence += 3;
  if (offer.verificationStatus === "needs_review") confidence -= 15;
  return Math.max(0, Math.min(100, Math.round(confidence)));
}

function tagsForOffer(offer) {
  const tags = ["offer-radar", "money-deals", offer.category, ...(offer.tags || [])];
  if (offer.provider) tags.push(slugify(offer.provider));
  return [...new Set(tags.map(slugify).filter(Boolean))];
}

function imagePromptForOffer(offer) {
  return `Clean personal finance editorial graphic for ${offer.provider} ${offer.offerType || "offer"}, showing value, deadline, and terms to verify.`;
}

function signalFilePath(offer) {
  return path.join(OUTBOX_DIR, `${TODAY}-${offer.slug}.json`);
}

function estimatedValue(offer) {
  const text = `${offer.offerAmount || ""} ${offer.title || ""}`;
  const amounts = [...text.matchAll(/\$([\d,]+)/g)].map((match) => Number(match[1].replace(/,/g, "")));
  return amounts.length ? Math.max(...amounts) : 0;
}

function beginnerFriendly(offer) {
  const text = offerText(offer);
  return /(checking|savings|cash back|cashback|no annual|no monthly|waivable|starter|beginner|direct deposit)/i.test(text);
}

function broadAppeal(offer) {
  return ["bank-bonuses", "credit-card-offers", "cash-back-apps", "high-yield-savings"].includes(offer.category);
}

function strongAffiliatePotential(offer) {
  return Boolean(offer.referralUrl) || ["credit-card-offers", "brokerage-bonuses", "cash-back-apps", "business-banking"].includes(offer.category);
}

function clearCta(offer) {
  return Boolean(offer.sourceUrl || offer.referralUrl) && Boolean(offer.requirements && offer.requirements.length);
}

function categoryLabel(category) {
  if (category === "credit-card-offers") return "finance";
  if (category === "cash-back-apps") return "finance";
  if (category === "bank-bonuses") return "finance";
  if (category === "business-banking") return "finance";
  if (category === "brokerage-bonuses") return "finance";
  if (category === "high-yield-savings") return "finance";
  return "money-deals";
}

function affiliateNetworkFor(offer) {
  if (offer.referralUrl) return "referral";
  if (offer.affiliateNetwork) return offer.affiliateNetwork;
  return "";
}

function isExpired(date) {
  return Boolean(date) && daysUntil(date) < 0;
}

function daysUntil(date) {
  const expiration = new Date(`${date}T00:00:00Z`).getTime();
  const today = new Date(`${TODAY}T00:00:00Z`).getTime();
  return Math.ceil((expiration - today) / 86400000);
}

function offerText(offer) {
  return [
    offer.title,
    offer.description,
    offer.offerType,
    offer.offerAmount,
    ...(offer.requirements || []),
    ...(offer.fees || []),
    ...(offer.tags || []),
  ].join(" ");
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

main();
