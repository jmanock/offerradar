import type { FaqItem } from "@/types/offer";

export type LocalSeoPageKind =
  | "state"
  | "city"
  | "mortgage"
  | "business"
  | "promotions";

export interface FloridaCity {
  slug: string;
  name: string;
  region: string;
  county: string;
}

export interface BankingCategory {
  slug: string;
  label: string;
  description: string;
}

export interface LocalOfferType {
  slug: string;
  label: string;
  description: string;
}

export interface LocalSeoPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kind: LocalSeoPageKind;
  location: string;
  lastUpdated: string;
  intro: string;
  comparisonSections: {
    title: string;
    body: string;
    points: string[];
  }[];
  faqs: FaqItem[];
  cta: {
    title: string;
    body: string;
  };
  relatedLinks: { href: string; label: string }[];
}

export const floridaCities: FloridaCity[] = [
  { slug: "sanford", name: "Sanford", region: "Central Florida", county: "Seminole County" },
  { slug: "lake-mary", name: "Lake Mary", region: "Central Florida", county: "Seminole County" },
  { slug: "orlando", name: "Orlando", region: "Central Florida", county: "Orange County" },
  { slug: "winter-park", name: "Winter Park", region: "Central Florida", county: "Orange County" },
  { slug: "daytona-beach", name: "Daytona Beach", region: "East Central Florida", county: "Volusia County" },
  { slug: "tampa", name: "Tampa", region: "Tampa Bay", county: "Hillsborough County" },
  { slug: "st-petersburg", name: "St. Petersburg", region: "Tampa Bay", county: "Pinellas County" },
  { slug: "jacksonville", name: "Jacksonville", region: "Northeast Florida", county: "Duval County" },
  { slug: "miami", name: "Miami", region: "South Florida", county: "Miami-Dade County" },
  { slug: "fort-lauderdale", name: "Fort Lauderdale", region: "South Florida", county: "Broward County" },
];

export const bankingCategories: BankingCategory[] = [
  {
    slug: "checking-accounts",
    label: "Checking accounts",
    description: "Everyday accounts for deposits, debit card use, direct deposit, bill pay, and account bonuses.",
  },
  {
    slug: "savings-accounts",
    label: "Savings accounts",
    description: "Savings, money market, and cash accounts where APY, fees, and balance requirements matter.",
  },
  {
    slug: "credit-unions",
    label: "Credit unions",
    description: "Member-owned financial institutions with eligibility rules, branch access, and local service differences.",
  },
  {
    slug: "business-banking",
    label: "Business banking",
    description: "Business checking, savings, merchant, and treasury products with entity and activity requirements.",
  },
  {
    slug: "mortgage-lenders",
    label: "Mortgage lenders",
    description: "Mortgage comparison topics where rates, points, closing costs, and eligibility should be verified directly.",
  },
  {
    slug: "personal-loans",
    label: "Personal loans",
    description: "Loan products where APR, origination fees, term length, and credit qualification determine cost.",
  },
];

export const localOfferTypes: LocalOfferType[] = [
  {
    slug: "bank-bonuses",
    label: "Bank bonuses",
    description: "Promotions tied to new accounts, direct deposits, balances, spend, or qualifying activity.",
  },
  {
    slug: "local-bank-matches",
    label: "Local bank matches",
    description: "Lead capture paths for users who want help comparing local banks or credit unions.",
  },
  {
    slug: "rate-comparison",
    label: "Rate comparison",
    description: "Educational rate pages that remind readers to verify current rates with the institution.",
  },
  {
    slug: "deal-alerts",
    label: "Deal alerts",
    description: "Email capture for readers who want banking offer updates and local comparison reminders.",
  },
];

const floridaFaqs: FaqItem[] = [
  {
    question: "Is OfferRadar a bank?",
    answer:
      "No. OfferRadar is not a bank, credit union, lender, or financial institution. Pages are educational comparison resources.",
  },
  {
    question: "Can rates and offers change?",
    answer:
      "Yes. Rates, fees, eligibility, and offers can change. Always verify details directly with the financial institution before opening an account or applying.",
  },
  {
    question: "Does OfferRadar provide financial advice?",
    answer:
      "No. OfferRadar provides educational information and comparison tools, not personalized financial, legal, tax, or lending advice.",
  },
];

export const localSeoPages: LocalSeoPage[] = [
  {
    slug: "best-checking-accounts-florida",
    title: "Best Checking Accounts in Florida",
    description:
      "Compare Florida checking accounts by fees, direct deposit features, branch access, digital tools, and account bonus requirements.",
    h1: "Best checking accounts in Florida",
    kind: "state",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Florida checking account shoppers usually compare monthly fees, direct deposit features, ATM access, branch convenience, mobile banking, and any available new-account bonus. This guide gives a practical framework for comparing accounts before verifying terms directly with the institution.",
    comparisonSections: [
      {
        title: "What to compare first",
        body: "A strong checking account is not only about a signup bonus. Ongoing fees, direct deposit rules, overdraft policies, ATM access, and service quality can matter more over time.",
        points: ["Monthly fee and waiver rules", "Direct deposit requirements", "ATM and branch access", "Overdraft and account closure policies"],
      },
      {
        title: "Florida access considerations",
        body: "Florida users may prefer national banks, regional banks, local credit unions, or online banks depending on branch needs and digital banking comfort.",
        points: ["Branch footprint", "Online account opening", "Local customer support", "Eligibility or regional restrictions"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare checking offers",
      body: "Use OfferRadar to compare requirements, verification dates, and local banking options before choosing an account.",
    },
    relatedLinks: [
      { href: "/bank-bonuses-promotions-florida", label: "Florida bank bonuses" },
      { href: "/best-savings-accounts-florida", label: "Florida savings accounts" },
      { href: "/checking-account-bonuses", label: "Checking account bonuses" },
    ],
  },
  {
    slug: "best-savings-accounts-florida",
    title: "Best Savings Accounts in Florida",
    description:
      "Compare Florida savings accounts by APY, balance requirements, fees, access, and verification reminders.",
    h1: "Best savings accounts in Florida",
    kind: "state",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Savings accounts in Florida can include national online banks, local credit unions, regional banks, and cash accounts. APYs are variable, so compare fees, balance tiers, withdrawal limits, and deposit insurance information before relying on a rate.",
    comparisonSections: [
      {
        title: "Savings account factors",
        body: "The highest advertised APY is only useful if the account fits your balance, access needs, and fee tolerance.",
        points: ["Variable APY", "Minimum balance", "Monthly fees", "Transfer and withdrawal access"],
      },
      {
        title: "Local vs online options",
        body: "Local institutions may offer branch support while online banks may compete on rate. Verify all terms directly.",
        points: ["Branch support", "Online transfers", "Deposit insurance", "Rate tiers"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare savings options",
      body: "Review high-yield savings listings, balance rules, and verification dates before opening an account.",
    },
    relatedLinks: [
      { href: "/high-yield-savings", label: "High-yield savings" },
      { href: "/savings-account-bonuses", label: "Savings bonuses" },
      { href: "/new-money-savings-bonuses", label: "New money savings bonuses" },
    ],
  },
  {
    slug: "best-credit-unions-florida",
    title: "Best Credit Unions in Florida",
    description:
      "Compare Florida credit unions by membership eligibility, branch access, checking, savings, loan products, and local service.",
    h1: "Best credit unions in Florida",
    kind: "state",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Florida credit unions can be attractive for local service, member-focused products, and competitive account or loan options. Membership eligibility, branch access, and product availability vary by institution.",
    comparisonSections: [
      {
        title: "Credit union eligibility",
        body: "Credit unions may require a geographic, employer, association, or family relationship connection before membership is available.",
        points: ["Membership field of eligibility", "Opening deposit", "Branch and shared branch access", "Online banking tools"],
      },
      {
        title: "Products to review",
        body: "Compare checking, savings, certificates, auto loans, mortgages, business accounts, and fees before joining.",
        points: ["Account fees", "Loan rates and terms", "Local branch convenience", "Member service reputation"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Get matched with a local bank",
      body: "Tell us your city and product interest so OfferRadar can help organize local banking options for review.",
    },
    relatedLinks: [
      { href: "/credit-unions-sanford-fl", label: "Credit unions in Sanford" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/business-banking-florida", label: "Florida business banking" },
    ],
  },
  {
    slug: "credit-unions-sanford-fl",
    title: "Credit Unions in Sanford, FL",
    description:
      "Compare credit union options in Sanford, Florida by membership eligibility, branch access, account fees, and product fit.",
    h1: "Credit unions in Sanford, FL",
    kind: "city",
    location: "Sanford, FL",
    lastUpdated: "2026-06-03",
    intro:
      "Sanford residents can compare nearby credit unions, regional banks, and online alternatives based on membership eligibility, convenience, account fees, and product needs. Always verify membership rules directly with the institution.",
    comparisonSections: [
      {
        title: "Local access",
        body: "A Sanford credit union may be useful if branch convenience, local service, or community eligibility matters to you.",
        points: ["Seminole County eligibility", "Branch and ATM access", "Mobile deposit", "Shared branching"],
      },
      {
        title: "Account fit",
        body: "Compare checking, savings, certificates, loans, and business accounts against your expected usage.",
        points: ["Monthly fees", "Minimum balances", "Loan products", "Business account availability"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Get matched with a Sanford-area bank",
      body: "Share your city and product interest to start a local banking comparison checklist.",
    },
    relatedLinks: [
      { href: "/banks-lake-mary-fl", label: "Banks in Lake Mary" },
      { href: "/best-credit-unions-florida", label: "Florida credit unions" },
      { href: "/bank-bonuses-promotions-florida", label: "Florida bank promotions" },
    ],
  },
  {
    slug: "banks-lake-mary-fl",
    title: "Banks in Lake Mary, FL",
    description:
      "Compare banks in Lake Mary, Florida by checking, savings, business banking, branch access, fees, and promotions.",
    h1: "Banks in Lake Mary, FL",
    kind: "city",
    location: "Lake Mary, FL",
    lastUpdated: "2026-06-03",
    intro:
      "Lake Mary banking options can include national banks, regional banks, credit unions, and online alternatives. Compare convenience, account costs, business services, and any promotions before choosing where to open an account.",
    comparisonSections: [
      {
        title: "Consumer banking",
        body: "For personal banking, focus on checking fees, savings rates, ATM access, digital tools, and account opening requirements.",
        points: ["Checking fees", "Savings APY", "ATM access", "Direct deposit features"],
      },
      {
        title: "Business banking",
        body: "Lake Mary businesses may need cash deposits, merchant services, payroll support, wires, ACH, or local relationship banking.",
        points: ["Business checking", "Transaction limits", "Cash deposit rules", "Merchant services"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare Lake Mary banking options",
      body: "Use OfferRadar to organize local bank features, fees, and offer requirements before contacting a provider.",
    },
    relatedLinks: [
      { href: "/credit-unions-sanford-fl", label: "Sanford credit unions" },
      { href: "/business-banking-florida", label: "Florida business banking" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
    ],
  },
  {
    slug: "mortgage-rates-florida",
    title: "Mortgage Rates in Florida",
    description:
      "Learn how to compare Florida mortgage rates, APR, points, closing costs, lender fees, and local lender options.",
    h1: "Mortgage rates in Florida",
    kind: "mortgage",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Florida mortgage rates can vary by lender, borrower profile, loan type, down payment, points, and market conditions. OfferRadar does not quote live rates; use this page to understand what to compare before verifying directly with lenders.",
    comparisonSections: [
      {
        title: "Rate vs APR",
        body: "The interest rate is only one part of cost. APR may include certain fees, and points can change the upfront-versus-monthly tradeoff.",
        points: ["Interest rate", "APR", "Discount points", "Origination and lender fees"],
      },
      {
        title: "Florida lender checklist",
        body: "Compare loan type, closing costs, preapproval process, local service, and total payment before choosing a lender.",
        points: ["Loan type", "Estimated cash to close", "Rate lock terms", "Servicing and local support"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Get matched with a Florida mortgage option",
      body: "Share your city and product interest so we can route you into a comparison workflow as OfferRadar expands lender coverage.",
    },
    relatedLinks: [
      { href: "/best-credit-unions-florida", label: "Florida credit unions" },
      { href: "/banks-lake-mary-fl", label: "Banks in Lake Mary" },
      { href: "/guides/offer-comparisons", label: "Offer comparison guide" },
    ],
  },
  {
    slug: "business-banking-florida",
    title: "Business Banking in Florida",
    description:
      "Compare Florida business banking options by fees, transaction limits, cash deposits, merchant services, and promotions.",
    h1: "Business banking in Florida",
    kind: "business",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Florida businesses may need more than a basic checking account. Compare monthly fees, transaction limits, ACH, wires, cash deposits, merchant services, payroll integrations, and business banking promotions.",
    comparisonSections: [
      {
        title: "Business account needs",
        body: "A solo consultant, restaurant, contractor, or ecommerce brand may need different banking features.",
        points: ["Monthly fee", "Transaction limits", "Cash deposit rules", "ACH and wire access"],
      },
      {
        title: "Promotion requirements",
        body: "Business banking bonuses may require deposits, new money, debit card activity, merchant activity, or minimum balances.",
        points: ["Entity documentation", "Deposit requirements", "Activity window", "Bonus payout timing"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare business banking",
      body: "Tell us your city and product interest to start a Florida business banking comparison checklist.",
    },
    relatedLinks: [
      { href: "/business-banking", label: "Business banking offers" },
      { href: "/business-checking-bonuses", label: "Business checking bonuses" },
      { href: "/banks-lake-mary-fl", label: "Banks in Lake Mary" },
    ],
  },
  {
    slug: "bank-bonuses-promotions-florida",
    title: "Bank Bonuses and Promotions in Florida",
    description:
      "Compare Florida bank bonuses and promotions by eligibility, direct deposit, balance requirements, fees, and verification dates.",
    h1: "Bank bonuses and promotions in Florida",
    kind: "promotions",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Florida bank promotions can include checking bonuses, savings bonuses, business banking promotions, and referral offers. Requirements vary by provider, state, account type, and customer history.",
    comparisonSections: [
      {
        title: "Bonus requirements",
        body: "The headline dollar amount should be compared against the required deposits, monthly fees, activity rules, and payout timing.",
        points: ["Direct deposit requirement", "Minimum balance", "Monthly fees", "Eligibility restrictions"],
      },
      {
        title: "Promotion safety checks",
        body: "Offers can change or end early. Keep screenshots, verify provider terms, and avoid opening accounts solely for a bonus if the account does not fit.",
        points: ["Last reviewed date", "Offer expiration", "Provider terms", "Disclosure reminders"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Join banking deal alerts",
      body: "Get organized updates as OfferRadar expands Florida banking promotion coverage.",
    },
    relatedLinks: [
      { href: "/bank-bonuses", label: "Bank bonuses" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/best-savings-accounts-florida", label: "Florida savings accounts" },
    ],
  },
];

export function getLocalSeoPageBySlug(slug: string) {
  return localSeoPages.find((page) => page.slug === slug);
}
