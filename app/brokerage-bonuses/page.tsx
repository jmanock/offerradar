import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Brokerage Bonuses Compared: Transfer, Signup & Funding Offers",
  description:
    "Compare brokerage bonuses and promotions by provider, bonus amount, transfer requirements, funding rules, holding periods, fees, and verification dates.",
  openGraph: {
    title: "Brokerage Bonuses Compared: Transfer, Signup & Funding Offers",
    description:
      "Compare brokerage account promotions by provider, bonus amount, transfer requirements, holding periods, and last verified dates.",
  },
  alternates: { canonical: "/brokerage-bonuses" },
};

export default function BrokerageBonusesPage() {
  return <CategoryPage category={category} />;
}
