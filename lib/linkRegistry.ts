import { linkRegistry, type LinkRegistryRecord } from "@/data/linkRegistry";

export function getAllLinkRegistryRecords() {
  return linkRegistry;
}

export function getLinkRegistryRecordByProvider(provider: string) {
  const lookup = provider.trim().toLowerCase();

  return linkRegistry.find((record) => record.provider.toLowerCase() === lookup);
}

export function getLinkRegistryRecordBySlug(slug: string) {
  const lookup = slug.trim().toLowerCase();

  return linkRegistry.find((record) => record.slug.toLowerCase() === lookup);
}

export function getReadyMonetizedProviders() {
  return linkRegistry.filter(
    (record) =>
      record.monetizationStatus === "ready" &&
      Boolean(record.referralUrl || record.affiliateUrl),
  );
}

export function getProvidersWithAffiliatePrograms() {
  return linkRegistry.filter((record) =>
    Boolean(record.affiliateProgram || record.affiliateNetwork),
  );
}

export function getProvidersNeedingApproval() {
  return linkRegistry.filter((record) => record.affiliateStatus === "needs_approval");
}

export function getProvidersNeedingReview() {
  return linkRegistry.filter(
    (record) =>
      record.affiliateStatus === "needs_review" ||
      record.affiliateStatus === "not_identified",
  );
}

export function getProvidersNeedingReferral() {
  // Legacy helper retained for V7 reports until their schema is migrated.
  return linkRegistry.filter((record) => record.linkStatus === "needs_referral");
}

export function getProvidersNeedingAffiliateApproval() {
  return linkRegistry.filter(
    (record) => record.linkStatus === "needs_affiliate_approval",
  );
}

export function getProvidersMissingOfficialOfferUrl() {
  return linkRegistry.filter((record) => !record.officialOfferUrl);
}

export function getHighPriorityMonetizationGaps() {
  return linkRegistry.filter(
    (record) =>
      (record.monetizationPriority === "critical" ||
        record.monetizationPriority === "high") &&
      record.monetizationStatus !== "ready",
  );
}

export function getPublicLinkForProvider(provider: string) {
  const record = getLinkRegistryRecordByProvider(provider);

  if (!record) {
    return undefined;
  }

  return getPublicLinkForRecord(record);
}

export function getPublicLinkForRecord(record: LinkRegistryRecord) {
  if (record.monetizationStatus === "ready") {
    const monetizedUrl = record.referralUrl || record.affiliateUrl;

    if (monetizedUrl) {
      return {
        href: monetizedUrl,
        label: "Check current terms",
        linkType: record.referralUrl ? "referral" : "affiliate",
        sourceLabel: "Tracked affiliate or referral link. OfferRadar may earn compensation. Verify current provider terms.",
      };
    }
  }

  if (record.officialOfferUrl) {
    return {
      href: record.officialOfferUrl,
      label: "Check current terms",
      linkType: "official_offer",
      sourceLabel: "Source reviewed: provider website.",
    };
  }

  return undefined;
}

// Backward-compatible aliases for the initial V7 registry foundation.
export const getLinkForProvider = getLinkRegistryRecordByProvider;
export const getReadyLinks = getReadyMonetizedProviders;
