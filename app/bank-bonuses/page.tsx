import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Best Checking and Savings Account Offers (2026) | Bank Bonuses",
  description:
    "Compare bank bonuses, checking account promotions, and savings account offers by requirements, fees, account access, and last verified dates.",
  alternates: { canonical: "/bank-bonuses" },
  openGraph: {
    title: "Best Checking and Savings Account Offers (2026) | Bank Bonuses",
    description:
      "Compare tracked checking and savings account offers by requirements, fees, eligibility, account fit, and last verified dates.",
  },
};

export default function BankBonusesPage() {
  return <CategoryPage category={category} />;
}
