import type { ProviderInfo } from "@/types/offer";

export const providers: ProviderInfo[] = [
  {
    slug: "chase",
    name: "Chase",
    categoryFocus: "Banking and credit card offers",
    description:
      "Chase example offers commonly include checking bonuses, savings promotions, and credit card welcome offers. Availability, offer codes, and eligibility can vary.",
    commonOfferTypes: ["Checking account bonuses", "Direct deposit bonuses", "Credit card welcome offers"],
    thingsToVerify: ["Offer code requirements", "Direct deposit definitions", "Monthly fee waivers", "Credit card eligibility rules"],
    relatedCategories: ["bank-bonuses", "credit-card-offers"],
    disclosureNote: "OfferRadar may earn compensation through eligible Chase referral or affiliate links if added later.",
  },
  {
    slug: "sofi",
    name: "SoFi",
    categoryFocus: "Banking, savings, and referral offers",
    description:
      "SoFi example offers often depend on direct deposit tiers, account type, and new customer eligibility. Terms should be verified directly.",
    commonOfferTypes: ["Direct deposit bonuses", "Checking and savings offers", "Referral offers"],
    thingsToVerify: ["Direct deposit tier", "Evaluation period", "Account fee schedule", "Referral eligibility"],
    relatedCategories: ["bank-bonuses", "high-yield-savings", "referral-offers"],
    disclosureNote: "Referral compensation may apply if an eligible referral link is used.",
  },
  {
    slug: "capital-one",
    name: "Capital One",
    categoryFocus: "Banking and card welcome offers",
    description:
      "Capital One example offers may include 360 banking promotions and travel or cash back card welcome offers.",
    commonOfferTypes: ["Checking bonuses", "Savings bonuses", "Credit card welcome offers"],
    thingsToVerify: ["Offer code needs", "Spend requirements", "Annual fees", "Account availability"],
    relatedCategories: ["bank-bonuses", "credit-card-offers"],
    disclosureNote: "Offers can change and may vary by account type and user.",
  },
  {
    slug: "discover",
    name: "Discover",
    categoryFocus: "Savings and credit card offers",
    description:
      "Discover example offers can include savings bonuses and cash back card promotions, each with separate terms and eligibility.",
    commonOfferTypes: ["Savings account bonuses", "Cash back card offers", "New customer bonuses"],
    thingsToVerify: ["Deposit requirements", "APY changes", "Cash back match rules", "Reward caps"],
    relatedCategories: ["high-yield-savings", "credit-card-offers"],
    disclosureNote: "Verify all rates, rewards, and eligibility directly with Discover.",
  },
  {
    slug: "wells-fargo",
    name: "Wells Fargo",
    categoryFocus: "Checking and credit card offers",
    description:
      "Wells Fargo example offers may include checking account bonuses and credit card welcome offers with state, product, and activity rules.",
    commonOfferTypes: ["Checking bonuses", "Direct deposit bonuses", "Credit card welcome offers"],
    thingsToVerify: ["State availability", "Direct deposit rules", "Monthly fees", "Card approval terms"],
    relatedCategories: ["bank-bonuses", "credit-card-offers"],
    disclosureNote: "Provider terms control offer eligibility and payout timing.",
  },
  {
    slug: "bank-of-america",
    name: "Bank of America",
    categoryFocus: "Banking and card offers",
    description:
      "Bank of America example offers may involve Advantage Banking packages, direct deposit requirements, and card welcome offers.",
    commonOfferTypes: ["Checking bonuses", "Direct deposit bonuses", "Credit card welcome offers"],
    thingsToVerify: ["Offer code", "Account package", "Relationship fee waivers", "State eligibility"],
    relatedCategories: ["bank-bonuses", "credit-card-offers"],
    disclosureNote: "OfferRadar is informational and does not guarantee approval, eligibility, or payout.",
  },
  {
    slug: "citi",
    name: "Citi",
    categoryFocus: "Relationship banking and card offers",
    description:
      "Citi example offers may be tiered by new money, relationship balance, or card spend requirements.",
    commonOfferTypes: ["New customer bonuses", "Checking bonuses", "Credit card welcome offers"],
    thingsToVerify: ["Balance tiers", "Monthly fees", "Offer expiration", "Reward redemption terms"],
    relatedCategories: ["bank-bonuses", "credit-card-offers"],
    disclosureNote: "Compare fees and balance requirements before relying on a headline bonus.",
  },
  {
    slug: "ally",
    name: "Ally",
    categoryFocus: "Savings and online banking offers",
    description:
      "Ally example offers may include savings or new money promotions, with rates and terms that can change.",
    commonOfferTypes: ["Savings account bonuses", "High-yield savings offers", "New customer bonuses"],
    thingsToVerify: ["APY", "New money definition", "Balance maintenance period", "Payout timing"],
    relatedCategories: ["high-yield-savings", "bank-bonuses"],
    disclosureNote: "Rates and promotions may change after the last checked date.",
  },
  {
    slug: "robinhood",
    name: "Robinhood",
    categoryFocus: "Brokerage and transfer offers",
    description:
      "Robinhood example offers may involve brokerage transfers, subscription features, or referral incentives.",
    commonOfferTypes: ["Brokerage transfer bonuses", "Signup bonuses", "Referral offers"],
    thingsToVerify: ["Subscription cost", "Holding period", "Transfer eligibility", "Investment risk"],
    relatedCategories: ["brokerage-bonuses", "referral-offers"],
    disclosureNote: "Investment accounts can lose value, and bonus terms may change.",
  },
  {
    slug: "webull",
    name: "Webull",
    categoryFocus: "Brokerage signup and referral offers",
    description:
      "Webull example offers often involve free-share style signup or referral promotions with variable reward values.",
    commonOfferTypes: ["Brokerage signup bonuses", "Referral bonuses", "Stock reward offers"],
    thingsToVerify: ["Reward value range", "Funding steps", "Tax reporting", "Account approval"],
    relatedCategories: ["brokerage-bonuses", "referral-offers"],
    disclosureNote: "Reward values are examples and can vary by user and campaign.",
  },
  {
    slug: "fidelity",
    name: "Fidelity",
    categoryFocus: "Brokerage, retirement, and account funding offers",
    description:
      "Fidelity example offers may include funding, transfer, or retirement account promotions.",
    commonOfferTypes: ["Brokerage signup bonuses", "Transfer bonuses", "IRA offers"],
    thingsToVerify: ["Eligible account types", "Funding requirements", "Holding periods", "Tax considerations"],
    relatedCategories: ["brokerage-bonuses"],
    disclosureNote: "Review investment and tax implications before opening or transferring accounts.",
  },
  {
    slug: "public",
    name: "Public",
    categoryFocus: "Brokerage signup and referral offers",
    description:
      "Public example offers may include signup or referral rewards for eligible new brokerage accounts.",
    commonOfferTypes: ["Brokerage signup bonuses", "Referral bonuses"],
    thingsToVerify: ["Reward form", "Funding requirement", "Account approval", "Transfer restrictions"],
    relatedCategories: ["brokerage-bonuses", "referral-offers"],
    disclosureNote: "Verify current campaign terms directly in the provider flow.",
  },
  {
    slug: "acorns",
    name: "Acorns",
    categoryFocus: "Investing app referral offers",
    description:
      "Acorns example offers may include referral bonuses, investing app credits, and subscription-linked promotions.",
    commonOfferTypes: ["Referral bonuses", "Investing app offers", "New customer bonuses"],
    thingsToVerify: ["Subscription fees", "Funding requirement", "Referral eligibility", "Bonus timing"],
    relatedCategories: ["referral-offers", "brokerage-bonuses"],
    disclosureNote: "Subscription costs may reduce the value of a small referral bonus.",
  },
  {
    slug: "m1-finance",
    name: "M1 Finance",
    categoryFocus: "Brokerage and transfer offers",
    description:
      "M1 Finance example offers may involve account transfers, new money, and holding-period requirements.",
    commonOfferTypes: ["Brokerage transfer bonuses", "Signup bonuses"],
    thingsToVerify: ["Transfer minimums", "Holding period", "Account fees", "Investment risk"],
    relatedCategories: ["brokerage-bonuses"],
    disclosureNote: "Do not transfer solely for a bonus without reviewing account fit and costs.",
  },
  {
    slug: "interactive-brokers",
    name: "Interactive Brokers",
    categoryFocus: "Brokerage referral and trading offers",
    description:
      "Interactive Brokers example offers may involve referral rewards, funding requirements, and trading account rules.",
    commonOfferTypes: ["Referral bonuses", "Brokerage signup bonuses", "Transfer offers"],
    thingsToVerify: ["Funding minimum", "Holding period", "Advanced trading risks", "Account fees"],
    relatedCategories: ["brokerage-bonuses", "referral-offers"],
    disclosureNote: "Advanced brokerage products may carry additional risk and complexity.",
  },
];
