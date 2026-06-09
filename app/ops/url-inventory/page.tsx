import type { Metadata } from "next";
import Link from "next/link";
import {
  countInventoryBy,
  getMonetizedUrls,
  getUrlInventory,
  getUrlsNeedingReview,
} from "@/lib/urlInventory";

export const metadata: Metadata = {
  title: "URL Inventory | OfferRadar Ops",
  robots: { index: false, follow: false },
};

export default function UrlInventoryOpsPage() {
  const inventory = getUrlInventory();
  const byType = countInventoryBy("type");
  const byPriority = countInventoryBy("priority");
  const byMonetization = countInventoryBy("monetizationStatus");
  const byIndexing = countInventoryBy("indexingStatus");
  const priorityUrls = inventory.filter((item) =>
    ["critical", "high"].includes(item.priority),
  );
  const needsReview = getUrlsNeedingReview();
  const monetized = getMonetizedUrls();

  return (
    <OpsPage title="URL inventory" description="Generated route inventory for crawl, indexing, priority, and monetization planning.">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <Stat label="Total URLs" value={inventory.length} />
        <Stat label="Critical URLs" value={byPriority.critical ?? 0} />
        <Stat label="High priority" value={byPriority.high ?? 0} />
        <Stat label="Monetized URLs" value={monetized.length} />
        <Stat label="Needs review/link" value={needsReview.length} />
      </section>
      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <CountPanel title="Count by type" counts={byType} />
        <CountPanel title="Monetization status" counts={byMonetization} />
        <CountPanel title="Indexing status" counts={byIndexing} />
      </section>
      <RecordPanel title="Critical and high priority URLs" records={priorityUrls.slice(0, 30)} />
      <RecordPanel title="URLs needing review" records={needsReview.slice(0, 30)} />
    </OpsPage>
  );
}

function OpsPage({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">Ops dashboard</Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">Search operations</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{title}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="premium-card rounded-3xl p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-slate-950">{value}</p></div>;
}

function CountPanel({ title, counts }: { title: string; counts: Record<string, number> }) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-2">
        {Object.entries(counts).sort().map(([label, count]) => (
          <p key={label} className="flex justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
            <span>{label.replaceAll("_", " ")}</span><span>{count}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

function RecordPanel({ title, records }: { title: string; records: ReturnType<typeof getUrlInventory> }) {
  return (
    <section className="premium-card mt-8 rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {records.map((record) => (
          <div key={record.url} className="rounded-2xl bg-slate-50 p-4">
            <p className="break-words font-extrabold text-slate-950">{record.path}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              {record.type} · {record.priority} · {record.indexingStatus} · {record.monetizationStatus}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {record.provider ? `${record.provider} · ` : ""}
              {record.offerCount} offers · {record.internalLinkCountEstimate} estimated internal links
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
