import Link from "next/link";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { getAllOfferTypePages, getOffersByCategory } from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

export function CategoryPage({ category }: { category: CategoryInfo }) {
  const offers = getOffersByCategory(category.slug);
  const relatedOfferTypePages = getAllOfferTypePages().filter((page) =>
    page.relatedCategories.includes(category.slug),
  );

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.title,
          description: category.description,
          url: `https://offerradar.io/${category.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://offerradar.io",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: category.title,
              item: `https://offerradar.io/${category.slug}`,
            },
          ],
        }}
      />
      <AnalyticsEvent
        name="category_page_view"
        params={{
          category: category.slug,
          category_title: category.title,
          offer_count: offers.length,
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Offer category
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {category.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {category.description}
            </p>
            <Link
              href="/offers"
              className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800"
            >
              Browse all offers
            </Link>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-lg font-black text-slate-950">
              Compare checklist
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                "Offer value and payout timing",
                "Required deposits, spend, or transfers",
                "Monthly fees and waiver rules",
                "Verification date and provider terms",
              ].map((item) => (
                <p key={item} className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="premium-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">
            How to think about {category.shortTitle.toLowerCase()} offers
          </h2>
          <p className="mt-4 leading-7 text-slate-600">{category.education}</p>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">Tracked offers</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      {relatedOfferTypePages.length ? (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-slate-950">
              Related offer guides
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedOfferTypePages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <DisclosureBlock />
      </div>
    </div>
  );
}
