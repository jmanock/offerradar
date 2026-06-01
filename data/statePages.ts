import type { StatePageInfo } from "@/types/offer";

function statePage(slug: string, stateName: string): StatePageInfo {
  return {
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
    relatedPages: ["/bank-bonuses", "/checking-account-bonuses", "/direct-deposit-bonuses", "/national-bank-bonuses"],
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
  };
}

export const statePages: StatePageInfo[] = [
  statePage("alabama-bank-bonuses", "Alabama"),
  statePage("arizona-bank-bonuses", "Arizona"),
  statePage("california-bank-bonuses", "California"),
  statePage("colorado-bank-bonuses", "Colorado"),
  statePage("connecticut-bank-bonuses", "Connecticut"),
  statePage("florida-bank-bonuses", "Florida"),
  statePage("georgia-bank-bonuses", "Georgia"),
  statePage("illinois-bank-bonuses", "Illinois"),
  statePage("indiana-bank-bonuses", "Indiana"),
  statePage("maryland-bank-bonuses", "Maryland"),
  statePage("massachusetts-bank-bonuses", "Massachusetts"),
  statePage("michigan-bank-bonuses", "Michigan"),
  statePage("minnesota-bank-bonuses", "Minnesota"),
  statePage("missouri-bank-bonuses", "Missouri"),
  statePage("new-jersey-bank-bonuses", "New Jersey"),
  statePage("new-york-bank-bonuses", "New York"),
  statePage("north-carolina-bank-bonuses", "North Carolina"),
  statePage("ohio-bank-bonuses", "Ohio"),
  statePage("pennsylvania-bank-bonuses", "Pennsylvania"),
  statePage("tennessee-bank-bonuses", "Tennessee"),
  statePage("texas-bank-bonuses", "Texas"),
  statePage("virginia-bank-bonuses", "Virginia"),
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
