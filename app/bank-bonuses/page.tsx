import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Bank Bonuses",
  description:
    "Compare example checking and savings bank bonuses with requirements, fees, last checked dates, and provider verification reminders.",
  alternates: { canonical: "/bank-bonuses" },
};

export default function BankBonusesPage() {
  return <CategoryPage category={category} />;
}
