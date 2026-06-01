import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { getBestOffersByCategory } from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

export function BestOfPage({
  category,
  title,
  intro,
}: {
  category: CategoryInfo;
  title: string;
  intro: string;
}) {
  const offers = getBestOffersByCategory(category.slug, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Best-of tracker
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          These are example offers ranked from local data by active status,
          featured flag, verification recency, and last checked date. This is
          for comparison and planning; provider terms control availability,
          eligibility, approval, and payout.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
            How to compare these offers
          </h2>
          <div className="mt-5 grid gap-4">
            {[
              "Compare the offer value against any fees, deposits, or required activity.",
              "Check verification status and last checked date before using the listing.",
              "Review risk notes, eligibility limits, and provider terms directly.",
              "Avoid changing account behavior solely for an offer unless the terms fit your situation.",
            ].map((item) => (
              <p key={item} className="rounded-lg bg-slate-50 p-4 text-slate-700">
                {item}
              </p>
            ))}
          </div>
          <Link
            href={`/${category.slug}`}
            className="mt-6 inline-flex rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-blue-800"
          >
            View all {category.shortTitle.toLowerCase()} offers
          </Link>
        </section>
        <DisclosureBlock />
      </div>
    </div>
  );
}
