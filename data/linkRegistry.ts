import registry from "@/data/linkRegistry.json";

export type LinkStatus =
  | "official_only"
  | "needs_referral"
  | "needs_affiliate_approval"
  | "ready"
  | "unknown";

export type MonetizationPriority = "critical" | "high" | "medium" | "low";

export type AffiliateStatus =
  | "ready"
  | "needs_approval"
  | "needs_review"
  | "not_identified";

export type MonetizationStatus =
  | "ready"
  | "official_offer"
  | "needs_approval"
  | "needs_review";

export interface LinkRegistryRecord {
  provider: string;
  slug: string;
  category: string;
  officialWebsiteUrl: string;
  officialOfferUrl: string;
  referralUrl: string;
  affiliateUrl: string;
  affiliateProgram: string;
  affiliateNetwork: string;
  affiliateStatus: AffiliateStatus;
  monetizationStatus: MonetizationStatus;
  /** Legacy V7 field retained for automation and report compatibility. */
  linkStatus: LinkStatus;
  monetizationPriority: MonetizationPriority;
  userActionNeeded: string;
  notes: string;
  lastReviewed: string;
}

export const linkRegistry = registry as LinkRegistryRecord[];
