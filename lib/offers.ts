import { categories } from "@/data/offers";
import { offerTypePages } from "@/data/offerTypePages";
import { providers } from "@/data/providers";
import { statePages } from "@/data/statePages";
import { offers } from "@/lib/offerData";
import type { Offer, OfferCategory } from "@/types/offer";

const today = "2026-06-01";

const statusRank: Record<Offer["status"], number> = {
  active: 0,
  watching: 1,
  expired: 2,
};

const verificationRank: Record<Offer["verificationStatus"], number> = {
  verified_today: 0,
  verified_this_week: 1,
  needs_review: 2,
  expired: 3,
};

export function getAllOffers() {
  return [...offers].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }

    if (statusRank[a.status] !== statusRank[b.status]) {
      return statusRank[a.status] - statusRank[b.status];
    }

    if (verificationRank[a.verificationStatus] !== verificationRank[b.verificationStatus]) {
      return verificationRank[a.verificationStatus] - verificationRank[b.verificationStatus];
    }

    return b.lastVerified.localeCompare(a.lastVerified);
  });
}

export function getActiveOffers() {
  return getAllOffers().filter((offer) => offer.status === "active");
}

export function getFeaturedOffers(limit = 6) {
  return getAllOffers()
    .filter((offer) => offer.featured && offer.status !== "expired")
    .slice(0, limit);
}

export function getRecentlyVerifiedOffers(limit = 6) {
  return [...offers]
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified))
    .slice(0, limit);
}

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}

export function getOffersByCategory(category: OfferCategory) {
  return getAllOffers().filter((offer) => offer.category === category);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getRelatedOffers(offer: Offer, limit = 3) {
  return getOffersByCategory(offer.category)
    .filter((relatedOffer) => relatedOffer.slug !== offer.slug)
    .slice(0, limit);
}

export function getExpiringSoonOffers(limit = 6) {
  const now = new Date(`${today}T00:00:00Z`).getTime();
  const max = now + 45 * 24 * 60 * 60 * 1000;

  return getActiveOffers()
    .filter((offer) => {
      if (!offer.expirationDate) {
        return false;
      }

      const expiration = new Date(`${offer.expirationDate}T00:00:00Z`).getTime();
      return expiration >= now && expiration <= max;
    })
    .sort((a, b) => (a.expirationDate ?? "").localeCompare(b.expirationDate ?? ""))
    .slice(0, limit);
}

export function getBestOffersByCategory(category: OfferCategory, limit = 5) {
  return getOffersByCategory(category)
    .filter((offer) => offer.status === "active")
    .sort((a, b) => {
      if (Boolean(a.featured) !== Boolean(b.featured)) {
        return a.featured ? -1 : 1;
      }

      if (verificationRank[a.verificationStatus] !== verificationRank[b.verificationStatus]) {
        return verificationRank[a.verificationStatus] - verificationRank[b.verificationStatus];
      }

      return b.lastVerified.localeCompare(a.lastVerified);
    })
    .slice(0, limit);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getLastUpdated() {
  return [...offers].sort((a, b) => b.lastVerified.localeCompare(a.lastVerified))[0]
    ?.lastVerified;
}

export function getActiveOfferCount() {
  return offers.filter((offer) => offer.status === "active").length;
}

export function getAllProviders() {
  return providers;
}

export function getProviderBySlug(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}

export function getOffersByProvider(providerName: string) {
  return getAllOffers().filter(
    (offer) => offer.provider.toLowerCase() === providerName.toLowerCase(),
  );
}

export function getAllOfferTypePages() {
  return offerTypePages;
}

export function getOfferTypePageBySlug(slug: string) {
  return offerTypePages.find((page) => page.slug === slug);
}

export function getOffersForOfferTypePage(slug: string) {
  const matchers: Record<string, (offer: Offer) => boolean> = {
    "checking-account-bonuses": (offer) =>
      offer.category === "bank-bonuses" &&
      hasAnyText(offer, ["checking", "checking account"]),
    "savings-account-bonuses": (offer) =>
      (offer.category === "bank-bonuses" || offer.category === "high-yield-savings") &&
      hasAnyText(offer, ["savings", "new money", "apy"]),
    "direct-deposit-bonuses": (offer) =>
      Boolean(offer.requiresDirectDeposit) || hasAnyText(offer, ["direct deposit"]),
    "business-bank-bonuses": (offer) => offer.category === "business-banking",
    "new-customer-bonuses": (offer) =>
      hasAnyText(offer, ["new customer", "signup", "welcome offer"]),
    "brokerage-signup-bonuses": (offer) =>
      offer.category === "brokerage-bonuses" && hasAnyText(offer, ["signup", "brokerage"]),
    "referral-bonuses": (offer) =>
      offer.category === "referral-offers" ||
      Boolean(offer.referralUrl) ||
      hasAnyText(offer, ["referral"]),
    "cash-back-app-offers": (offer) => offer.category === "cash-back-apps",
    "credit-card-welcome-offers": (offer) =>
      offer.category === "credit-card-offers" && hasAnyText(offer, ["welcome offer", "credit card"]),
    "best-checking-bonuses": (offer) =>
      offer.category === "bank-bonuses" && hasAnyText(offer, ["checking", "direct deposit"]),
    "best-savings-bonuses": (offer) =>
      (offer.category === "bank-bonuses" || offer.category === "high-yield-savings") &&
      hasAnyText(offer, ["savings", "apy", "new money"]),
    "no-monthly-fee-bank-bonuses": (offer) =>
      offer.category === "bank-bonuses" && hasAnyText(offer, ["checking", "$0", "waivable"]),
    "high-apy-savings-offers": (offer) =>
      offer.category === "high-yield-savings" && hasAnyText(offer, ["apy", "savings"]),
    "new-money-savings-bonuses": (offer) =>
      (offer.category === "bank-bonuses" || offer.category === "high-yield-savings") &&
      hasAnyText(offer, ["new money", "savings"]),
    "brokerage-transfer-bonuses": (offer) =>
      offer.category === "brokerage-bonuses" && hasAnyText(offer, ["transfer", "assets"]),
    "ira-bonuses": (offer) =>
      offer.category === "brokerage-bonuses" && hasAnyText(offer, ["ira", "retirement", "rollover"]),
    "stock-referral-offers": (offer) =>
      (offer.category === "brokerage-bonuses" || offer.category === "referral-offers") &&
      hasAnyText(offer, ["stock", "referral", "brokerage"]),
    "app-referral-offers": (offer) =>
      offer.category === "referral-offers" && hasAnyText(offer, ["app", "referral"]),
    "cash-back-signup-bonuses": (offer) =>
      offer.category === "cash-back-apps" || hasAnyText(offer, ["cash back", "cashback"]),
    "business-checking-bonuses": (offer) =>
      offer.category === "business-banking" && hasAnyText(offer, ["checking", "business"]),
    "business-savings-bonuses": (offer) =>
      offer.category === "business-banking" && hasAnyText(offer, ["savings", "balance", "new money"]),
    "credit-card-cash-back-offers": (offer) =>
      offer.category === "credit-card-offers" && hasAnyText(offer, ["cash", "cash back"]),
    "travel-card-welcome-offers": (offer) =>
      offer.category === "credit-card-offers" && hasAnyText(offer, ["travel", "point", "miles"]),
    "limited-time-offers": (offer) => Boolean(offer.expirationDate),
  };

  return getAllOffers().filter(matchers[slug] ?? (() => false)).slice(0, 18);
}

export function getAllStatePages() {
  return statePages;
}

export function getStatePageBySlug(slug: string) {
  return statePages.find((page) => page.slug === slug);
}

export function getOffersForStatePage(slug: string) {
  const page = getStatePageBySlug(slug);

  if (!page) {
    return [];
  }

  return getAllOffers()
    .filter((offer) => {
      const isBankish =
        offer.category === "bank-bonuses" ||
        offer.category === "high-yield-savings" ||
        offer.category === "business-banking";

      if (!isBankish) {
        return false;
      }

      if (page.stateName === "National") {
        return !offer.stateRestrictions?.length || offer.stateRestrictions.includes("National");
      }

      return (
        offer.stateRestrictions?.includes(page.stateName) ||
        offer.stateRestrictions?.includes("National")
      );
    })
    .slice(0, 18);
}

function hasAnyText(offer: Offer, needles: string[]) {
  const haystack = [
    offer.title,
    offer.offerType,
    offer.description,
    ...(offer.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return needles.some((needle) => haystack.includes(needle.toLowerCase()));
}
