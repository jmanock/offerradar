import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/offers";
import { getSiteStats } from "@/lib/siteStats";

export const metadata: Metadata = {
  title: "SEO Health | OfferRadar Ops",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeoOpsPage() {
  const stats = getSiteStats();
  const canonicalExamples = [
    "https://offerradar.io",
    "https://offerradar.io/offers",
    "https://offerradar.io/provider/chase",
    "https://offerradar.io/compare/chase-vs-sofi",
    "https://offerradar.io/guides/bank-bonuses",
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/ops" className="text-sm font-extrabold text-blue-700">
        Ops dashboard
      </Link>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Search health snapshot
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        SEO health dashboard
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Static counts, crawl endpoints, canonical examples, and structured data
        coverage from local OfferRadar data.
      </p>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SeoStat label="Estimated pages" value={stats.estimatedPublicPageCount} />
        <SeoStat label="Providers" value={stats.providerCount} />
        <SeoStat label="Offers" value={stats.offerCount} />
        <SeoStat label="Comparisons" value={stats.comparisonCount} />
        <SeoStat label="Guides" value={stats.guideCount} />
        <SeoStat label="State pages" value={stats.statePageCount} />
        <SeoStat label="Local SEO pages" value={stats.localSeoPageCount} />
        <SeoStat label="Offer type pages" value={stats.offerTypePageCount} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <InfoPanel
          title="Crawl endpoints"
          items={[stats.sitemapUrl, stats.robotsUrl]}
        />
        <InfoPanel title="Canonical examples" items={canonicalExamples} />
      </section>

      <section className="premium-card mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">
          Structured data status
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Organization schema in root layout",
            "WebSite schema in root layout",
            "Breadcrumb schema on category, guide, provider, and comparison pages",
            "FAQ schema on guide and local SEO pages",
            "CollectionPage schema on category, best-of, and comparison pages",
            "Article schema on guide pages",
            "Service schema on local SEO pages",
            "No review or rating schema without real reviews",
          ].map((item) => (
            <p key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="premium-card mt-8 rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">
          Category coverage
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function SeoStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="premium-card rounded-3xl p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className="break-words rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
