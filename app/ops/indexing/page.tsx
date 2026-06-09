import type { Metadata } from "next";
import Link from "next/link";
import {
  countInventoryBy,
  getUrlInventory,
  getUrlsNeedingInternalLinks,
  getUrlsPendingSubmission,
} from "@/lib/urlInventory";

export const metadata: Metadata = {
  title: "Indexing | OfferRadar Ops",
  robots: { index: false, follow: false },
};

export default function IndexingOpsPage() {
  const inventory = getUrlInventory();
  const indexingCounts = countInventoryBy("indexingStatus");
  const sourceCounts = inventory.reduce<Record<string, number>>((counts, item) => {
    counts[item.source] = (counts[item.source] ?? 0) + 1;
    return counts;
  }, {});
  const notReviewed = inventory.filter((item) => item.indexingStatus === "unknown");
  const pendingSubmission = getUrlsPendingSubmission();
  const needsInternalLinks = getUrlsNeedingInternalLinks();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">Ops dashboard</Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">Indexing operations</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Indexing dashboard</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Review-first indexing status, submission priorities, internal-link gaps, and sitemap inventory statistics.
      </p>
      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Not yet reviewed" value={notReviewed.length} />
        <Stat label="Pending submission" value={pendingSubmission.length} />
        <Stat label="Need internal links" value={needsInternalLinks.length} />
        <Stat label="Sitemap/public URLs" value={inventory.length} />
      </section>
      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <CountPanel title="Indexing status" counts={indexingCounts} />
        <CountPanel title="Inventory source" counts={sourceCounts} />
      </section>
      <UrlPanel title="Priority URLs pending submission" urls={pendingSubmission.slice(0, 30)} />
      <UrlPanel title="URLs needing internal links" urls={needsInternalLinks.slice(0, 30)} />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/ops/indexnow" className="rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800">
          Review IndexNow dry run
        </Link>
        <Link href="/ops/url-inventory" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800">
          Open URL inventory
        </Link>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="premium-card rounded-3xl p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-slate-950">{value}</p></div>;
}

function CountPanel({ title, counts }: { title: string; counts: Record<string, number> }) {
  return <section className="premium-card rounded-3xl p-6"><h2 className="text-xl font-black text-slate-950">{title}</h2><div className="mt-4 grid gap-2">{Object.entries(counts).sort().map(([label, count]) => <p key={label} className="flex justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700"><span>{label.replaceAll("_", " ")}</span><span>{count}</span></p>)}</div></section>;
}

function UrlPanel({ title, urls }: { title: string; urls: ReturnType<typeof getUrlInventory> }) {
  return <section className="premium-card mt-8 rounded-3xl p-6"><h2 className="text-2xl font-black text-slate-950">{title}</h2><div className="mt-4 grid gap-2">{urls.map((item) => <p key={item.url} className="break-words rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{item.path} · {item.priority} · {item.internalLinkCountEstimate} links</p>)}</div></section>;
}
