import type { Metadata } from "next";
import Link from "next/link";
import { CategoryArtwork, type ArtworkKind } from "@/components/CategoryArtwork";
import { FeaturedPartnerOffers } from "@/components/FeaturedPartnerOffers";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Financial and Travel Research Tools | OfferRadar",
  description: "Use OfferRadar calculators and trackers, then review clearly labeled external resources for travel, markets, and family finance.",
  alternates: { canonical: "/tools" },
};

const internalTools: Array<{ href: string; title: string; description: string; kind: ArtworkKind }> = [
  { href: "/bank-bonus-calculator", title: "Bank bonus calculator", description: "Estimate net value after account fees, required balances, and time.", kind: "money" },
  { href: "/brokerage-bonus-calculator", title: "Brokerage bonus calculator", description: "Compare a transfer award with costs and holding requirements.", kind: "money" },
  { href: "/travel-fee-calculator", title: "Travel fee calculator", description: "Estimate foreign transaction and out-of-network ATM costs.", kind: "travel" },
  { href: "/banking-finder", title: "Banking finder", description: "Narrow research by location, account need, and access preferences.", kind: "compare" },
  { href: "/offer-tracker", title: "Offer tracker", description: "Scan review dates, requirements, and status across tracked records.", kind: "research" },
  { href: "/watchlist", title: "My watchlist", description: "Save research records locally in this browser for follow-up.", kind: "money" },
];

export default function ToolsPage() {
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "OfferRadar financial and travel research tools", url: "https://offerradar.io/tools", mainEntity: { "@type": "ItemList", itemListElement: internalTools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: `https://offerradar.io${tool.href}` })) } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" }, { "@type": "ListItem", position: 2, name: "Tools", item: "https://offerradar.io/tools" }] }} />
    <section className="border-b border-slate-200 bg-slate-950 text-white"><div className="radar-grid mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><p className="text-xs font-extrabold uppercase tracking-wide text-teal-300">Research directory</p><h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">Financial and travel tools, clearly labeled</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Start with OfferRadar calculators and trackers. External tools are grouped separately, may compensate OfferRadar, and never determine editorial rankings.</p><p className="mt-5 text-sm font-bold text-slate-400">Directory reviewed July 22, 2026</p></div></section>
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section><p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Built by OfferRadar</p><h2 className="mt-2 text-3xl font-black text-slate-950">OfferRadar tools</h2><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{internalTools.map((tool) => <Link key={tool.href} href={tool.href} className="premium-card rounded-3xl p-6 transition hover:-translate-y-1"><CategoryArtwork kind={tool.kind} label={tool.title} /><p className="mt-5 text-xs font-extrabold uppercase tracking-wide text-teal-700">OfferRadar tool</p><h3 className="mt-2 text-xl font-black text-slate-950">{tool.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p><span className="mt-5 inline-flex text-sm font-extrabold text-blue-700">Open tool →</span></Link>)}</div></section>
      <FeaturedPartnerOffers pagePath="/tools" affiliateIds={["hellosafe-travel-insurance", "hellosafe-card-insurance-checker", "esimshop"]} title="Travel research resources" />
      <FeaturedPartnerOffers pagePath="/tools" affiliateIds={["kitco"]} title="Market research resource" />
      <FeaturedPartnerOffers pagePath="/tools" affiliateIds={["unest-app"]} title="Family-finance resource" />
    </div>
  </main>;
}
