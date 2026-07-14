import type { Metadata } from "next";
import { DiscoveryHub } from "@/components/DiscoveryHub";
export const metadata: Metadata = { title: "Travel Money and Florida Trip Research", description: "A curated travel gateway for card fees, banking access, Florida trip planning, and travel-ready account research.", alternates: { canonical: "/travel" } };
export default function TravelPage() { return <DiscoveryHub path="/travel" eyebrow="Curated travel gateway" title="Travel money and Florida trip research" intro="Plan how banking access, card fees, account holds, cash, and emergency funds fit into a trip. This hub curates existing useful content rather than duplicating unverified deal listings." note="Flight, hotel, cruise, and local-deal network destinations will be added only after each live property, ownership, analytics parameters, and reciprocal context are verified." links={[
  { href: "/travel-fee-calculator", label: "Travel fee calculator", description: "Estimate foreign transaction, ATM, and card-related travel costs.", kind: "travel" },
  { href: "/2026-world-cup-banking-guide", label: "World Cup banking guide", description: "Plan cards, cash, ATMs, access, and mobile banking for travel.", kind: "travel" },
  { href: "/travel-card-welcome-offers", label: "Travel card offers", description: "Review existing tracked travel-card research and eligibility checks.", kind: "money" },
  { href: "/florida", label: "Florida planning hub", description: "Connect travel planning with local banking and statewide research.", kind: "florida" },
  { href: "/best-bank-for-checking", label: "Travel-ready checking", description: "Compare account access, ATM fees, mobile tools, and support.", kind: "compare" },
  { href: "/research/checking-account-fees-that-can-erase-a-signup-bonus", label: "Fee research", description: "Understand how ATM, transfer, and account fees change net value.", kind: "research" },
]} />; }
