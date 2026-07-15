export type ChangeType = "new" | "increased" | "decreased" | "terms" | "expired" | "reactivated" | "needs-review" | "verified";
export type ReviewStatus = "pending" | "approved" | "rejected" | "research";

export type ChangeCandidate = {
  id: string;
  offerId: string;
  provider: string;
  title: string;
  category: string;
  previousObservedValue?: string;
  currentObservedValue: string;
  field: string;
  changeType: ChangeType;
  detectedAt: string;
  sourceUrl: string;
  confidence: "low" | "medium" | "high";
  status: ReviewStatus;
  proposedStatus?: "active" | "expired" | "watching";
  reviewedAt?: string;
  reviewerNote?: string;
};

export type ApprovedChange = ChangeCandidate & {
  status: "approved";
  approvedAt: string;
};
