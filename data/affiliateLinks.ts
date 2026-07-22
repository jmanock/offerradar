import registry from "@/data/affiliateRegistry.json";

export type AffiliateStatus =
  | "active"
  | "pending-review"
  | "disabled"
  | "expired"
  | "needs-verification";

export type AffiliateDestinationType =
  | "comparator"
  | "checker"
  | "shop"
  | "research-resource"
  | "app";

export type AffiliateEntry = {
  id: string;
  advertiser: string;
  network: string;
  category: string;
  description: string;
  affiliateUrl: string;
  officialUrl: string;
  linkText: string;
  status: AffiliateStatus;
  approved: boolean;
  allowedRoutes: string[];
  prohibitedRoutes: string[];
  disclosureRequired: boolean;
  targetCountry: string;
  targetLanguage: string;
  lastVerified: string;
  notes: string;
  defaultClickRef: string;
  logoAsset: string;
  destinationType: AffiliateDestinationType;
};

export const affiliateLinks = registry as AffiliateEntry[];
