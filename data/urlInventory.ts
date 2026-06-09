import inventory from "@/data/urlInventory.json";

export type UrlPriority = "critical" | "high" | "medium" | "low";
export type MonetizationStatus =
  | "monetized"
  | "official_only"
  | "needs_link"
  | "not_applicable";
export type IndexingStatus =
  | "unknown"
  | "submitted"
  | "indexed"
  | "not_indexed"
  | "needs_review";
export type UrlInventorySource = "sitemap" | "static" | "generated";
export type UrlRouteType =
  | "homepage"
  | "offer"
  | "provider"
  | "comparison"
  | "guide"
  | "category"
  | "state"
  | "best-of"
  | "other";

export interface UrlInventoryRecord {
  url: string;
  path: string;
  type: UrlRouteType;
  provider: string | null;
  offerCount: number;
  priority: UrlPriority;
  monetizationStatus: MonetizationStatus;
  indexingStatus: IndexingStatus;
  lastReviewed: string | null;
  internalLinkCountEstimate: number;
  lastChecked: string | null;
  lastSubmitted: string | null;
  source: UrlInventorySource;
  notes: string;
}

export const urlInventory = inventory as UrlInventoryRecord[];
