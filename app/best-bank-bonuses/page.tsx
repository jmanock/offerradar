import type { Metadata } from "next";
import { BestOfPage } from "@/components/BestOfPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("bank-bonuses")!;

export const metadata: Metadata = {
  title: "Best Bank Bonuses",
  description:
    "Compare active bank bonuses with requirements, fees, verification notes, and disclosure reminders.",
  alternates: { canonical: "/best-bank-bonuses" },
};

export default function BestBankBonusesPage() {
  return (
    <BestOfPage
      category={category}
      title="Best bank bonuses"
      intro="A focused view of active bank bonuses with direct deposit, deposit, monthly fee, and verification context surfaced for comparison."
    />
  );
}
