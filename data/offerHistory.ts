import { offers } from "@/lib/offerData";

export type OfferHistoryRecord = {
  offerId: string;
  provider: string;
  currentAmount: string;
  previousAmount?: string;
  dateObserved: string;
  lastVerified: string;
  status: "active" | "expired" | "watching";
  notes: string;
};

export const offerHistoryRecords: OfferHistoryRecord[] = offers
  .slice()
  .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified))
  .slice(0, 12)
  .map((offer) => ({
    offerId: offer.slug,
    provider: offer.provider,
    currentAmount: offer.offerAmount,
    dateObserved: offer.lastChanged ?? offer.lastVerified,
    lastVerified: offer.lastVerified,
    status: offer.status,
    notes:
      offer.changeSummary?.trim() ||
      "Reviewed offer record. No historical amount change is recorded yet.",
  }));
