import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Best Bank Bonuses (2026) | Checking and Savings Offers",
  description:
    "Compare tracked checking and savings account promotions by direct deposit rules, balance requirements, monthly fees, account access, and last verified dates.",
  alternates: { canonical: "/bank-bonuses" },
  openGraph: {
    title: "Best Bank Bonuses (2026) | Checking and Savings Offers",
    description:
      "Compare tracked checking and savings promotions by requirements, fees, eligibility, and last verified dates.",
  },
};

export default function BankBonusesPage() {
  return <CategoryPage category={category} />;
}
