import type { Metadata } from "next";
import { DiscoveryHub } from "@/components/DiscoveryHub";
import { FeaturedPartnerOffers } from "@/components/FeaturedPartnerOffers";
import { NetworkOpportunityModule } from "@/components/NetworkOpportunityModule";
export const metadata: Metadata = { title: "Travel Money and Florida Trip Research", description: "A curated travel gateway for card fees, banking access, Florida trip planning, and travel-ready account research.", alternates: { canonical: "/travel" } };
export default function TravelPage() { return <DiscoveryHub path="/travel" eyebrow="Curated travel gateway" title="Travel money and Florida trip research" intro="Plan how banking access, card fees, insurance questions, connectivity, cash, and emergency funds fit into a trip. Every external resource is separated from OfferRadar research and should be verified before purchase." links={[
  { href: "/travel-fee-calculator", label: "Travel fee calculator", description: "Estimate foreign transaction, ATM, and card-related travel costs.", kind: "travel" },
  { href: "/2026-world-cup-banking-guide", label: "World Cup banking guide", description: "Plan cards, cash, ATMs, access, and mobile banking for travel.", kind: "travel" },
  { href: "/travel-card-welcome-offers", label: "Travel card offers", description: "Review existing tracked travel-card research and eligibility checks.", kind: "money" },
  { href: "/florida", label: "Florida planning hub", description: "Connect travel planning with local banking and statewide research.", kind: "florida" },
  { href: "/best-banks-for-checking", label: "Travel-ready checking", description: "Compare account access, ATM fees, mobile tools, and support.", kind: "compare" },
  { href: "/research/checking-account-fees-that-can-erase-a-signup-bonus", label: "Fee research", description: "Understand how ATM, transfer, and account fees change net value.", kind: "research" },
  { href: "/research/travel-insurance-comparison", label: "Travel insurance comparison", description: "Review coverage questions, exclusions, and provider checks before a trip.", kind: "research" },
  { href: "/research/credit-card-travel-insurance", label: "Credit card travel coverage", description: "Understand possible card benefits and the issuer terms to verify.", kind: "research" },
  { href: "/research/esim-international-travel", label: "International eSIM guide", description: "Compare compatibility, coverage, data limits, and activation timing.", kind: "travel" },
  { href: "/research/travel-money-checklist", label: "Travel money checklist", description: "Prepare card fees, ATM access, fraud controls, backup payments, insurance, and connectivity.", kind: "travel" },
  { href: "/research/world-cup-travel-finance-guide", label: "World Cup travel finance", description: "Coordinate cards, cash, fraud protection, insurance research, and connectivity.", kind: "travel" },
]}><FeaturedPartnerOffers pagePath="/travel" affiliateIds={["hellosafe-travel-insurance", "hellosafe-card-insurance-checker", "esimshop"]} title="Useful travel research tools" placementId="featured-tool" /><div className="mt-12"><NetworkOpportunityModule sourcePage="/travel" /></div></DiscoveryHub>; }
