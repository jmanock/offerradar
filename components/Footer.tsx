import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

const groups = [
  { title: "Explore", links: [["All offers", "/offers"], ["Money", "/money"], ["Travel", "/travel"], ["Tools", "/tools"], ["Florida", "/florida"], ["Recently changed", "/recently-changed-offers"]] },
  { title: "Track & compare", links: [["Offer tracker", "/offer-tracker"], ["My watchlist", "/watchlist"], ["Email alerts", "/alerts"], ["Offer history", "/offer-history"], ["Compare providers", "/compare"]] },
  { title: "Research", links: [["Research library", "/research"], ["Bank bonuses", "/bank-bonuses"], ["Brokerage bonuses", "/brokerage-bonuses"], ["Methodology", "/research/how-offerradar-tracks-and-verifies-offers"], ["Weekly radar", "/weekly-offer-radar"]] },
  { title: "Trust & policies", links: [["About", "/about"], ["Disclosures", "/disclosures"], ["Editorial policy", "/editorial-policy"], ["Privacy", "/privacy-policy"], ["Contact", "/contact"]] },
];

export function Footer() {
  return <footer className="border-t border-slate-800 bg-[#07111f] text-slate-300"><div className="radar-grid mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]"><div><div className="[&_span_span:first-child]:text-white"><BrandLogo /></div><p className="mt-4 max-w-sm text-sm leading-6">A consumer-first offer intelligence platform for discovery, comparison, local tracking, and requirements-first research.</p><p className="mt-4 text-xs leading-5 text-slate-400">Text provider badges are identification aids, not evidence of endorsement. Verify live terms directly.</p></div>{groups.map((group) => <div key={group.title}><p className="font-bold text-white">{group.title}</p><div className="mt-3 grid gap-2 text-sm">{group.links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-white">{label}</Link>)}</div></div>)}</div><div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">© {new Date().getUTCFullYear()} OfferRadar · Educational research, not financial, tax, or legal advice.</div></div></footer>;
}
