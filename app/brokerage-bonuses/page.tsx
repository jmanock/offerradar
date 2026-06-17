import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Brokerage Promotions and Account Bonuses (2026) | Compare Offers",
  description:
    "Compare brokerage promotions and account bonuses by provider, bonus amount, transfer requirement, holding period, fees, and verification date.",
  openGraph: {
    title: "Brokerage Promotions and Account Bonuses (2026) | Compare Offers",
    description:
      "Compare brokerage account promotions by provider, bonus amount, transfer requirements, holding periods, and last verified dates.",
  },
  alternates: { canonical: "/brokerage-bonuses" },
};

export default function BrokerageBonusesPage() {
  return <CategoryPage category={category} />;
}
