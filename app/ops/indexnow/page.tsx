import type { Metadata } from "next";
import Link from "next/link";
import indexNowReportJson from "@/automation/reports/latest-indexnow-report.json";

const KEY = "fbd66d1bed94486a87683b0b5f029153";
const KEY_URL = `https://offerradar.io/${KEY}.txt`;

type IndexNowReport = {
  generatedAt: string;
  urlCount: number;
  source: string;
  filters: { priorities: string[]; types: string[]; changedOnly: boolean };
  urls: string[];
};

export const metadata: Metadata = {
  title: "IndexNow | OfferRadar Ops",
  robots: { index: false, follow: false },
};

export default function IndexNowOpsPage() {
  const report = indexNowReportJson as IndexNowReport;
  const keyPresent = true;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">Ops dashboard</Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">Index notification planning</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">IndexNow operations</h1>
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <Stat label="Key file status" value={keyPresent ? "Present" : "Missing"} />
        <Stat label="Latest dry-run URLs" value={String(report.urlCount)} />
        <Stat label="Changed-only filter" value={report.filters.changedOnly ? "Enabled" : "Disabled"} />
      </section>
      <section className="premium-card mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">Key and latest dry run</h2>
        <div className="mt-4 grid gap-3 text-sm font-bold text-slate-700">
          <p className="break-words rounded-2xl bg-slate-50 p-4">Key URL: {KEY_URL}</p>
          <p className="break-words rounded-2xl bg-slate-50 p-4">Generated: {report.generatedAt}</p>
          <p className="break-words rounded-2xl bg-slate-50 p-4">Source: {report.source}</p>
        </div>
      </section>
      <section className="premium-card mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">Safe submit workflow</h2>
        <ol className="mt-4 grid gap-3 text-sm font-bold text-slate-700">
          <li className="rounded-2xl bg-slate-50 p-4">1. Run `npm run url:inventory` after reviewed content changes.</li>
          <li className="rounded-2xl bg-slate-50 p-4">2. Run `npm run indexnow:dry` or `npm run indexnow:changed` and review the generated report.</li>
          <li className="rounded-2xl bg-slate-50 p-4">3. Submit only after a production deploy, and avoid repeated submissions for unchanged URLs.</li>
        </ol>
      </section>
      <section className="premium-card mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">Latest selected URLs</h2>
        <div className="mt-4 grid gap-2">
          {report.urls.slice(0, 30).map((url) => <p key={url} className="break-words rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{url}</p>)}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="premium-card rounded-3xl p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>;
}
