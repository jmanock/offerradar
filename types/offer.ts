export type OfferCategory =
  | "bank-bonuses"
  | "brokerage-bonuses"
  | "referral-offers"
  | "high-yield-savings"
  | "business-banking"
  | "credit-card-offers"
  | "cash-back-apps";

export type OfferStatus = "active" | "expired" | "watching";

export type VerificationStatus =
  | "verified_today"
  | "verified_this_week"
  | "needs_review"
  | "expired";

export type AutomationSource = "manual_seed" | "future_bot";

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
  verificationStatus: VerificationStatus;
  status: OfferStatus;
  featured?: boolean;
  riskNotes?: string[];
  tags?: string[];
  requiresDirectDeposit?: boolean;
  minimumDeposit?: string;
  monthlyFee?: string;
  stateRestrictions?: string[];
  referralCode?: string;
  automationSource?: AutomationSource;
  lastChanged?: string;
  changeSummary?: string;
}

export interface CategoryInfo {
  slug: OfferCategory;
  title: string;
  shortTitle: string;
  description: string;
  education: string;
}

export interface ProviderInfo {
  slug: string;
  name: string;
  categoryFocus: string;
  description: string;
  commonOfferTypes: string[];
  thingsToVerify: string[];
  relatedCategories: OfferCategory[];
  disclosureNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OfferTypePageInfo {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  comparisonTips: string[];
  relatedCategories: OfferCategory[];
  faq: FaqItem[];
}

export interface StatePageInfo {
  slug: string;
  stateName: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  cautions: string[];
  relatedPages: string[];
  faq: FaqItem[];
}
