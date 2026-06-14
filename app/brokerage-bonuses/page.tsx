import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Brokerage Bonuses (2026) | Compare Verified Promotions",
  description:
    "Compare tracked brokerage promotions, account bonuses, transfer requirements, holding periods, fees, and last verified dates.",
  openGraph: {
    title: "Brokerage Bonuses (2026) | Compare Verified Promotions",
    description:
      "Compare tracked brokerage promotions, transfer requirements, funding thresholds, holding periods, and last verified dates.",
  },
  alternates: { canonical: "/brokerage-bonuses" },
};

export default function BrokerageBonusesPage() {
  return <CategoryPage category={category} />;
}
