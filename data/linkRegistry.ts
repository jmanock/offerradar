import registry from "@/data/linkRegistry.json";

export type LinkStatus =
  | "official_only"
  | "needs_referral"
  | "needs_affiliate_approval"
  | "ready"
  | "unknown";

export type MonetizationPriority = "critical" | "high" | "medium" | "low";

export interface LinkRegistryRecord {
  provider: string;
  slug: string;
  category: string;
  officialWebsiteUrl: string;
  officialOfferUrl: string;
  referralUrl: string;
  affiliateUrl: string;
  affiliateNetwork: string;
  linkStatus: LinkStatus;
  monetizationPriority: MonetizationPriority;
  userActionNeeded: string;
  notes: string;
  lastReviewed: string;
}

export const linkRegistry = registry as LinkRegistryRecord[];
