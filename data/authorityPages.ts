export type AuthorityPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { title: string; body: string; points: string[] }[];
  faq: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
  offerCategory?: "bank-bonuses" | "brokerage-bonuses";
};

const transferFaq = [
  {
    question: "What is an ACAT transfer?",
    answer: "ACAT is a common system used to transfer eligible brokerage assets between firms. Supported assets, timing, fees, and transfer treatment vary by provider.",
  },
  {
    question: "Do transfer bonuses require a holding period?",
    answer: "Some do. Verify the required asset value, eligible transfer type, holding period, subscription costs, and current provider terms before moving assets.",
  },
];

export const authorityPages: AuthorityPage[] = [
  {
    slug: "brokerage-transfer-bonuses",
    title: "Brokerage Transfer Bonuses",
    description: "Compare tracked brokerage transfer bonus records, ACAT concepts, asset thresholds, holding periods, and verification reminders.",
    h1: "Brokerage transfer bonuses to compare",
    intro: "Brokerage transfer promotions may depend on eligible incoming assets, transfer value, account type, and a required holding period. Compare the full account fit and verify current provider terms before moving assets.",
    sections: [
      { title: "Transfer requirements", body: "Providers may set asset-value tiers, eligible account types, campaign windows, and restrictions on transferred positions.", points: ["Minimum transfer value", "Eligible account types", "Supported assets", "Campaign window"] },
      { title: "ACAT and transfer fees", body: "ACAT can move eligible brokerage assets between firms, but outgoing firms may charge fees and some assets may not transfer.", points: ["Full or partial ACAT", "Outgoing transfer fee", "Unsupported assets", "Transfer timing"] },
      { title: "Holding periods and account fit", body: "A transfer promotion can require assets to remain at the new firm. Review holding periods, withdrawal consequences, investment tools, service, and fees.", points: ["Holding period", "Withdrawal treatment", "Account fees", "Investment risk"] },
    ],
    faq: transferFaq,
    relatedLinks: [
      { href: "/brokerage-bonuses", label: "Brokerage promotions" },
      { href: "/best-brokerage-bonuses", label: "Best tracked brokerage records" },
      { href: "/robinhood-transfer-bonus-guide", label: "Robinhood transfer guide" },
      { href: "/guides/brokerage-bonuses", label: "Brokerage bonus guide" },
    ],
    offerCategory: "brokerage-bonuses",
  },
  {
    slug: "robinhood-transfer-bonus-guide",
    title: "Robinhood Transfer Bonus Guide",
    description: "Research Robinhood transfer bonus concepts, ACAT transfers, holding periods, requirements, and current-term verification.",
    h1: "Robinhood transfer bonus guide",
    intro: "Robinhood transfer promotions may depend on eligible incoming assets, transfer value, account features, and holding periods. This guide explains what to verify without assuming a promotion is currently available.",
    sections: [
      { title: "How transfer bonuses work", body: "A brokerage may offer a promotion for moving eligible assets from another firm. The value and eligibility can depend on transfer size, account type, timing, and campaign terms.", points: ["Eligible incoming assets", "Transfer value tiers", "Campaign dates", "Account eligibility"] },
      { title: "ACAT transfer concepts", body: "An ACAT transfer can move eligible securities between brokerages without selling them first, but not every asset or account type is supported.", points: ["Full vs partial transfer", "Unsupported assets", "Outgoing transfer fees", "Transfer timing"] },
      { title: "Holding periods and verification", body: "Transfer promotions may require assets to remain for a stated period. Verify withdrawal consequences, subscription requirements, investment risk, and live terms.", points: ["Holding period", "Withdrawal treatment", "Subscription cost", "Last verified date"] },
    ],
    faq: transferFaq,
    relatedLinks: [
      { href: "/provider/robinhood", label: "Robinhood tracked records" },
      { href: "/brokerage-bonuses", label: "Brokerage promotions" },
      { href: "/brokerage-transfer-bonuses", label: "Transfer bonus comparison" },
      { href: "/compare/robinhood-vs-webull", label: "Robinhood vs Webull" },
    ],
    offerCategory: "brokerage-bonuses",
  },
  {
    slug: "best-bank-bonuses-florida",
    title: "Best Bank Bonuses in Florida",
    description: "Compare tracked Florida bank bonus records by eligibility, direct deposit, fees, access, and verification dates.",
    h1: "Best bank bonuses in Florida",
    intro: "Florida bank bonus research should include eligibility, direct deposit definitions, monthly fees, branch access, and whether the account remains useful after a promotion ends.",
    sections: [
      { title: "Checking bonus requirements", body: "Checking promotions commonly use direct deposit, account activity, offer codes, or new-customer rules.", points: ["Direct deposit definition", "Activity deadline", "Monthly fee", "New-customer eligibility"] },
      { title: "Savings bonus requirements", body: "Savings promotions may require new money, a maintained balance, and a defined funding window.", points: ["New money definition", "Balance tier", "Hold period", "Variable APY"] },
      { title: "Florida availability checks", body: "National, regional, and local institutions can have different Florida access and eligibility rules.", points: ["State availability", "Branch access", "ATM access", "Provider terms"] },
    ],
    faq: [
      { question: "Are bank bonuses available everywhere in Florida?", answer: "Not always. Availability can vary by ZIP code, account package, customer history, and provider campaign." },
      { question: "What should Florida users verify first?", answer: "Verify eligibility, direct deposit or balance requirements, monthly fees, deadlines, branch access, and current provider terms." },
    ],
    relatedLinks: [
      { href: "/bank-bonuses", label: "Bank bonus tracker" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/florida-bank-bonuses", label: "Florida bank bonus guide" },
      { href: "/guides/direct-deposits", label: "Direct deposit guide" },
    ],
    offerCategory: "bank-bonuses",
  },
  {
    slug: "best-banks-in-florida",
    title: "Best Banks in Florida",
    description: "Compare Florida banking options by account fit, branch access, digital tools, fees, and tracked offer coverage.",
    h1: "Best banks in Florida to compare",
    intro: "There is no single best bank for every Florida resident. Compare national banks, regional institutions, credit unions, and online banks by the features and access that fit your needs.",
    sections: [
      { title: "National banks", body: "National banks may offer broad branch and ATM access, established digital tools, and multiple account types.", points: ["Florida branch footprint", "ATM network", "Account packages", "Fee waivers"] },
      { title: "Regional banks and credit unions", body: "Regional institutions and credit unions may offer local service or membership-based products, but eligibility and footprint vary.", points: ["Membership eligibility", "Local branches", "Shared branching", "Product availability"] },
      { title: "Online banking options", body: "Online banks can be useful for digital-first access and savings products, but cash deposits and in-person support may be limited.", points: ["Mobile tools", "Cash deposits", "Customer support", "ATM access"] },
    ],
    faq: [
      { question: "What makes a bank a good fit in Florida?", answer: "Consider fees, branch and ATM access, digital tools, customer support, account features, and current provider terms." },
      { question: "Should I choose a bank only for a bonus?", answer: "A promotion can be one comparison factor, but ongoing fees, access, service, and account fit may matter more." },
    ],
    relatedLinks: [
      { href: "/best-checking-accounts-florida", label: "Florida checking comparison" },
      { href: "/best-savings-accounts-florida", label: "Florida savings comparison" },
      { href: "/best-credit-unions-florida", label: "Florida credit unions" },
      { href: "/providers", label: "Provider directory" },
    ],
  },
  {
    slug: "florida-bank-bonuses",
    title: "Florida Bank Bonuses",
    description: "Research Florida bank bonuses, direct deposit requirements, monthly fees, availability, and verification dates.",
    h1: "Florida bank bonuses and requirements",
    intro: "Florida bank bonus records can include national, regional, local, checking, savings, and business banking promotions. Compare requirements and verify current terms directly.",
    sections: [
      { title: "Direct deposit and activity", body: "Providers may define qualifying direct deposit differently or require debit, balance, or transaction activity.", points: ["Qualifying source", "Required amount", "Activity window", "Posting timeline"] },
      { title: "Fees and account fit", body: "Monthly fees, waiver rules, early closure costs, and the account's ongoing usefulness can affect practical value.", points: ["Monthly fee", "Waiver rules", "Early closure", "Ongoing account fit"] },
      { title: "Verification-first research", body: "Use last verified dates to orient research, then check the live provider source before opening an account.", points: ["Last verified", "Source reviewed", "Current terms", "Florida availability"] },
    ],
    faq: [
      { question: "How do Florida bank bonuses differ?", answer: "Requirements can differ by provider, account type, ZIP code, customer history, deposit source, and campaign." },
      { question: "Does OfferRadar guarantee a Florida bank bonus?", answer: "No. OfferRadar tracks research records. Verify current availability, eligibility, and terms directly with the provider." },
    ],
    relatedLinks: [
      { href: "/best-bank-bonuses-florida", label: "Best Florida bonus records" },
      { href: "/bank-bonuses", label: "All bank bonuses" },
      { href: "/bank-bonuses-promotions-florida", label: "Florida promotion comparison" },
      { href: "/best-banks-in-florida", label: "Banks in Florida" },
    ],
    offerCategory: "bank-bonuses",
  },
];

export function getAuthorityPage(slug: string) {
  return authorityPages.find((page) => page.slug === slug);
}
