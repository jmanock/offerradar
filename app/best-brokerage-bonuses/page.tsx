import type { Metadata } from "next";
import { BestOfPage } from "@/components/BestOfPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("brokerage-bonuses")!;

export const metadata: Metadata = {
  title: "Best Brokerage Bonuses",
  description:
    "Compare active example brokerage bonuses with funding thresholds, holding period reminders, verification notes, and risk context.",
  alternates: { canonical: "/best-brokerage-bonuses" },
};

export default function BestBrokerageBonusesPage() {
  return (
    <BestOfPage
      category={category}
      title="Best brokerage bonuses"
      intro="A comparison page for active example brokerage, transfer, and investing account bonuses from the local OfferRadar dataset."
    />
  );
}
