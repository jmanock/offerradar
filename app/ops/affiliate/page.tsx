import type { Metadata } from "next";
import Link from "next/link";
import {
  getProvidersMissingOfficialOfferUrl,
  getProvidersNeedingApproval,
  getProvidersNeedingReview,
  getProvidersWithAffiliatePrograms,
  getReadyMonetizedProviders,
} from "@/lib/linkRegistry";

export const metadata: Metadata = {
  title: "Affiliate Readiness | OfferRadar Ops",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateOpsPage() {
  const programs = getProvidersWithAffiliatePrograms();
  const needsApproval = getProvidersNeedingApproval();
  const missingOfficialUrls = getProvidersMissingOfficialOfferUrl();
  const ready = getReadyMonetizedProviders();
  const needsReview = getProvidersNeedingReview();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">
        Ops dashboard
      </Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Affiliate operations
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        Affiliate readiness
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Review provider program status, approvals, official offer URLs, and
        link readiness without exposing unapproved or empty links publicly.
      </p>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <Stat label="Programs identified" value={programs.length} />
        <Stat label="Need approval" value={needsApproval.length} />
        <Stat label="Missing official URLs" value={missingOfficialUrls.length} />
        <Stat label="Affiliate links ready" value={ready.length} />
        <Stat label="Need review" value={needsReview.length} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <ProviderList
          title="Providers with affiliate programs"
          records={programs}
          detail={(record) =>
            record.affiliateProgram || record.affiliateNetwork || "Program recorded"
          }
        />
        <ProviderList
          title="Providers needing approval"
          records={needsApproval}
          detail={(record) => record.userActionNeeded}
        />
        <ProviderList
          title="Providers missing official offer URLs"
          records={missingOfficialUrls}
          detail={(record) => record.userActionNeeded}
        />
        <ProviderList
          title="Providers with affiliate links ready"
          records={ready}
          detail={(record) => record.affiliateNetwork || "Reviewed link ready"}
        />
        <ProviderList
          title="Providers needing review"
          records={needsReview}
          detail={(record) => record.userActionNeeded}
        />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="premium-card rounded-3xl p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}

type RecordItem = ReturnType<typeof getProvidersNeedingReview>[number];

function ProviderList({
  title,
  records,
  detail,
}: {
  title: string;
  records: RecordItem[];
  detail: (record: RecordItem) => string;
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {records.length ? (
          records.map((record) => (
            <div key={record.slug} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-extrabold text-slate-950">{record.provider}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {detail(record)}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                Last reviewed {record.lastReviewed}
              </p>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            No providers currently match this status.
          </p>
        )}
      </div>
    </section>
  );
}
