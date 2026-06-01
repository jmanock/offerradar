import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { getOffersByCategory } from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

export function CategoryPage({ category }: { category: CategoryInfo }) {
  const offers = getOffersByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Offer category
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          {category.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {category.description}
        </p>
        <Link
          href="/offers"
          className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Browse all offers
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
            Before comparing {category.shortTitle.toLowerCase()} offers
          </h2>
          <p className="mt-4 leading-7 text-slate-600">{category.education}</p>
        </section>
        <DisclosureBlock />
      </div>
    </div>
  );
}
