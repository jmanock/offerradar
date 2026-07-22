"use client";

import { useMemo, useState } from "react";
import { linkRegistry } from "@/data/linkRegistry";
import type { CategoryInfo, Offer } from "@/types/offer";
import { OfferCard } from "@/components/OfferCard";

type SourceFilter = "all" | "recent" | "official" | "affiliate" | "research";

export function OfferHubExplorer({ offers, categories }: { offers: Offer[]; categories: CategoryInfo[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");
  const [source, setSource] = useState<SourceFilter>("all");
  const states = useMemo(() => Array.from(new Set(offers.flatMap((offer) => offer.stateRestrictions || []))).sort(), [offers]);
  const records = useMemo(() => new Map(linkRegistry.map((record) => [record.provider.toLowerCase(), record])), []);
  const newestReview = Math.max(...offers.map((offer) => new Date(`${offer.lastVerified}T00:00:00Z`).getTime()));
  const recentCutoff = new Date(newestReview - 30 * 24 * 60 * 60 * 1000);

  const visible = offers.filter((offer) => {
    const registry = records.get(offer.provider.toLowerCase());
    const sourceKind = registry?.monetizationStatus === "ready" && Boolean(registry.affiliateUrl || registry.referralUrl) ? "affiliate" : registry?.officialOfferUrl || offer.sourceUrl ? "official" : "research";
    const recent = new Date(`${offer.lastVerified}T00:00:00Z`) >= recentCutoff;
    const text = `${offer.provider} ${offer.title} ${offer.description}`.toLowerCase();
    return (!search || text.includes(search.toLowerCase())) && (category === "all" || offer.category === category) && (state === "all" || offer.stateRestrictions?.includes(state)) && (source === "all" || (source === "recent" ? recent : sourceKind === source));
  });

  return <section aria-labelledby="offer-explorer-title">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Filter the database</p><h2 id="offer-explorer-title" className="mt-2 text-3xl font-black text-slate-950">Compare tracked records</h2></div><p className="max-w-xl text-sm leading-6 text-slate-600">Filters do not change editorial ordering. Affiliate compensation never determines placement.</p></div>
    <div className="mt-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
      <label className="grid gap-2 text-sm font-bold text-slate-700">Search<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Provider or offer" className="min-h-11 rounded-xl border border-slate-300 px-3 font-medium outline-none focus:border-blue-600" /></label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-11 rounded-xl border border-slate-300 px-3 font-medium"><option value="all">All categories</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.shortTitle}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">State availability<select value={state} onChange={(event) => setState(event.target.value)} className="min-h-11 rounded-xl border border-slate-300 px-3 font-medium"><option value="all">All listed areas</option>{states.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">Source status<select value={source} onChange={(event) => setSource(event.target.value as SourceFilter)} className="min-h-11 rounded-xl border border-slate-300 px-3 font-medium"><option value="all">All source types</option><option value="recent">Recently verified</option><option value="official">Official source</option><option value="affiliate">Affiliate-supported</option><option value="research">Research record</option></select></label>
    </div>
    <p className="mt-4 text-sm font-bold text-slate-500" aria-live="polite">{visible.length} tracked {visible.length === 1 ? "record" : "records"}</p>
    <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((offer) => { const registry = records.get(offer.provider.toLowerCase()); const affiliate = registry?.monetizationStatus === "ready" && Boolean(registry.affiliateUrl || registry.referralUrl); const official = Boolean(registry?.officialOfferUrl || offer.sourceUrl); return <div key={offer.slug} className="relative"><span className={`absolute right-5 top-16 z-10 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${affiliate ? "bg-violet-100 text-violet-800" : official ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"}`}>{affiliate ? "Affiliate partner" : official ? "Official source" : "Research record"}</span><OfferCard offer={offer} /></div>; })}</div>
    {!visible.length ? <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">No tracked records match these filters. Try a broader category or source status.</p> : null}
  </section>;
}
