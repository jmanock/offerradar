import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Bank Bonuses (2026) | Compare Checking and Savings Offers",
  description:
    "Compare tracked checking and savings account offers by direct deposit rules, balance requirements, monthly fees, account access, and last verified dates.",
  alternates: { canonical: "/bank-bonuses" },
  openGraph: {
    title: "Bank Bonuses (2026) | Compare Checking and Savings Offers",
    description:
      "Compare tracked checking and savings offers by requirements, fees, eligibility, and last verified dates.",
  },
};

export default function BankBonusesPage() {
  return <CategoryPage category={category} />;
}
