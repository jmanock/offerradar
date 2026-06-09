import type { Metadata } from "next";
import Link from "next/link";
import searchSummaryJson from "@/automation/reports/latest-search-console-summary.json";

type SearchRow = {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type SearchSummary = {
  sourceFile: string;
  rowCount: number;
  totals: { clicks: number; impressions: number; averagePosition: number };
  topPages: SearchRow[];
  topQueries: SearchRow[];
  topUrlsByImpressions: SearchRow[];
  highImpressionsLowCtr: SearchRow[];
  averagePosition8To20: SearchRow[];
  zeroClicksWithImpressions: SearchRow[];
};

export const metadata: Metadata = {
  title: "Search Console | OfferRadar Ops",
  robots: { index: false, follow: false },
};

export default function SearchConsoleOpsPage() {
  const summary = searchSummaryJson as SearchSummary;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">Ops dashboard</Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">Manual Search Console import</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Search Console summary</h1>
      <p className="mt-3 max-w-3xl text-slate-600">Read-only summary from a manually downloaded CSV. No Google API credentials or live calls are used.</p>
      <section className="mt-8 grid gap-5 md:grid-cols-4">
        <Stat label="Imported clicks" value={summary.totals.clicks} />
        <Stat label="Imported impressions" value={summary.totals.impressions} />
        <Stat label="Average position" value={summary.totals.averagePosition} />
        <Stat label="Imported rows" value={summary.rowCount} />
      </section>
      <p className="premium-card mt-8 rounded-3xl p-5 text-sm font-bold text-slate-700">Source: {summary.sourceFile}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Rows title="Top pages" rows={summary.topPages} />
        <Rows title="Top queries" rows={summary.topQueries} />
        <Rows title="High impressions, low CTR" rows={summary.highImpressionsLowCtr} />
        <Rows title="Average position 8-20" rows={summary.averagePosition8To20} />
        <Rows title="Zero clicks with impressions" rows={summary.zeroClicksWithImpressions} />
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="premium-card rounded-3xl p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-slate-950">{value.toLocaleString()}</p></div>;
}

function Rows({ title, rows }: { title: string; rows: SearchRow[] }) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {rows.length ? rows.map((row, index) => (
          <div key={`${row.page}-${row.query}-${index}`} className="rounded-2xl bg-slate-50 p-4">
            <p className="break-words font-extrabold text-slate-950">{row.page || row.query}</p>
            <p className="mt-2 text-sm text-slate-600">{row.impressions.toLocaleString()} impressions · {row.clicks.toLocaleString()} clicks · {(row.ctr * 100).toFixed(2)}% CTR · position {row.position.toFixed(1)}</p>
          </div>
        )) : <p className="text-sm text-slate-600">No matching rows in the latest import.</p>}
      </div>
    </section>
  );
}
