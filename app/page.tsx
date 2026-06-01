import Link from "next/link";
import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { categories } from "@/data/offers";
import {
  formatDate,
  getActiveOfferCount,
  getBestOffersByCategory,
  getExpiringSoonOffers,
  getFeaturedOffers,
  getLastUpdated,
  getRecentlyVerifiedOffers,
} from "@/lib/offers";

export const metadata: Metadata = {
  title: "OfferRadar | Track bonuses, offers, referrals, and promotions",
  description:
    "Compare example bonuses, referral offers, brokerage promotions, savings rates, and business banking offers with verification notes and clear requirements.",
};

export default function Home() {
  const featuredOffers = getFeaturedOffers();
  const bestCurrentOffers = [
    ...getBestOffersByCategory("bank-bonuses", 2),
    ...getBestOffersByCategory("brokerage-bonuses", 2),
    ...getBestOffersByCategory("referral-offers", 2),
  ].slice(0, 6);
  const recentOffers = getRecentlyVerifiedOffers(5);
  const expiringSoonOffers = getExpiringSoonOffers(5);
  const lastUpdated = getLastUpdated();

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              OfferRadar.io
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Track bonuses, offers, referrals, and promotions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Updated daily, organized clearly, and built to help users compare
              requirements before signing up. Every listing is framed as an
              example offer with reminders to verify directly with the provider.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/offers"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
              >
                Browse Offers
              </Link>
              <Link
                href="/bank-bonuses"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                View Bank Bonuses
              </Link>
            </div>
          </div>
          <div className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <Stat label="Active offers" value={String(getActiveOfferCount())} />
            <Stat label="Categories tracked" value={String(categories.length)} />
            <Stat
              label="Last updated"
              value={lastUpdated ? formatDate(lastUpdated) : "Reviewing"}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Best current offers
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Active example offers surfaced by category, featured status, and
              verification recency. Verify live terms before acting.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-blue-700">
            <Link href="/best-bank-bonuses">Bank bonuses</Link>
            <Link href="/best-brokerage-bonuses">Brokerage</Link>
            <Link href="/best-referral-bonuses">Referrals</Link>
            <Link href="/providers">Providers</Link>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bestCurrentOffers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Featured offers
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Selected active example offers with clear requirements and last
                checked dates.
              </p>
            </div>
            <Link
              href="/offers"
              className="text-sm font-semibold text-blue-700"
            >
              View all offers
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredOffers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Expiring soon
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Example offers with listed expiration dates in the next 45 days.
              Providers may end or update terms earlier.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {expiringSoonOffers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Recently verified
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These listings were most recently checked in the local V2 data.
              Dates are a starting point for comparison, not a guarantee that
              terms remain available.
            </p>
          </div>
          <div className="grid gap-3">
            {recentOffers.map((offer) => (
              <Link
                key={offer.slug}
                href={`/offer/${offer.slug}`}
                className="flex flex-col justify-between gap-2 rounded-lg border border-slate-200 p-4 hover:border-blue-200 sm:flex-row sm:items-center"
              >
                <span>
                  <span className="block font-semibold text-slate-950">
                    {offer.provider}
                  </span>
                  <span className="text-sm text-slate-600">{offer.title}</span>
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {formatDate(offer.lastVerified)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-950">Categories</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Programmatic guides
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                SEO-ready comparison pages for common offer searches and state
                bank bonus research.
              </p>
            </div>
            <Link href="/providers" className="text-sm font-semibold text-blue-700">
              Browse providers
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/checking-account-bonuses", "Checking bonuses"],
              ["/direct-deposit-bonuses", "Direct deposit bonuses"],
              ["/credit-card-welcome-offers", "Card welcome offers"],
              ["/national-bank-bonuses", "National bank bonuses"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-900 hover:border-blue-200 hover:text-blue-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
            How OfferRadar works
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Track offers",
              "Verify details",
              "Compare requirements",
              "Follow source/referral links",
            ].map((item, index) => (
              <div key={item} className="rounded-lg bg-slate-50 p-4">
                <span className="text-sm font-bold text-emerald-700">
                  {index + 1}
                </span>
                <p className="mt-2 font-semibold text-slate-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <DisclosureBlock />
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Future daily tracking
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              V2 keeps the site static while preparing the data shape for later
              automation. Future checks can compare source pages, detect
              changes, update local data, and produce daily reports before
              deployment review.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Manual seed now", "Automation-ready fields", "Daily reports later"].map(
              (item) => (
                <div key={item} className="rounded-lg bg-slate-50 p-4">
                  <p className="font-semibold text-slate-950">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
