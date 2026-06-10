import type { GuidePageInfo } from "@/types/offer";

const faq = (topic: string): GuidePageInfo["faq"] => [
  {
    question: `Does this ${topic.toLowerCase()} guide give financial advice?`,
    answer:
      "No. OfferRadar guides are informational and designed to help readers compare terms, requirements, fees, and verification details.",
  },
  {
    question: "What should I verify before acting on an offer?",
    answer:
      "Verify the live provider terms, eligibility rules, fees, timing, expiration date, and whether the offer is still available to you.",
  },
];

export const guidePages: GuidePageInfo[] = [
  {
    slug: "bank-bonuses",
    title: "How Bank Bonuses Work",
    description: "Learn how bank bonuses work, what requirements to compare, and which terms should be verified before opening an account.",
    h1: "How bank bonuses work",
    intro:
      "Bank bonuses can be useful to compare, but the headline amount is only one part of the record. Requirements, fees, availability, and timing matter.",
    sections: [
      {
        title: "What a bank bonus usually requires",
        body: "A bank bonus often requires a new checking or savings account, qualifying deposits, a minimum balance, or recurring account activity within a stated window.",
      },
      {
        title: "Why verification dates matter",
        body: "Provider pages can change without warning. A last reviewed date helps readers understand when an offer record was checked, but it does not replace provider terms.",
      },
    ],
    checklist: ["Offer amount", "Direct deposit or balance requirement", "Monthly fee waiver", "Payout timing", "Early closure rules"],
    relatedPages: ["/bank-bonuses", "/checking-account-bonuses", "/direct-deposit-bonuses", "/national-bank-bonuses"],
    faq: faq("bank bonus"),
  },
  {
    slug: "direct-deposits",
    title: "Direct Deposit Requirements Guide",
    description: "Understand direct deposit bonus requirements, timing windows, and why provider definitions should be verified.",
    h1: "Direct deposit requirements",
    intro:
      "Direct deposit requirements are common in banking bonuses, but providers define qualifying deposits differently.",
    sections: [
      {
        title: "Qualifying deposits can vary",
        body: "Some providers require payroll or government benefit deposits. Others list specific ACH, employer, or recurring deposit requirements.",
      },
      {
        title: "Timing windows matter",
        body: "Offer terms may require deposits within a certain number of days after opening, and payout timing may depend on the review period.",
      },
    ],
    checklist: ["Qualifying source", "Minimum deposit amount", "Deposit deadline", "Account standing", "Bonus posting window"],
    relatedPages: ["/direct-deposit-bonuses", "/bank-bonuses", "/business-bank-bonuses"],
    faq: faq("direct deposit"),
  },
  {
    slug: "minimum-deposits",
    title: "Minimum Deposit Requirements Guide",
    description: "Compare minimum deposit requirements across banking, brokerage, savings, and business banking offers.",
    h1: "Minimum deposit requirements",
    intro:
      "Minimum deposit rules can affect whether a bonus is practical. Some offers require new money, transferred assets, or balances held for weeks or months.",
    sections: [
      {
        title: "New money rules",
        body: "Many offers require funds that are new to the provider. Existing balances, internal transfers, or prior accounts may not qualify.",
      },
      {
        title: "Balance maintenance",
        body: "Some offers require the balance to remain above a threshold through a review period before any reward posts.",
      },
    ],
    checklist: ["New money definition", "Minimum funding amount", "Hold period", "Withdrawal limits", "Account fees"],
    relatedPages: ["/savings-account-bonuses", "/brokerage-signup-bonuses", "/business-bank-bonuses"],
    faq: faq("minimum deposit"),
  },
  {
    slug: "brokerage-bonuses",
    title: "Brokerage Bonus Guide",
    description: "Learn how brokerage signup, transfer, and referral bonuses work with funding thresholds and investment risk reminders.",
    h1: "Brokerage bonus guide",
    intro:
      "Brokerage bonuses may involve account approval, funding tiers, ACAT transfers, holding periods, and market risk.",
    sections: [
      {
        title: "Funding and transfer tiers",
        body: "Brokerage offers often scale by deposit or transfer size. Larger headline amounts can require larger balances and longer holding periods.",
      },
      {
        title: "Investment risk is separate from the bonus",
        body: "Account assets can gain or lose value. Fees, tax considerations, and account fit should be reviewed before transferring or investing.",
      },
    ],
    checklist: ["Eligible account type", "Funding tier", "Holding period", "Transfer fees", "Market and tax risk"],
    relatedPages: ["/brokerage-bonuses", "/brokerage-signup-bonuses", "/providers"],
    faq: faq("brokerage bonus"),
  },
  {
    slug: "referral-bonuses",
    title: "Referral Bonus Guide",
    description: "Understand referral bonus eligibility, invite links, user-specific terms, and payout reminders.",
    h1: "Referral bonus guide",
    intro:
      "Referral bonuses can be useful, but they often vary by invite link, user, location, campaign, and account history.",
    sections: [
      {
        title: "Referral links can be user-specific",
        body: "A referral link may not show the same offer to every visitor. Confirm the visible bonus screen before completing required activity.",
      },
      {
        title: "Both sides may have rules",
        body: "Some campaigns reward the referrer, the referred user, or both. Requirements can include account approval, transactions, funding, or waiting periods.",
      },
    ],
    checklist: ["Eligible invite link", "New user rule", "Required activity", "Reward timing", "Reward limits"],
    relatedPages: ["/referral-offers", "/referral-bonuses", "/cash-back-app-offers"],
    faq: faq("referral bonus"),
  },
  {
    slug: "fees",
    title: "Offer Fee Guide",
    description: "Compare monthly fees, annual fees, advisory fees, transfer fees, and other costs that can reduce offer value.",
    h1: "Fees to check before comparing offers",
    intro:
      "Fees can change the practical value of a bonus. A larger offer may be less attractive if it requires high fees or balances.",
    sections: [
      {
        title: "Banking fees",
        body: "Monthly maintenance, overdraft, wire, cash deposit, or early closure fees can apply depending on account type and activity.",
      },
      {
        title: "Brokerage and card fees",
        body: "Annual fees, advisory fees, transfer fees, margin costs, and fund expenses should be compared alongside any promotional value.",
      },
    ],
    checklist: ["Monthly or annual fee", "Waiver rules", "Transfer costs", "Early closure fee", "Interest or advisory costs"],
    relatedPages: ["/bank-bonuses", "/credit-card-welcome-offers", "/brokerage-bonuses"],
    faq: faq("fee"),
  },
  {
    slug: "offer-comparisons",
    title: "How To Compare Offers",
    description: "Learn a practical framework for comparing bonuses, referrals, cash back offers, and account promotions.",
    h1: "How to compare offers",
    intro:
      "A useful comparison looks beyond headline value and checks requirements, timing, restrictions, and risk notes.",
    sections: [
      {
        title: "Start with eligibility",
        body: "If an offer is not available to your state, account type, customer status, or referral link, the headline value does not matter.",
      },
      {
        title: "Compare effort and timing",
        body: "Look at deposits, transactions, spend, holding periods, payout windows, and whether the offer requires ongoing account management.",
      },
    ],
    checklist: ["Eligibility", "Required activity", "Fees", "Payout timing", "Things to verify"],
    relatedPages: ["/offers", "/providers", "/compare/chase-vs-sofi"],
    faq: faq("offer comparison"),
  },
  {
    slug: "offer-expiration-dates",
    title: "Offer Expiration Date Guide",
    description: "Understand how expiration dates, limited-time promotions, and early campaign changes affect offer tracking.",
    h1: "Offer expiration dates",
    intro:
      "Expiration dates help prioritize review, but providers can extend, replace, or end campaigns earlier than expected.",
    sections: [
      {
        title: "Listed dates are not guarantees",
        body: "A listed expiration date should be treated as a comparison clue, not a guarantee that the offer remains available until that day.",
      },
      {
        title: "Verification matters near deadlines",
        body: "Time-sensitive offers should be verified directly with the provider before applying, especially near the stated end date.",
      },
    ],
    checklist: ["Listed expiration", "Last reviewed date", "Provider terms", "Application deadline", "Funding deadline"],
    relatedPages: ["/offers", "/bank-bonuses", "/brokerage-bonuses"],
    faq: faq("expiration date"),
  },
  {
    slug: "affiliate-disclosures",
    title: "Outbound Link Disclosure Guide",
    description: "Learn how compensated outbound links may appear on OfferRadar and why provider terms still control.",
    h1: "Outbound link disclosures",
    intro:
      "Some outbound links may result in compensation to OfferRadar. Disclosure language should stay clear while research and provider verification remain the focus.",
    sections: [
      {
        title: "Compensation does not guarantee terms",
        body: "Compensation from an outbound link does not mean an offer is available, approved, paid, recommended, or best for a reader.",
      },
      {
        title: "Provider terms are the source of truth",
        body: "Readers should verify offer details directly with the provider before opening an account, applying, transferring assets, or making a purchase.",
      },
    ],
    checklist: ["Outbound link relationship", "Provider terms", "Eligibility", "Fees", "No financial advice"],
    relatedPages: ["/disclosures", "/editorial-policy", "/offers"],
    faq: faq("outbound link disclosure"),
  },
];
