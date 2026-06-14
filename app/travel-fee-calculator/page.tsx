import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "Travel Banking Fee Calculator | Estimate Card and ATM Fees",
  description: "Estimate foreign transaction and ATM withdrawal fees for travel, then verify current bank and card terms.",
  alternates: { canonical: "/travel-fee-calculator" },
};

export default function TravelFeeCalculatorPage() {
  return <CalculatorPage mode="travel" path="travel-fee-calculator" title="Travel banking fee calculator" intro="Estimate foreign transaction and ATM withdrawal fees using your planned travel spending. Verify percentages, withdrawal fees, exchange terms, and card access directly with each provider." relatedLinks={[{ href: "/world-cup-travel-money-guide", label: "World Cup travel money guide" }, { href: "/world-cup-bank-account-travel-checklist", label: "Travel banking checklist" }, { href: "/credit-card-offers", label: "Credit card offers" }]} />;
}
