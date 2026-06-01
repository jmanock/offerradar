import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { getAllProviderComparisonPages } from "@/data/comparisonPages";
import { getAllProviders, getOffersByProvider } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offer Providers",
  description:
    "Browse OfferRadar provider pages for tracked bonuses, referral offers, card offers, and verification reminders.",
  alternates: { canonical: "/providers" },
};

export default function ProvidersPage() {
  const providers = getAllProviders();
  const featuredComparisons = getAllProviderComparisonPages().slice(0, 12);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Provider directory
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Providers tracked by OfferRadar
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Provider pages group related offers with common offer types,
              verification reminders, and category links. Always verify current
              terms directly with the provider.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {providers.map((provider) => (
            <Link
              key={provider.slug}
              href={`/provider/${provider.slug}`}
              className="premium-card rounded-3xl p-6 transition hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    {provider.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {provider.categoryFocus}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {getOffersByProvider(provider.name).length} offers
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {provider.description}
              </p>
              <p className="mt-5 text-sm font-bold text-blue-700">
                View provider record
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <section className="premium-card mb-8 rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Provider comparisons
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Compare providers by offer category fit, requirements, fees, and
              verification reminders.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {featuredComparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {comparison.title}
                </Link>
              ))}
            </div>
          </section>
          <DisclosureBlock />
        </div>
      </div>
    </div>
  );
}
