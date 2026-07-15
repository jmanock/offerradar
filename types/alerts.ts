export type AlertFrequency = "immediate" | "weekly";
export type AlertScopeType = "offer" | "provider";
export type AlertChangeType = "new" | "increased" | "decreased" | "terms" | "expired" | "reactivated" | "needs-review";

export type AlertSubscription = {
  id: string;
  email: string;
  scopeType: AlertScopeType;
  scopeId: string;
  scopeLabel: string;
  targetAmount?: number;
  frequency: AlertFrequency;
  changeTypes: AlertChangeType[];
  status: "pending" | "active" | "paused" | "unsubscribed";
  createdAt: string;
  confirmedAt?: string;
  tokenHash: string;
};
