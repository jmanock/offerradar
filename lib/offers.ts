import { categories, offers } from "@/data/offers";
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
