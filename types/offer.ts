export type OfferCategory =
  | "bank-bonuses"
  | "brokerage-bonuses"
  | "referral-offers"
  | "high-yield-savings"
  | "business-banking";

export type OfferStatus = "active" | "expired" | "watching";

export interface Offer {
  slug: string;
  title: string;
  provider: string;
  category: OfferCategory;
  offerAmount: string;
  offerType: string;
  description: string;
  requirements: string[];
  fees?: string[];
  expirationDate?: string;
  referralUrl?: string;
  sourceUrl?: string;
  lastVerified: string;
  status: OfferStatus;
  featured?: boolean;
  riskNotes?: string[];
  tags?: string[];
}

export interface CategoryInfo {
  slug: OfferCategory;
  title: string;
  shortTitle: string;
  description: string;
  education: string;
}
