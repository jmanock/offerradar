import type { Metadata } from "next";
import Link from "next/link";
import {
  getHighPriorityMonetizationGaps,
  getProvidersMissingOfficialOfferUrl,
  getProvidersNeedingAffiliateApproval,
  getProvidersNeedingReferral,
  getReadyMonetizedProviders,
} from "@/lib/linkRegistry";

export const metadata: Metadata = {
  title: "OfferRadar Ops",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpsPage() {
  const referral = getProvidersNeedingReferral();
  const affiliate = getProvidersNeedingAffiliateApproval();
  const missingOfferUrls = getProvidersMissingOfficialOfferUrl();
  const priorityGaps = getHighPriorityMonetizationGaps();
  const ready = getReadyMonetizedProviders();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Internal planning dashboard
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        OfferRadar Ops
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Read-only V7 planning view for monetization, content gaps, and internal
        link priorities. This page is noindex and intentionally not linked from
        the public header or footer.
      </p>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <OpsStat label="Ready monetized" value={ready.length} />
        <OpsStat label="Need referral" value={referral.length} />
        <OpsStat label="Need affiliate approval" value={affiliate.length} />
        <OpsStat label="Missing offer URLs" value={missingOfferUrls.length} />
        <OpsStat label="High-priority gaps" value={priorityGaps.length} />
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <OpsLink href="/ops/monetization" title="Monetization gaps" />
        <OpsLink href="/ops/content-gaps" title="Content gaps" />
      </section>
    </main>
  );
}

function OpsStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="premium-card rounded-3xl p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function OpsLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="premium-card rounded-3xl p-6 transition hover:-translate-y-0.5 hover:border-blue-200"
    >
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm text-blue-700">Open dashboard</p>
    </Link>
  );
}
