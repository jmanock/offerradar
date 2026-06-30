import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Best Bank Bonuses: Checking and Savings Offers Compared",
  description:
    "Compare bank bonuses, checking and savings account offers, direct deposit requirements, monthly fees, account access, and last verified dates.",
  alternates: { canonical: "/bank-bonuses" },
  openGraph: {
    title: "Best Bank Bonuses: Checking and Savings Offers Compared",
    description:
      "Compare tracked checking and savings account offers by requirements, fees, eligibility, account fit, and last verified dates.",
  },
};

export default function BankBonusesPage() {
  return <CategoryPage category={category} />;
}
