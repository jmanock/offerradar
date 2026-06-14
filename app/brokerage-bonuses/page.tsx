import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Brokerage Account Bonuses (2026) | Compare Promotions",
  description:
    "Compare tracked brokerage account promotions by funding or transfer requirements, holding periods, fees, verification status, and last verified dates.",
  openGraph: {
    title: "Brokerage Account Bonuses (2026) | Compare Promotions",
    description:
      "Compare tracked brokerage promotions, transfer requirements, funding thresholds, holding periods, and last verified dates.",
  },
  alternates: { canonical: "/brokerage-bonuses" },
};

export default function BrokerageBonusesPage() {
  return <CategoryPage category={category} />;
}
