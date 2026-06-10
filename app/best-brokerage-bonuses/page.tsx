import type { Metadata } from "next";
import { BestOfPage } from "@/components/BestOfPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Best Brokerage Bonuses | Verified Offers and Requirements",
  description:
    "Compare tracked brokerage bonus records by value, funding or transfer requirements, holding periods, verification status, and last verified date.",
  alternates: { canonical: "/best-brokerage-bonuses" },
  openGraph: {
    title: "Best Brokerage Bonuses | Verified Offers and Requirements",
    description:
      "Compare tracked brokerage promotions, requirements, holding periods, verification status, and last verified dates.",
  },
};

export default function BestBrokerageBonusesPage() {
  return (
    <BestOfPage
      category={category}
      title="Best brokerage bonuses to compare"
      intro="A ranked, verification-first comparison of active tracked brokerage, transfer, and investing account records with requirements and risk notes surfaced."
    />
  );
}
