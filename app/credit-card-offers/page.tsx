import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("credit-card-offers")!;

export const metadata: Metadata = {
  title: "Credit Card Offers",
  description:
    "Compare example credit card welcome offers with spend requirements, annual fees, verification notes, and cautious eligibility reminders.",
  alternates: { canonical: "/credit-card-offers" },
};

export default function CreditCardOffersPage() {
  return <CategoryPage category={category} />;
}
