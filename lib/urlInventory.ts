import { urlInventory, type UrlInventoryRecord } from "@/data/urlInventory";

export function getUrlInventory() {
  return urlInventory;
}

export function getUrlsByPriority(priority: UrlInventoryRecord["priority"]) {
  return urlInventory.filter((record) => record.priority === priority);
}

export function getUrlsByType(type: string) {
  return urlInventory.filter((record) => record.type === type);
}

export function getUrlsNeedingReview() {
  return urlInventory.filter(
    (record) =>
      record.indexingStatus === "unknown" ||
      record.indexingStatus === "needs_review" ||
      record.indexingStatus === "not_indexed" ||
      !record.lastReviewed,
  );
}

export function getMonetizedUrls() {
  return urlInventory.filter((record) => record.monetizationStatus === "monetized");
}

export function getUrlsPendingSubmission() {
  return urlInventory.filter(
    (record) =>
      record.indexingStatus === "unknown" &&
      (record.priority === "critical" || record.priority === "high"),
  );
}

export function getUrlsNeedingInternalLinks() {
  return urlInventory.filter(
    (record) => record.path !== "/" && record.internalLinkCountEstimate <= 1,
  );
}

export function countInventoryBy(field: "type" | "priority" | "monetizationStatus" | "indexingStatus") {
  return urlInventory.reduce<Record<string, number>>((counts, record) => {
    const value = record[field];
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}
