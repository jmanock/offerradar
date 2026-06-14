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
  {
    slug: "florida-credit-unions",
    title: "Florida Credit Unions",
    description: "Compare Florida credit union access, membership rules, account features, fees, and offer verification considerations.",
    h1: "Florida credit unions to research",
    intro: "Florida credit unions can offer local service, shared branching, and member-focused accounts. Membership rules, product availability, fees, and promotions vary, so compare the full account fit and verify current terms directly.",
    sections: [
      { title: "Membership eligibility", body: "Credit union access can depend on where you live, work, study, worship, or participate in an eligible organization.", points: ["Eligibility field", "Opening deposit", "Membership share", "Florida availability"] },
      { title: "Access and service", body: "Compare local branches, shared branching, ATM networks, digital tools, and support options before choosing an institution.", points: ["Branch footprint", "Shared branches", "ATM access", "Mobile banking"] },
      { title: "Accounts, fees, and promotions", body: "Review checking and savings features alongside monthly fees, waiver rules, deposit insurance, and any current promotion terms.", points: ["Monthly fees", "Balance requirements", "NCUA coverage", "Current provider terms"] },
    ],
    faq: [
      { question: "How do I join a Florida credit union?", answer: "Eligibility varies. Review the credit union's current field of membership, location rules, organization affiliations, and opening requirements." },
      { question: "Are Florida credit unions better than banks?", answer: "Neither is universally better. Compare access, account features, fees, service, membership rules, and current terms for your needs." },
    ],
    relatedLinks: [
      { href: "/best-credit-unions-florida", label: "Best Florida credit unions comparison" },
      { href: "/best-banks-in-florida", label: "Banks in Florida" },
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/state/florida", label: "Florida offer tracker" },
    ],
  },
  {
    slug: "best-online-banks-in-florida",
    title: "Best Online Banks in Florida",
    description: "Compare online banks available in Florida by account access, fees, savings features, support, and verification considerations.",
    h1: "Online banks available in Florida",
    intro: "Online banks can serve Florida customers without relying on a local branch network. Compare account access, cash deposit options, ATM coverage, fees, support, and current terms before opening an account.",
    sections: [
      { title: "Digital account access", body: "Review mobile and web tools, customer support hours, transfer options, and how quickly deposits become available.", points: ["Mobile tools", "Transfer timing", "Support access", "Deposit availability"] },
      { title: "ATM and cash access", body: "Online banks may use partner ATM networks and can differ substantially in how they handle cash deposits and reimburse fees.", points: ["ATM network", "ATM fee policy", "Cash deposits", "Debit card access"] },
      { title: "Savings and checking fit", body: "Compare variable savings rates, checking features, monthly fees, minimum balances, and any tracked promotion requirements.", points: ["Variable APY", "Monthly fees", "Minimum balance", "Promotion terms"] },
    ],
    faq: [
      { question: "Can Florida residents use online banks?", answer: "Many online banks serve Florida residents, but availability, identity requirements, account features, and terms should be verified directly." },
      { question: "What should I verify before choosing an online bank?", answer: "Verify deposit insurance, fees, ATM and cash access, support options, transfer timing, account eligibility, and current terms." },
    ],
    relatedLinks: [
      { href: "/best-banks-in-florida", label: "Best banks in Florida" },
      { href: "/best-savings-accounts-florida", label: "Florida savings accounts" },
      { href: "/high-yield-savings", label: "High-yield savings tracker" },
      { href: "/providers", label: "Provider directory" },
    ],
  },
  {
    slug: "wells-fargo-bonuses",
    title: "Wells Fargo Bonuses",
    description: "Research tracked Wells Fargo bonus records, common requirements, fees, eligibility, and current-term verification.",
    h1: "Wells Fargo bonuses and requirements",
    intro: "Wells Fargo promotions may involve checking accounts or other eligible products. OfferRadar organizes tracked records for research, but availability, eligibility, approval, and payout must be verified directly with Wells Fargo.",
    sections: [
      { title: "Common eligibility checks", body: "A promotion may use new-customer rules, an offer code, location eligibility, or a defined enrollment channel.", points: ["New-customer rules", "Offer code", "Enrollment channel", "Location eligibility"] },
      { title: "Activity and timing", body: "Checking promotions can depend on qualifying direct deposits, account activity, and deadlines defined in the live terms.", points: ["Direct deposit definition", "Required amount", "Activity window", "Payout timing"] },
      { title: "Fees and ongoing fit", body: "Review monthly fees, waiver options, early closure terms, and whether the account remains useful after a promotion.", points: ["Monthly fee", "Waiver rules", "Early closure", "Ongoing account fit"] },
    ],
    faq: [
      { question: "Does OfferRadar guarantee a Wells Fargo bonus?", answer: "No. OfferRadar provides tracked research records. Verify current availability, eligibility, requirements, and payout terms directly with Wells Fargo." },
      { question: "Does OfferRadar track Wells Fargo credit card offers?", answer: "OfferRadar may list tracked credit card records when data is available, but approval, rewards, spend requirements, APR, fees, and current terms must be verified directly." },
    ],
    relatedLinks: [
      { href: "/provider/wells-fargo", label: "Wells Fargo provider page" },
      { href: "/wells-fargo-checking-bonus", label: "Wells Fargo checking bonus research" },
      { href: "/bank-bonuses", label: "Bank bonus tracker" },
      { href: "/compare/chase-vs-wells-fargo", label: "Chase vs Wells Fargo" },
    ],
    offerCategory: "bank-bonuses",
  },
  {
    slug: "wells-fargo-checking-bonus",
    title: "Wells Fargo Checking Bonus",
    description: "Review Wells Fargo checking bonus requirements, direct deposit concepts, fees, deadlines, and current-term verification.",
    h1: "Wells Fargo checking bonus research",
    intro: "A Wells Fargo checking promotion may require enrollment through an eligible channel and qualifying activity within a stated period. Use this page as a research checklist, then verify the live terms directly with Wells Fargo.",
    sections: [
      { title: "Direct deposit requirements", body: "Provider terms control which electronic deposits qualify, the required total, and the deadline for completing activity.", points: ["Qualifying deposit source", "Required total", "Activity deadline", "Posting date"] },
      { title: "Account fees to review", body: "Compare the account's monthly fee, waiver paths, minimum balances, and early closure conditions.", points: ["Monthly fee", "Fee waiver", "Minimum balance", "Early closure"] },
      { title: "Before opening an account", body: "Confirm the offer is available to you and save the current terms, enrollment details, and activity records.", points: ["Eligibility", "Offer enrollment", "Terms saved", "Activity records"] },
    ],
    faq: [
      { question: "What counts as direct deposit for a Wells Fargo checking bonus?", answer: "The live Wells Fargo promotion terms define qualifying direct deposits. Verify eligible sources, amounts, deadlines, and exclusions before acting." },
      { question: "Can an existing customer receive a checking bonus?", answer: "Eligibility rules can vary by promotion and customer history. Review the current new-customer and prior-account restrictions directly." },
    ],
    relatedLinks: [
      { href: "/provider/wells-fargo", label: "Wells Fargo tracked records" },
      { href: "/wells-fargo-bonuses", label: "Wells Fargo bonus guide" },
      { href: "/checking-account-bonuses", label: "Checking account bonuses" },
      { href: "/guides/direct-deposits", label: "Direct deposit guide" },
    ],
    offerCategory: "bank-bonuses",
  },
  {
    slug: "robinhood-vs-webull",
    title: "Robinhood vs Webull",
    description: "Compare Robinhood and Webull brokerage promotions, transfer considerations, account features, fees, and verification reminders.",
    h1: "Robinhood vs Webull promotions and account fit",
    intro: "Robinhood and Webull may offer different brokerage tools, account features, and promotions. Compare the full account fit, transfer requirements, costs, and current terms rather than choosing on a promotion alone.",
    sections: [
      { title: "Promotion types", body: "Promotions can involve referrals, new accounts, funding, subscriptions, or asset transfers, with eligibility controlled by each provider.", points: ["Referral eligibility", "Funding requirement", "Transfer tiers", "Campaign dates"] },
      { title: "Transfer considerations", body: "Before an ACAT transfer, compare supported assets, outgoing fees, transfer timing, holding periods, and withdrawal consequences.", points: ["Supported assets", "Transfer fee", "Holding period", "Withdrawal treatment"] },
      { title: "Brokerage account fit", body: "Review investment tools, available securities, account types, support, fees, and risks alongside any promotion.", points: ["Investment products", "Account types", "Platform fees", "Customer support"] },
    ],
    faq: [
      { question: "Is Robinhood or Webull better for a transfer bonus?", answer: "That depends on current terms, eligible assets, transfer value, holding periods, fees, and which brokerage better fits your needs." },
      { question: "Are brokerage promotions guaranteed?", answer: "No. Availability and eligibility can vary. Verify the live promotion and brokerage terms directly before opening or transferring an account." },
    ],
    relatedLinks: [
      { href: "/compare/robinhood-vs-webull", label: "Provider comparison record" },
      { href: "/provider/robinhood", label: "Robinhood tracked records" },
      { href: "/provider/webull", label: "Webull tracked records" },
      { href: "/brokerage-transfer-bonuses", label: "Brokerage transfer bonuses" },
    ],
    offerCategory: "brokerage-bonuses",
  },
  {
    slug: "robinhood-vs-fidelity",
    title: "Robinhood vs Fidelity",
    description: "Compare Robinhood and Fidelity brokerage promotions, transfer requirements, account types, fees, and verification reminders.",
    h1: "Robinhood vs Fidelity promotions and account fit",
    intro: "Robinhood and Fidelity serve different brokerage research needs and may use different promotion structures. Compare account types, investment access, transfer terms, fees, support, and current provider requirements.",
    sections: [
      { title: "Promotion and transfer research", body: "A tracked promotion may depend on incoming assets, account funding, referral eligibility, campaign timing, or a required holding period.", points: ["Eligible account", "Funding or transfer tier", "Holding period", "Current terms"] },
      { title: "Account type differences", body: "Compare supported brokerage, retirement, cash management, margin, and other account types directly with each provider.", points: ["Brokerage accounts", "Retirement accounts", "Cash management", "Account eligibility"] },
      { title: "Fees, tools, and support", body: "Review trading and account fees, research tools, investment selection, customer support, and transfer policies.", points: ["Account fees", "Investment selection", "Research tools", "Support access"] },
    ],
    faq: [
      { question: "Should I choose Robinhood or Fidelity based on a bonus?", answer: "A promotion is only one comparison factor. Consider account types, tools, investment options, fees, service, and current terms." },
      { question: "What should I verify before transferring a brokerage account?", answer: "Verify eligible assets, transfer type, outgoing fees, tax considerations, holding periods, promotion eligibility, and current terms." },
    ],
    relatedLinks: [
      { href: "/compare/fidelity-vs-robinhood", label: "Fidelity vs Robinhood provider comparison" },
      { href: "/provider/robinhood", label: "Robinhood tracked records" },
      { href: "/provider/fidelity", label: "Fidelity tracked records" },
      { href: "/robinhood-transfer-bonus-guide", label: "Robinhood transfer guide" },
    ],
    offerCategory: "brokerage-bonuses",
  },
];

export function getAuthorityPage(slug: string) {
  return authorityPages.find((page) => page.slug === slug);
}
