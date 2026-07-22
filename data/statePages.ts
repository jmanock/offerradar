import type { StatePageInfo } from "@/types/offer";

function statePage(slug: string, stateName: string, details: Partial<StatePageInfo> = {}): StatePageInfo {
  const base: StatePageInfo = {
    slug,
    stateName,
    title: `${stateName} Bank Bonuses`,
    description: `Compare ${stateName} bank bonuses and national bank offers with state availability, direct deposit, and verification reminders.`,
    h1: `${stateName} bank bonuses`,
    intro: `This page groups bank bonuses that may be relevant to ${stateName}, plus national offers that may be available online. Availability can vary by user, state, bank, account type, and funding requirements.`,
    cautions: [
      "Verify state availability directly with the provider before opening an account.",
      "Check direct deposit definitions, monthly fees, and early closure rules.",
      "Online national offers can still have eligibility restrictions or account history exclusions.",
    ],
    relatedPages: ["/bank-bonuses", "/checking-account-bonuses", "/direct-deposit-bonuses", "/national-bank-bonuses", "/best-banks-for-checking"],
    faq: [
      {
        question: `Are all listed offers available in ${stateName}?`,
        answer:
          "No. This page includes state-tagged and national tracked offers. Providers control eligibility and availability, so verify terms directly.",
      },
      {
        question: "Do state pages provide financial advice?",
        answer:
          "No. State pages are informational comparison pages and do not recommend any account or financial action.",
      },
    ],
    lastVerified: "2026-07-22",
  };
  return { ...base, ...details };
}

export const statePages: StatePageInfo[] = [
  statePage("alabama-bank-bonuses", "Alabama"),
  statePage("arizona-bank-bonuses", "Arizona", { institutions: [{ name: "Desert Financial Credit Union", context: "Review current Arizona membership eligibility, account access, and fee terms." }, { name: "National and online banks", context: "Compare statewide digital access with cash-deposit and support needs." }], accessNotes: ["Confirm credit-union membership before comparing an account.", "Map surcharge-free ATMs and branch access around regular travel routes."], faq: [{ question: "Which Arizona institutions should I compare?", answer: "Arizona users can research local credit unions such as Desert Financial alongside national and online banks. Verify current membership, availability, and account terms directly." }, { question: "Are Arizona bank bonuses available statewide?", answer: "Not necessarily. Promotions may use branch, ZIP code, account-history, or funding restrictions, so verify current eligibility." }] }),
  statePage("california-bank-bonuses", "California"),
  statePage("colorado-bank-bonuses", "Colorado", { institutions: [{ name: "Regional banks and credit unions", context: "Compare current Colorado service areas, membership rules, branch access, and account fees." }, { name: "National and online banks", context: "Compare statewide digital access with cash-deposit and in-person support needs." }], accessNotes: ["Branch and ATM access can differ between the Front Range, mountain communities, and rural areas.", "Verify ZIP-code availability and application-channel requirements before relying on a promotion."], relatedPages: ["/bank-bonuses", "/checking-account-bonuses", "/direct-deposit-bonuses", "/offers", "/research/bank-bonus-requirements-people-commonly-miss"], faq: [{ question: "Are Colorado bank bonuses available statewide?", answer: "Not always. ZIP code, branch market, account history, and application channel can affect eligibility. Verify current terms directly." }, { question: "What should Colorado users compare beyond a bonus?", answer: "Compare fees, waivers, ATM and branch access, cash deposits, mobile tools, support, and whether the account remains useful." }] }),
  statePage("connecticut-bank-bonuses", "Connecticut"),
  statePage("florida-bank-bonuses", "Florida"),
  statePage("georgia-bank-bonuses", "Georgia", { institutions: [{ name: "Delta Community Credit Union", context: "Review current county, employer, and family membership paths before applying." }, { name: "National and regional banks", context: "Compare branch access, direct-deposit rules, and online availability." }], accessNotes: ["Credit-union eligibility may depend on county, employer, or family relationships.", "Metro Atlanta access can differ from availability elsewhere in Georgia."], faq: [{ question: "Can any Georgia resident join every credit union?", answer: "No. Membership rules vary. Review the credit union's current field of membership before opening an account." }, { question: "What should Georgia users verify in a bank promotion?", answer: "Verify geographic eligibility, direct-deposit definitions, fees, deadlines, and branch or ATM access." }] }),
  statePage("illinois-bank-bonuses", "Illinois"),
  statePage("indiana-bank-bonuses", "Indiana"),
  statePage("maryland-bank-bonuses", "Maryland"),
  statePage("massachusetts-bank-bonuses", "Massachusetts"),
  statePage("michigan-bank-bonuses", "Michigan", { institutions: [{ name: "Lake Michigan Credit Union", context: "Check current membership and required share-account terms." }, { name: "Regional and national banks", context: "Compare branch coverage with online account availability." }], accessNotes: ["Review membership and share-deposit requirements for credit unions.", "Access can vary between western Michigan, Detroit-area, and statewide online options."], faq: [{ question: "Should Michigan users compare banks and credit unions?", answer: "Yes. Compare membership, fees, branch and ATM access, mobile tools, and current promotion eligibility." }, { question: "Does a Michigan page guarantee local availability?", answer: "No. Provider terms and geographic restrictions control availability." }] }),
  statePage("minnesota-bank-bonuses", "Minnesota"),
  statePage("missouri-bank-bonuses", "Missouri"),
  statePage("new-jersey-bank-bonuses", "New Jersey"),
  statePage("new-york-bank-bonuses", "New York"),
  statePage("north-carolina-bank-bonuses", "North Carolina", { institutions: [{ name: "State Employees' Credit Union", context: "Review current employment, family, and other membership eligibility before comparing accounts." }, { name: "National and regional banks", context: "Compare broad digital access with local branch coverage." }], accessNotes: ["SECU and other credit unions use specific membership rules.", "Compare branch access outside major metro areas before relying on in-person service."], faq: [{ question: "Can every North Carolina resident join SECU?", answer: "No. SECU publishes membership eligibility rules. Verify that you qualify before considering an account." }, { question: "What makes a North Carolina offer relevant?", answer: "Relevance depends on availability, account fit, fees, access, and realistic qualification requirements." }] }),
  statePage("ohio-bank-bonuses", "Ohio", { institutions: [{ name: "Regional banks and credit unions", context: "Review current Ohio availability, membership rules, account fees, and local access." }, { name: "National and online banks", context: "Compare broader digital access with branch, ATM, and cash-deposit needs." }], accessNotes: ["Access patterns can differ across Cleveland, Columbus, Cincinnati, and smaller communities.", "Verify direct-deposit definitions, customer-history exclusions, and the required application path."], relatedPages: ["/bank-bonuses", "/checking-account-bonuses", "/direct-deposit-bonuses", "/offers", "/research/how-to-tell-whether-a-bank-bonus-is-worth-it"], faq: [{ question: "How should Ohio users compare bank bonuses?", answer: "Start with eligibility, fees, direct-deposit or balance requirements, payout timing, branch access, and ongoing account fit." }, { question: "Does a listed Ohio offer guarantee eligibility?", answer: "No. Providers control geographic availability, customer-history rules, qualification, and payout." }] }),
  statePage("pennsylvania-bank-bonuses", "Pennsylvania", { institutions: [{ name: "PNC", context: "Review current Pennsylvania account availability, branch access, and promotion terms." }, { name: "Regional banks and credit unions", context: "Compare local access in your county with national online options." }], accessNotes: ["Branch networks differ across Philadelphia, Pittsburgh, and rural areas.", "Confirm whether an online promotion is available at a local branch or only through a specific application path."], faq: [{ question: "Are Pennsylvania bank promotions the same statewide?", answer: "Not always. ZIP code, branch market, account history, and application channel can affect eligibility." }, { question: "What access should Pennsylvania users compare?", answer: "Compare nearby branches, ATM networks, cash-deposit options, mobile support, and travel needs." }] }),
  statePage("tennessee-bank-bonuses", "Tennessee"),
  statePage("texas-bank-bonuses", "Texas", { institutions: [{ name: "Frost Bank", context: "Review current Texas service availability, account fees, and branch access." }, { name: "National and online banks", context: "Compare wider digital access with Texas cash-deposit and support needs." }], accessNotes: ["Texas is large enough that branch and ATM usefulness should be checked by city and travel route.", "Verify direct-deposit definitions and whether an offer requires a specific application channel."], faq: [{ question: "Which Texas banks should I research?", answer: "Texas users can compare regional institutions such as Frost with national and online banks. OfferRadar does not rank an institution solely because it is local." }, { question: "Are Texas bank bonuses guaranteed?", answer: "No. Eligibility, qualification, availability, and payout depend on current provider terms." }] }),
  statePage("virginia-bank-bonuses", "Virginia", { institutions: [{ name: "Atlantic Union Bank", context: "Review current Virginia account availability, fees, and branch coverage." }, { name: "National and online banks", context: "Compare digital access with local branch and cash-deposit needs." }], accessNotes: ["Northern Virginia, Hampton Roads, Richmond, and rural access patterns can differ.", "Some credit unions use military, employer, family, or geographic eligibility rules."], faq: [{ question: "Which Virginia institutions should I compare?", answer: "Research regional institutions such as Atlantic Union alongside national banks, online banks, and credit unions you are eligible to join." }, { question: "What should Virginia users verify first?", answer: "Verify geographic and membership eligibility, fees, direct-deposit rules, branch access, and current promotion terms." }] }),
  statePage("washington-bank-bonuses", "Washington"),
  statePage("wisconsin-bank-bonuses", "Wisconsin"),
  {
    ...statePage("national-bank-bonuses", "National"),
    title: "National Bank Bonuses",
    description:
      "Compare national bank bonuses and online banking offers with direct deposit, fee, and verification reminders.",
    h1: "National bank bonuses",
    intro:
      "This page focuses on national and online bank bonuses. National does not mean every user qualifies; provider terms, account history, state rules, and funding requirements still apply.",
    relatedPages: ["/bank-bonuses", "/checking-account-bonuses", "/direct-deposit-bonuses"],
  },
];
