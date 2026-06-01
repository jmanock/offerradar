import type { Metadata } from "next";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { categories } from "@/data/offers";
import { getOffersByCategory } from "@/lib/offers";

export const metadata: Metadata = {
  title: "All Offers",
  description:
    "Browse all OfferRadar example offers grouped by category, with status, requirements, last checked dates, and disclosure reminders.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          All offers
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Browse local listings grouped by category. Featured and active
          offers appear first inside each group, and every listing should be
          verified directly with the provider before applying.
        </p>
      </div>

      <div className="mt-10 grid gap-12">
        {categories.map((category) => {
          const offers = getOffersByCategory(category.slug);

          return (
            <section key={category.slug}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">
                    {category.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {offers.map((offer) => (
                  <OfferCard key={offer.slug} offer={offer} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12">
        <DisclosureBlock />
      </div>
    </div>
  );
}
