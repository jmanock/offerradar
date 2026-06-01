import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("business-banking")!;

export const metadata: Metadata = {
  title: "Business Banking",
  description:
    "Compare business checking, savings, merchant, and card offers with activity requirements and fee notes.",
  alternates: { canonical: "/business-banking" },
};

export default function BusinessBankingPage() {
  return <CategoryPage category={category} />;
}
