import type { Metadata } from "next";
import { BestOfPage } from "@/components/BestOfPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Best Bank Bonuses | Current Tracked Offers and Requirements",
  description:
    "Compare current tracked bank bonus records by requirements, fees, direct deposit rules, verification dates, and provider terms.",
  alternates: { canonical: "/best-bank-bonuses" },
  openGraph: {
    title: "Best Bank Bonuses | Verified Offers and Requirements",
    description:
      "Compare current tracked bank bonus records, requirements, fees, direct deposit rules, and last verified dates.",
  },
};

export default function BestBankBonusesPage() {
  return (
    <BestOfPage
      category={category}
      title="Best bank bonuses to compare"
      intro="A verification-first view of current tracked bank bonus records with direct deposit, deposit, monthly fee, eligibility, and provider-term context."
    />
  );
}
