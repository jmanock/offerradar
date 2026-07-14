import type { Metadata } from "next";
import { DiscoveryHub } from "@/components/DiscoveryHub";
export const metadata: Metadata = { title: "Florida Banking and Deal Research", description: "Explore Florida checking accounts, bank bonuses, credit unions, city banking research, and travel money tools.", alternates: { canonical: "/florida" } };
export default function FloridaPage() { return <DiscoveryHub path="/florida" eyebrow="Florida opportunities" title="Florida banking and deal research" intro="A statewide gateway to banking comparisons, local access research, and practical travel-money tools." note="OfferRadar does not currently publish verified links to separate Florida Deals Network properties in its repository. V15 therefore avoids speculative or broken outbound network links; the documented network plan identifies the checks required before launch." links={[
  { href: "/best-checking-accounts-florida", label: "Florida checking accounts", description: "Compare access, fees, bonuses, and account features.", kind: "florida" },
  { href: "/best-credit-unions-florida", label: "Florida credit unions", description: "Review membership, branch access, fees, and mobile tools.", kind: "florida" },
  { href: "/best-bank-bonuses-florida", label: "Florida bank bonuses", description: "Research offer requirements and statewide availability questions.", kind: "money" },
  { href: "/florida-bank-bonuses", label: "Tracked Florida offers", description: "Open the existing Florida offer collection without changing its URL.", kind: "money" },
  { href: "/travel", label: "Florida travel planning", description: "Use travel fee research and trip-money guides.", kind: "travel" },
  { href: "/research/credit-unions-vs-banks-in-florida", label: "Banks vs credit unions", description: "Use a requirements-first Florida comparison checklist.", kind: "research" },
]} />; }
