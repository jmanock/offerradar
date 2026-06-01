import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/lib/offers";

const category = getCategoryBySlug("cash-back-apps")!;

export const metadata: Metadata = {
  title: "Cash Back Apps",
  description:
    "Compare cash back app, receipt, dining, fuel, and shopping portal offers with payout and tracking notes.",
  alternates: { canonical: "/cash-back-apps" },
};

export default function CashBackAppsPage() {
  return <CategoryPage category={category} />;
}
