import { offers } from "@/lib/offerData";

export type OfferHistoryRecord = {
  offerId: string;
  provider: string;
  category: string;
  observedValue: string;
  previousObservedValue?: string;
  dateObserved: string;
  firstSeen: string;
  lastVerified: string;
  status: "active" | "expired" | "watching";
  sourceUrl?: string;
  notes: string;
  changeType: "new" | "increased" | "decreased" | "unchanged" | "expired" | "reactivated" | "needs-review";
};

export const offerHistoryRecords: OfferHistoryRecord[] = offers
  .slice()
  .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified))
  .slice(0, 12)
  .map((offer) => ({
    offerId: offer.slug,
    provider: offer.provider,
    category: offer.category,
    observedValue: offer.offerAmount,
    dateObserved: offer.lastChanged ?? offer.lastVerified,
    firstSeen: offer.lastChanged ?? offer.lastVerified,
    lastVerified: offer.lastVerified,
    status: offer.status,
    sourceUrl: offer.sourceUrl,
    notes:
      offer.changeSummary?.trim() ||
      "Reviewed offer record. No historical amount change is recorded yet.",
    changeType: offer.status === "expired" ? "expired" : offer.verificationStatus === "needs_review" ? "needs-review" : "unchanged",
  }));
