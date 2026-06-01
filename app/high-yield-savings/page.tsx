import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("high-yield-savings")!;

export const metadata: Metadata = {
  title: "High-Yield Savings",
  description:
    "Compare high-yield savings rates and account offers with APY notes, fees, and last reviewed dates.",
  alternates: { canonical: "/high-yield-savings" },
};

export default function HighYieldSavingsPage() {
  return <CategoryPage category={category} />;
}
