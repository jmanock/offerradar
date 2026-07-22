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
    label: "Local banking comparisons",
    description: "Comparison paths for users researching local banks or credit unions.",
  },
  {
    slug: "rate-comparison",
    label: "Rate comparison",
    description: "Educational rate pages that remind readers to verify current rates with the institution.",
  },
  {
    slug: "deal-alerts",
    label: "Banking research updates",
    description: "Organized updates for readers tracking banking offers and local comparison topics.",
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
    title: "Best Checking Accounts in Florida (2026)",
    description:
      "Compare Florida checking accounts by fees, bonuses, online banks, credit unions, mobile banking, ATM access, and last verified details.",
    h1: "Best checking accounts and bonuses in Florida",
    kind: "state",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Compare checking accounts in Florida by monthly fees, direct deposit features, ATM and branch access, mobile banking, and any tracked Florida checking account bonus. There is no single best account for every user, so review the ongoing account fit and verify current terms directly with the institution.",
    comparisonSections: [
      {
        title: "What to compare first",
        body: "A strong Florida checking account is not only about a signup bonus. Ongoing fees, direct deposit rules, overdraft policies, ATM access, branch access, and service quality can matter more over time.",
        points: ["Monthly fee and waiver rules", "Direct deposit requirements", "ATM and branch access", "Overdraft and account closure policies"],
      },
      {
        title: "Florida access considerations",
        body: "Florida users may prefer national banks, regional banks, local credit unions, or online banks depending on branch needs and digital banking comfort.",
        points: ["Branch footprint", "Online account opening", "Local customer support", "Eligibility or regional restrictions"],
      },
      {
        title: "Best online banks in Florida",
        body: "Online banks serving Florida can be useful for digital account opening, mobile banking, savings transfers, and ATM-network access. Compare cash deposit options, support access, account fees, and whether the institution fits your everyday checking needs.",
        points: ["Online account opening", "Mobile banking tools", "ATM network and fee policy", "Cash deposit limitations"],
      },
      {
        title: "Florida credit unions",
        body: "Florida credit unions may offer local service and member-focused accounts, but membership eligibility, branch coverage, shared-branch access, and account terms vary. Verify eligibility before comparing a credit union bonus or checking account.",
        points: ["Membership eligibility", "Local and shared branch access", "Checking account fees", "Current credit union terms"],
      },
      {
        title: "National banks vs local banks",
        body: "National banks may offer broader branch, ATM, and digital coverage, while local banks and credit unions may offer community presence or membership-based service. Compare access, fees, support, and account fit instead of relying on brand size alone.",
        points: ["Branch and ATM access", "Digital banking features", "Local support", "Fee waiver rules"],
      },
      {
        title: "Florida checking account bonus comparison",
        body: "A Florida checking account bonus may require a new account, qualifying direct deposits, an offer code, or account activity. Compare the ongoing account terms as carefully as the promotion.",
        points: ["New customer eligibility", "Direct deposit definition", "Monthly fee waiver", "Last verified date"],
      },
      {
        title: "Checking vs savings account offers in Florida",
        body: "Checking offers commonly focus on direct deposit or transactions, while savings offers may require new money and maintained balances. Compare access, fees, and account purpose before choosing either.",
        points: ["Account purpose", "Required activity", "Balance requirements", "Withdrawal and transfer access"],
      },
      {
        title: "What Florida users should verify",
        body: "Before opening an account, verify state availability, branch or ATM access, deposit insurance, fees, current promotion terms, and whether the account remains useful after a bonus period.",
        points: ["Florida availability", "Provider terms", "Deposit insurance", "Account fit after promotion"],
      },
    ],
    faqs: [
      ...floridaFaqs,
      {
        question: "How do I compare checking account bonuses in Florida?",
        answer:
          "Compare eligibility, direct deposit definitions, monthly fees, activity deadlines, account access, and last verified dates, then confirm current terms directly with the institution.",
      },
      {
        question: "Should I compare checking and savings account offers together?",
        answer:
          "Yes, when both account types could fit your needs. Checking and savings promotions often use different requirements, fees, access rules, and balance expectations.",
      },
      {
        question: "What are the best checking accounts in Florida?",
        answer:
          "The best fit depends on your branch and ATM needs, fee tolerance, direct deposit use, digital banking preferences, eligibility, and current account terms. Compare several institutions before choosing.",
      },
      {
        question: "How should I compare checking accounts in Florida?",
        answer:
          "Compare monthly fees, waiver rules, nearby branches, ATM access, online and mobile banking, overdraft policies, direct deposit compatibility, deposit insurance, and any tracked bonus requirements.",
      },
      {
        question: "Can I compare a Florida checking account bonus with account features?",
        answer:
          "Yes. Treat the bonus as one research point. Compare eligibility, direct deposit rules, deadlines, payout timing, monthly fees, account access, and whether the account still fits after the promotion.",
      },
      {
        question: "Are Florida checking account bonuses available statewide?",
        answer:
          "Not always. Availability can vary by ZIP code, institution, account package, customer history, enrollment channel, and promotion. Verify current terms directly.",
      },
      {
        question: "How should I compare online banks in Florida?",
        answer:
          "Compare online account opening, mobile tools, ATM access, cash deposit options, support, monthly fees, deposit insurance, and current terms before choosing an online bank.",
      },
      {
        question: "Which are the best banks in Florida?",
        answer:
          "The best bank depends on your location, branch needs, digital banking preferences, account fees, ATM access, eligibility, and current terms. Compare national banks, local banks, credit unions, and online banks.",
      },
    ],
    cta: {
      title: "Compare checking offers",
      body: "Use OfferRadar to compare requirements, verification dates, and local banking options before choosing an account.",
    },
    relatedLinks: [
      { href: "/banking-finder", label: "Banking finder" },
      { href: "/offer-tracker", label: "Offer tracker" },
      { href: "/bank-bonuses-promotions-florida", label: "Florida bank bonuses" },
      { href: "/best-savings-accounts-florida", label: "Florida savings accounts" },
      { href: "/best-banks-for-checking", label: "Best banks for checking" },
      { href: "/best-banks-for-checking", label: "Best banks for checking" },
      { href: "/best-checking-and-savings-account-offers", label: "Checking and savings account offers" },
      { href: "/checking-account-bonuses", label: "Checking account bonuses" },
      { href: "/bank-bonuses", label: "Bank bonuses" },
      { href: "/best-bank-bonuses-florida", label: "Best Florida bank bonuses" },
      { href: "/offers", label: "All tracked offers" },
      { href: "/provider/wells-fargo", label: "Wells Fargo tracked offers" },
      { href: "/compare/chase-vs-sofi", label: "Chase vs SoFi comparison" },
      { href: "/guides/direct-deposits", label: "Direct deposit guide" },
      { href: "/best-banks-in-florida", label: "Best banks in Florida research" },
      { href: "/florida-bank-bonuses", label: "Florida bank bonus guide" },
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
    faqs: [
      ...floridaFaqs,
      {
        question: "What is the best credit union in Florida?",
        answer:
          "There is no single best credit union for every Florida resident. Compare membership eligibility, branch access, ATM network, mobile tools, checking fees, savings options, loan products, and current terms.",
      },
      {
        question: "How do I compare the best credit unions in Florida?",
        answer:
          "Start with eligibility, then compare account fees, minimum deposits, savings and certificate terms, mobile banking, ATM access, shared branching, support, and product availability.",
      },
      {
        question: "Can anyone join a Florida credit union?",
        answer:
          "Not always. Credit unions define fields of membership that may depend on where you live, work, study, worship, or whether you belong to an eligible group or family relationship.",
      },
      {
        question: "Are Florida credit unions better than banks?",
        answer:
          "Not automatically. Credit unions may fit users who value local service or membership-based products, while banks may offer broader branch networks or specialized digital tools. Compare the account fit.",
      },
      {
        question: "Should I choose a credit union for savings rates?",
        answer:
          "Savings and certificate rates can be worth comparing, but rates change. Verify current APY, balance tiers, minimum deposits, withdrawal limits, and membership requirements directly.",
      },
      {
        question: "What ATM access should I verify?",
        answer:
          "Verify fee-free ATM networks, shared branching, cash deposit options, ATM-owner fees, withdrawal limits, and access in the Florida cities where you bank most often.",
      },
    ],
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
    title: "Best Credit Unions in Florida (2026)",
    description:
      "Compare Florida credit unions by membership rules, checking fees, savings rate questions, mobile app access, ATM networks, and best-fit categories.",
    h1: "Best credit unions in Florida",
    kind: "state",
    location: "Florida",
    lastUpdated: "2026-06-03",
    intro:
      "Florida credit unions can be attractive for local service, member-focused products, shared branching, savings options, and checking accounts. The best credit union for one household may be a poor fit for another, so compare membership eligibility, account fees, ATM access, mobile banking tools, and current terms before joining.",
    comparisonSections: [
      {
        title: "Credit union eligibility",
        body: "Credit unions may require a geographic, employer, association, school, military, faith, or family relationship connection before membership is available. Some Florida credit unions serve a narrow community while others support broader regional membership.",
        points: ["Membership field of eligibility", "Opening deposit", "Branch and shared branch access", "Online banking tools"],
      },
      {
        title: "Products to review",
        body: "Compare checking, savings, money market accounts, certificates, auto loans, mortgages, business accounts, and fees before joining. A credit union with strong loan products may not always have the best checking account for everyday use.",
        points: ["Account fees", "Loan rates and terms", "Local branch convenience", "Member service reputation"],
      },
      {
        title: "Membership requirements",
        body: "Before comparing rates or promotions, confirm that you can join. Review residence, workplace, school, association, family, and opening deposit requirements directly with the credit union.",
        points: ["Residence rules", "Employer or school eligibility", "Family membership", "Opening share deposit"],
      },
      {
        title: "Fee comparison",
        body: "Credit union checking accounts can still have monthly fees, overdraft fees, wire fees, early withdrawal penalties, and inactive-account fees. Compare the complete fee schedule before joining.",
        points: ["Monthly checking fee", "Overdraft policy", "Wire and transfer fees", "Certificate penalties"],
      },
      {
        title: "Savings rates discussion",
        body: "Savings rates and certificate rates can change quickly. Compare current rate tiers, balance requirements, early withdrawal rules, and whether the account is practical for your cash needs.",
        points: ["Variable savings APY", "Certificate term", "Balance tier", "Withdrawal restrictions"],
      },
      {
        title: "Mobile app comparison",
        body: "Mobile deposit, card controls, alerts, external transfers, support messaging, and account security can differ widely across credit unions. Digital tools matter if you do not live near a branch.",
        points: ["Mobile deposit", "Card controls", "Account alerts", "External transfers"],
      },
      {
        title: "ATM network comparison",
        body: "Compare local branches, shared branching, ATM network access, ATM-owner fees, and cash deposit options. The best Florida credit union should work in the places you actually bank.",
        points: ["Shared branching", "Fee-free ATM access", "Cash deposits", "Travel access"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Review local banking options",
      body: "Tell us your city and product interest so OfferRadar can help organize local banking options for review.",
    },
    relatedLinks: [
      { href: "/banking-finder", label: "Banking finder" },
      { href: "/credit-unions-sanford-fl", label: "Credit unions in Sanford" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/bank-bonuses", label: "Bank bonuses" },
      { href: "/offers", label: "All tracked offers" },
      { href: "/best-banks-for-checking", label: "Best banks for checking" },
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
      title: "Review Sanford-area banking options",
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
      title: "Review Florida mortgage options",
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
      title: "Track Florida banking updates",
      body: "Request organized updates as OfferRadar expands Florida banking promotion coverage.",
    },
    relatedLinks: [
      { href: "/bank-bonuses", label: "Bank bonuses" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/best-savings-accounts-florida", label: "Florida savings accounts" },
    ],
  },
  {
    slug: "checking-account-bonuses-florida",
    title: "Checking Account Bonuses in Florida",
    description:
      "Compare checking account bonuses in Florida by direct deposit requirements, fees, eligibility, and last reviewed dates.",
    h1: "Checking account bonuses in Florida",
    kind: "promotions",
    location: "Florida",
    lastUpdated: "2026-06-05",
    intro:
      "Florida checking account bonuses can be useful to compare, but eligibility, direct deposit rules, monthly fees, and payout timing vary by provider. Use this page as a checklist before verifying terms directly.",
    comparisonSections: [
      {
        title: "Direct deposit and activity rules",
        body: "Many checking bonuses require qualifying direct deposits or account activity within a defined window.",
        points: ["Qualifying deposit source", "Minimum deposit amount", "Activity deadline", "Payout timing"],
      },
      {
        title: "Fees and eligibility",
        body: "A bonus can lose value if the account has monthly fees, waiver rules, or early closure restrictions that do not fit your situation.",
        points: ["Monthly fee waiver", "New customer rule", "State availability", "Early closure policy"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare checking bonuses",
      body: "Review tracked checking offers and request local match alerts as Florida coverage expands.",
    },
    relatedLinks: [
      { href: "/best-checking-accounts-florida", label: "Best checking accounts in Florida" },
      { href: "/checking-account-bonuses", label: "Checking account bonuses" },
      { href: "/bank-bonuses-promotions-florida", label: "Florida bank promotions" },
    ],
  },
  {
    slug: "savings-account-bonuses-florida",
    title: "Savings Account Bonuses in Florida",
    description:
      "Compare Florida savings account bonuses by new money rules, balance requirements, APY, fees, and verification reminders.",
    h1: "Savings account bonuses in Florida",
    kind: "promotions",
    location: "Florida",
    lastUpdated: "2026-06-05",
    intro:
      "Savings account bonuses in Florida often depend on new money, balance tiers, hold periods, and variable APYs. Compare the bonus against account fit and provider terms.",
    comparisonSections: [
      {
        title: "New money and balance rules",
        body: "Savings bonuses may require external deposits that stay in the account for a stated period.",
        points: ["New money definition", "Minimum balance", "Hold period", "Funding deadline"],
      },
      {
        title: "Rate and fee checks",
        body: "Savings APYs can change, and fees or withdrawal rules may affect whether an account is useful beyond the bonus.",
        points: ["Variable APY", "Monthly fee", "Withdrawal limits", "Deposit insurance disclosures"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare savings bonuses",
      body: "Track savings offers, balance requirements, and verification dates before moving money.",
    },
    relatedLinks: [
      { href: "/best-savings-accounts-florida", label: "Best savings accounts in Florida" },
      { href: "/savings-account-bonuses", label: "Savings account bonuses" },
      { href: "/high-yield-savings", label: "High-yield savings" },
    ],
  },
  {
    slug: "brokerage-bonuses-florida",
    title: "Brokerage Bonuses in Florida",
    description:
      "Compare brokerage bonuses available to Florida users by funding thresholds, transfer rules, holding periods, and risk reminders.",
    h1: "Brokerage bonuses in Florida",
    kind: "promotions",
    location: "Florida",
    lastUpdated: "2026-06-05",
    intro:
      "Brokerage bonuses may be available nationally, including to Florida users, but account approval, funding thresholds, transfer rules, and investment risks should be reviewed carefully.",
    comparisonSections: [
      {
        title: "Funding and transfer requirements",
        body: "Brokerage promotions often use tiered rewards based on new money, ACAT transfers, or retirement account movement.",
        points: ["Funding tier", "Eligible account type", "Transfer deadline", "Holding period"],
      },
      {
        title: "Risk and cost reminders",
        body: "Investment accounts can lose value, and transfer fees, advisory fees, or tax considerations may matter more than a bonus.",
        points: ["Market risk", "Transfer fees", "Tax considerations", "Account fit"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Compare brokerage bonuses",
      body: "Use OfferRadar to compare funding requirements and risk notes before opening or transferring an account.",
    },
    relatedLinks: [
      { href: "/brokerage-bonuses", label: "Brokerage bonuses" },
      { href: "/best-brokerage-bonuses", label: "Best brokerage bonuses" },
      { href: "/brokerage-signup-bonuses", label: "Brokerage signup bonuses" },
    ],
  },
  {
    slug: "referral-bonuses-florida",
    title: "Referral Bonuses in Florida",
    description:
      "Compare referral bonuses relevant to Florida users by app eligibility, invite links, required activity, and payout rules.",
    h1: "Referral bonuses in Florida",
    kind: "promotions",
    location: "Florida",
    lastUpdated: "2026-06-05",
    intro:
      "Referral bonuses can vary by user, link, campaign, and region. Florida users should confirm the in-app or provider terms before relying on a referral reward.",
    comparisonSections: [
      {
        title: "Referral eligibility",
        body: "A referral link may require a new account, identity verification, funding, spend, or a first transaction before a reward is available.",
        points: ["New user status", "Eligible invite link", "Required activity", "Reward timing"],
      },
      {
        title: "Reward value and limits",
        body: "Referral rewards can change, expire, or vary by account. Confirm the visible bonus screen before acting.",
        points: ["Reward amount", "Both-party eligibility", "Campaign expiration", "Payout method"],
      },
    ],
    faqs: floridaFaqs,
    cta: {
      title: "Track referral offer updates",
      body: "Request organized updates as OfferRadar expands referral offer coverage and source review.",
    },
    relatedLinks: [
      { href: "/referral-offers", label: "Referral offers" },
      { href: "/referral-bonuses", label: "Referral bonuses" },
      { href: "/app-referral-offers", label: "App referral offers" },
    ],
  },
];

export function getLocalSeoPageBySlug(slug: string) {
  return localSeoPages.find((page) => page.slug === slug);
}
