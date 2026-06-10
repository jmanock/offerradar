import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { getAllProviderComparisonPages } from "@/data/comparisonPages";
import {
  featuredGuideLinks,
  popularCategoryLinks,
  popularComparisonLinks,
  priorityLandingPages,
} from "@/data/internalLinks";
import { formatDate, getAllProviders, getOffersByProvider, getRecentlyVerifiedOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offer Providers",
  description:
    "Browse OfferRadar provider pages for tracked bonuses, referral offers, card offers, and verification reminders.",
  alternates: { canonical: "/providers" },
};

export default function ProvidersPage() {
  const providers = getAllProviders();
  const featuredComparisons = getAllProviderComparisonPages().slice(0, 12);
  const recentOffers = getRecentlyVerifiedOffers(6);
  const comparisonLinks = [
    ...popularComparisonLinks,
    ...featuredComparisons.slice(0, 6).map((comparison) => ({
      href: `/compare/${comparison.slug}`,
      label: comparison.title,
    })),
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.href === link.href) === index,
  );

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
          <section className="mb-8 grid gap-5 lg:grid-cols-3">
            <LinkPanel title="Popular Categories" links={popularCategoryLinks} />
            <LinkPanel title="Featured Guides" links={featuredGuideLinks} />
            <LinkPanel title="Priority Landing Pages" links={priorityLandingPages} />
          </section>
          <section className="premium-card mb-8 rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Popular Comparisons
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Compare providers by offer category fit, requirements, fees, and
              verification reminders.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {comparisonLinks.map((comparison) => (
                <Link
                  key={comparison.href}
                  href={comparison.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {comparison.label}
                </Link>
              ))}
            </div>
          </section>
          <section className="premium-card mb-8 rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Recently Verified Offers
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {recentOffers.map((offer) => (
                <Link
                  key={offer.slug}
                  href={`/offer/${offer.slug}`}
                  className="rounded-2xl bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <span className="block font-extrabold text-slate-950">
                    {offer.provider}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {offer.title}
                  </span>
                  <span className="mt-2 block text-sm font-bold text-teal-700">
                    {formatDate(offer.lastVerified)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <DisclosureBlock />
          <div className="mt-8"><VerificationMethodology /></div>
        </div>
      </div>
    </div>
  );
}

function LinkPanel({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
