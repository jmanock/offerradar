import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { getFirstPartyAnalytics } from "@/lib/firstPartyAnalytics";
import { hasOpsSession, opsConfigured } from "@/lib/opsAuth";
import { getAffiliateRevenue, summarizeAffiliateRevenue } from "@/lib/revenue";

export const metadata: Metadata = { title: "Affiliate Revenue | OfferRadar Ops", robots: { index: false, follow: false } };

export default async function RevenueOpsPage() {
  await connection();
  if (!opsConfigured() || !(await hasOpsSession())) return <main className="mx-auto max-w-4xl px-4 py-16"><Link href="/ops/changes" className="text-sm font-extrabold text-blue-700">Unlock via editorial queue</Link><h1 className="mt-4 text-4xl font-black">Revenue reporting is private</h1><p className="mt-3 text-slate-600">Configure `OPS_ACCESS_KEY` and unlock an ops session. No revenue values are inferred when an import is unavailable.</p></main>;
  const analytics = await getFirstPartyAnalytics();
  const imported = await getAffiliateRevenue();
  const revenue = summarizeAffiliateRevenue(imported.rows);
  const affiliateClicks = analytics.events.affiliate_click || 0;
  const pageViews = analytics.events.page_view || 0;
  const dimensions = Object.entries(analytics.dimensions.affiliate_click || {}).map(([key, clicks]) => { const [, advertiser = "unknown", placement = "unknown"] = key.split("|"); return { advertiser, placement, clicks }; });
  const affiliatePages = Object.entries(analytics.eventPages?.affiliate_click || {}).sort((a, b) => b[1] - a[1]);
  const metrics = [["Affiliate clicks", affiliateClicks.toLocaleString()], ["Official-source clicks", (analytics.events.official_provider_click || analytics.events.official_source_click || 0).toLocaleString()], ["Partner-tool clicks", (analytics.events.partner_tool_click || 0).toLocaleString()], ["Affiliate CTR", pageViews ? `${((affiliateClicks / pageViews) * 100).toFixed(2)}%` : "No session data"], ["Imported transactions", revenue.transactions.toLocaleString()], ["Imported revenue", imported.rows.length ? `$${revenue.revenue.toFixed(2)}` : "No import"], ["Earnings / 100 sessions", imported.rows.length && pageViews ? `$${((revenue.revenue / pageViews) * 100).toFixed(2)}` : "No import"], ["Revenue / outbound click", imported.rows.length && affiliateClicks ? `$${(revenue.revenue / affiliateClicks).toFixed(2)}` : "No import"]];
  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><Link href="/ops" className="text-sm font-extrabold text-blue-700">Ops dashboard</Link><p className="mt-5 text-xs font-extrabold uppercase tracking-wide text-teal-700">Private conversion reporting</p><h1 className="mt-3 text-4xl font-black">Affiliate clicks and manual revenue</h1><p className="mt-3 max-w-3xl text-slate-600">First-party event totals are combined with optional network CSV imports. Missing conversion values stay blank rather than being estimated.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([label, value]) => <div key={label} className="premium-card rounded-2xl p-5"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>)}</div><div className="mt-8 grid gap-6 lg:grid-cols-3"><Breakdown title="Clicks by advertiser" rows={aggregate(dimensions, "advertiser")} /><Breakdown title="Clicks by placement" rows={aggregate(dimensions, "placement")} /><Breakdown title="Clicks by page" rows={affiliatePages} /></div><p className="mt-8 text-xs text-slate-500">Analytics updated {analytics.updatedAt || "not yet recorded"}. Revenue import updated {imported.importedAt || "not yet imported"}.</p></main>;
}

function aggregate(rows: Array<{ advertiser: string; placement: string; clicks: number }>, key: "advertiser" | "placement") { const totals = new Map<string, number>(); for (const row of rows) totals.set(row[key], (totals.get(row[key]) || 0) + row.clicks); return [...totals.entries()].sort((a, b) => b[1] - a[1]); }
function Breakdown({ title, rows }: { title: string; rows: [string, number][] }) { return <section className="premium-card rounded-3xl p-6"><h2 className="text-xl font-black">{title}</h2><div className="mt-4 grid gap-2">{rows.length ? rows.slice(0, 12).map(([label, value]) => <div key={label} className="flex justify-between gap-4 rounded-xl bg-slate-50 p-3 text-sm"><span className="min-w-0 break-words">{label}</span><strong>{value}</strong></div>) : <p className="text-sm text-slate-500">No recorded data</p>}</div></section>; }
