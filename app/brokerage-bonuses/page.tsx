import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Brokerage Bonuses",
  description:
    "Compare brokerage bonuses, transfer promotions, and investing referral offers with funding requirements and risk notes.",
  alternates: { canonical: "/brokerage-bonuses" },
};

export default function BrokerageBonusesPage() {
  return <CategoryPage category={category} />;
}
