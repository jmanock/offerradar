import type { Metadata } from "next";
import { BestOfPage } from "@/components/BestOfPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("referral-offers")!;

export const metadata: Metadata = {
  title: "Best Referral Bonuses",
  description:
    "Compare active tracked referral bonuses with eligibility notes, referral link context, verification status, and disclosure reminders.",
  alternates: { canonical: "/best-referral-bonuses" },
};

export default function BestReferralBonusesPage() {
  return (
    <BestOfPage
      category={category}
      title="Best referral bonuses"
      intro="A practical view of active tracked referral offers where eligibility, tracking, and user-specific terms can matter as much as the headline value."
    />
  );
}
