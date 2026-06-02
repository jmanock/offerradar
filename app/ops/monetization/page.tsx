import type { Metadata } from "next";
import { readAutomationReport } from "@/lib/opsReports";

type MoneyAction = {
  provider: string;
  priority: string;
  linkStatus: string;
  action: string;
};

type MonetizationReport = {
  generatedAt?: string;
  monetizedProviderCount?: number;
  providersNeedingReferral?: { provider: string; monetizationPriority: string }[];
  providersNeedingAffiliateApproval?: { provider: string; monetizationPriority: string }[];
  top10MoneyActionItems?: MoneyAction[];
};

export const metadata: Metadata = {
  title: "OfferRadar Monetization Ops",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MonetizationOpsPage() {
  const report = readAutomationReport<MonetizationReport>(
    "latest-monetization-gaps.json",
    {},
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Internal planning dashboard
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        Monetization gaps
      </h1>
      <p className="mt-3 text-slate-600">
        Generated {report.generatedAt ?? "after running npm run intelligence:all"}.
      </p>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <ListCard
          title="Need referral"
          items={(report.providersNeedingReferral ?? []).map(
            (item) => `${item.provider} (${item.monetizationPriority})`,
          )}
        />
        <ListCard
          title="Need affiliate approval"
          items={(report.providersNeedingAffiliateApproval ?? []).map(
            (item) => `${item.provider} (${item.monetizationPriority})`,
          )}
        />
        <ListCard
          title="Top money actions"
          items={(report.top10MoneyActionItems ?? []).map(
            (item) => `${item.provider}: ${item.action}`,
          )}
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
