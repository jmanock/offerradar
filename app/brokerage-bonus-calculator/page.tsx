import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "Brokerage Bonus Calculator | Estimate Transfer Costs",
  description: "Estimate a brokerage bonus after transfer and account fees while reviewing holding periods, investment risk, and provider terms.",
  alternates: { canonical: "/brokerage-bonus-calculator" },
};

export default function BrokerageBonusCalculatorPage() {
  return <CalculatorPage mode="brokerage" path="brokerage-bonus-calculator" title="Brokerage bonus calculator" intro="Estimate a brokerage promotion after listed transfer and account fees. Review the required transfer amount and holding period alongside investment risk and current provider terms." relatedLinks={[{ href: "/brokerage-bonuses", label: "Brokerage bonuses" }, { href: "/brokerage-transfer-bonuses", label: "Transfer bonus guide" }, { href: "/guides/brokerage-bonuses", label: "Brokerage bonus guide" }]} />;
}
