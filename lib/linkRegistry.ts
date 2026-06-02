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
      record.linkStatus === "ready" &&
      Boolean(record.referralUrl || record.affiliateUrl),
  );
}

export function getProvidersNeedingReferral() {
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
      record.linkStatus !== "ready",
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
  if (record.linkStatus === "ready") {
    const monetizedUrl = record.referralUrl || record.affiliateUrl;

    if (monetizedUrl) {
      return {
        href: monetizedUrl,
        label: "Open tracked offer",
        linkType: record.referralUrl ? "referral" : "affiliate",
        sourceLabel: "Referral/affiliate disclosure applies where links are available",
      };
    }
  }

  if (record.officialOfferUrl) {
    return {
      href: record.officialOfferUrl,
      label: "Open provider offer",
      linkType: "official_offer",
      sourceLabel: "Source: Provider website",
    };
  }

  return undefined;
}

// Backward-compatible aliases for the initial V7 registry foundation.
export const getLinkForProvider = getLinkRegistryRecordByProvider;
export const getReadyLinks = getReadyMonetizedProviders;
