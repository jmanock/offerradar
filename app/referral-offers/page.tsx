import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("referral-offers")!;

export const metadata: Metadata = {
  title: "Referral Offers",
  description:
    "Compare tracked referral offers and credits with eligibility notes, last reviewed dates, and provider verification reminders.",
  alternates: { canonical: "/referral-offers" },
};

export default function ReferralOffersPage() {
  return <CategoryPage category={category} />;
}
