import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "Bank Bonus Calculator | Estimate Fees and Net Value",
  description: "Estimate a bank bonus after monthly fees and compare a simple effective return before verifying provider terms.",
  alternates: { canonical: "/bank-bonus-calculator" },
};

export default function BankBonusCalculatorPage() {
  return <CalculatorPage mode="bank" path="bank-bonus-calculator" title="Bank bonus calculator" intro="Estimate the net value of a tracked bank bonus after listed monthly fees, then compare the required deposit and holding period. The result is a simple educational estimate." relatedLinks={[{ href: "/bank-bonuses", label: "Bank bonuses" }, { href: "/best-bank-bonuses", label: "Best tracked bank bonuses" }, { href: "/guides/bank-bonuses", label: "Bank bonus guide" }]} />;
}
