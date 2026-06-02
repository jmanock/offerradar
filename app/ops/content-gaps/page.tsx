import type { Metadata } from "next";
import { readAutomationReport } from "@/lib/opsReports";

type ContentReport = {
  generatedAt?: string;
  providersInRegistryWithNoOffer?: { provider: string; monetizationPriority: string }[];
  providersWithProviderPageButWeakOfferCoverage?: {
    provider: string;
    offerCount: number;
    action: string;
  }[];
  top10ContentActions?: string[];
};

export const metadata: Metadata = {
  title: "OfferRadar Content Gap Ops",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentGapOpsPage() {
  const report = readAutomationReport<ContentReport>(
    "latest-content-gaps.json",
    {},
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Internal planning dashboard
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        Content gaps
      </h1>
      <p className="mt-3 text-slate-600">
        Generated {report.generatedAt ?? "after running npm run intelligence:all"}.
      </p>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <ListCard
          title="Registry providers with no offer"
          items={(report.providersInRegistryWithNoOffer ?? []).map(
            (item) => `${item.provider} (${item.monetizationPriority})`,
          )}
        />
        <ListCard
          title="Weak provider offer coverage"
          items={(report.providersWithProviderPageButWeakOfferCoverage ?? []).map(
            (item) => `${item.provider}: ${item.offerCount} offer(s). ${item.action}`,
          )}
        />
        <ListCard
          title="Top content actions"
          items={report.top10ContentActions ?? []}
        />
      </section>
    </main>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.length ? (
          items.slice(0, 10).map((item) => (
            <p key={item} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              {item}
            </p>
          ))
        ) : (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            Run npm run intelligence:all to generate this report.
          </p>
        )}
      </div>
    </section>
  );
}
