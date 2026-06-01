import type { Metadata } from "next";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { categories } from "@/data/offers";
import { getOffersByCategory } from "@/lib/offers";

export const metadata: Metadata = {
  title: "All Offers",
  description:
    "Browse OfferRadar promotions grouped by category, with status, requirements, last reviewed dates, and disclosure reminders.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Offer database
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              All tracked offers
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Browse promotions grouped by category. Featured and active offers
              appear first, with verification dates and requirements surfaced
              for comparison.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-14">
          {categories.map((category) => {
            const offers = getOffersByCategory(category.slug);

            return (
              <section key={category.slug}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                      {category.shortTitle}
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">
                      {category.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}
