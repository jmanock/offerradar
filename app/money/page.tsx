import type { Metadata } from "next";
import { DiscoveryHub } from "@/components/DiscoveryHub";
export const metadata: Metadata = { title: "Money Offers and Comparison Tools", description: "Explore bank bonuses, checking, savings, credit unions, brokerage offers, referrals, calculators, and comparisons.", alternates: { canonical: "/money" } };
export default function MoneyPage() { return <DiscoveryHub path="/money" eyebrow="Money radar" title="Money offers and tools" intro="Move from discovery to requirements, comparison, tracking, and a practical net-value decision." links={[
  { href: "/bank-bonuses", label: "Bank bonuses", description: "Compare checking and savings promotions with fees and review dates.", kind: "money" },
  { href: "/best-bank-for-checking", label: "Checking accounts", description: "Research account fit, access, direct deposit, and monthly fees.", kind: "money" },
  { href: "/high-yield-savings", label: "Savings", description: "Review savings offers, balance requirements, and terms to verify.", kind: "money" },
  { href: "/best-credit-unions-florida", label: "Credit unions", description: "Compare membership rules, access, fees, and digital tools.", kind: "florida" },
  { href: "/brokerage-bonuses", label: "Brokerage", description: "Explore transfer and funding promotions with holding-period checks.", kind: "compare" },
  { href: "/referral-offers", label: "Referrals", description: "See tracked referral records with visible eligibility notes.", kind: "shopping" },
  { href: "/bank-bonus-calculator", label: "Calculators", description: "Estimate net value after known fees and account costs.", kind: "software" },
  { href: "/compare", label: "Comparisons", description: "Compare providers and research paths side by side.", kind: "compare" },
  { href: "/offer-tracker", label: "Offer tracker", description: "Filter, sort, save, and review structured offer records.", kind: "research" },
]} />; }
