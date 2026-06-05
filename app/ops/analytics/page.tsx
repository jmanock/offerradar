import type { Metadata } from "next";
import Link from "next/link";
import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID } from "@/lib/analytics";
import { getSiteStats } from "@/lib/siteStats";

const BING_VERIFICATION_CODE = "fbd66d1bed94486a87683b0b5f029153";

export const metadata: Metadata = {
  title: "Analytics Configuration | OfferRadar Ops",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsOpsPage() {
  const stats = getSiteStats();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">
        Ops dashboard
      </Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Read-only configuration
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        Analytics and search setup
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Current public tracking and verification configuration. This page does
        not call analytics, Search Console, Bing, or Clarity APIs.
      </p>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <ConfigCard label="Google Analytics" value={GA_MEASUREMENT_ID} status="Configured" />
        <ConfigCard label="Microsoft Clarity" value={CLARITY_PROJECT_ID} status="Configured" />
        <ConfigCard label="Bing verification" value={BING_VERIFICATION_CODE} status="Configured" />
        <ConfigCard label="Google Search Console" value="HTML file verification" status="Verified" />
        <ConfigCard label="Sitemap URL" value={stats.sitemapUrl} status="Public URL" href={stats.sitemapUrl} />
        <ConfigCard label="Robots URL" value={stats.robotsUrl} status="Public URL" href={stats.robotsUrl} />
      </section>

      <section className="premium-card mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">
          Installation notes
        </h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
          <p>
            GA4 and Microsoft Clarity load only in production. Clarity uses
            `next/script` with `lazyOnload` so it waits for browser idle time.
          </p>
          <p>
            Bing verification is emitted globally through the Next.js metadata
            API and the IndexNow key file is available from the site root after
            deploy.
          </p>
        </div>
      </section>
    </main>
  );
}

function ConfigCard({
  label,
  value,
  status,
  href,
}: {
  label: string;
  value: string;
  status: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {status}
        </span>
      </div>
      <p className="mt-3 break-words text-lg font-black text-slate-950">
        {value}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="premium-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200"
      >
        {body}
      </a>
    );
  }

  return <div className="premium-card rounded-3xl p-5">{body}</div>;
}
