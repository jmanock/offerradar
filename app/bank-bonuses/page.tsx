import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Bank Bonuses | Compare Checking and Savings Offers",
  description:
    "Compare tracked checking and savings account offers by direct deposit requirements, monthly fees, eligibility, and last verified dates.",
  alternates: { canonical: "/bank-bonuses" },
};

export default function BankBonusesPage() {
  return <CategoryPage category={category} />;
}
