import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import {
  getAllProviderComparisonPages,
  getProviderComparisonBySlug,
} from "@/data/comparisonPages";
import {
  featuredGuideLinks,
  popularComparisonLinks,
} from "@/data/internalLinks";
import {
  getCategoryBySlug,
  getOffersByProvider,
} from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProviderComparisonPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getProviderComparisonBySlug(slug);

  if (!page) {
    return { title: "Comparison not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/compare/${page.slug}` },
  };
}

export default async function ProviderComparisonPage({ params }: Props) {
  const { slug } = await params;
  const page = getProviderComparisonBySlug(slug);

  if (!page) {
    notFound();
  }

  const providerAOffers = getOffersByProvider(page.providerA.name).slice(0, 3);
  const providerBOffers = getOffersByProvider(page.providerB.name).slice(0, 3);
  const sharedCategories = page.sharedCategories
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category): category is CategoryInfo => Boolean(category));
  const relatedComparisons = popularComparisonLinks.filter(
    (comparison) => comparison.href !== `/compare/${page.slug}`,
  );

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: page.title,
          description: page.description,
          url: `https://offerradar.io/compare/${page.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [page.providerA, page.providerB].map((provider, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: provider.name,
              url: `https://offerradar.io/provider/${provider.slug}`,
            })),
          },
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
              name: "Providers",
              item: "https://offerradar.io/providers",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: page.title,
              item: `https://offerradar.io/compare/${page.slug}`,
            },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <Link href="/providers" className="text-sm font-extrabold text-blue-700">
              Provider comparisons
            </Link>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {page.providerA.name} vs {page.providerB.name} offers
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Compare tracked offer categories, common requirements, fees, and
              verification reminders for {page.providerA.name} and{" "}
              {page.providerB.name}. Provider terms control eligibility and
              availability.
            </p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Comparison focus
            </p>
            <div className="mt-4 grid gap-3">
              {page.comparisonAngles.map((angle) => (
                <p key={angle} className="rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
                  {angle}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        {[page.providerA, page.providerB].map((provider) => (
          <article key={provider.slug} className="premium-card rounded-3xl p-6">
            <Link
              href={`/provider/${provider.slug}`}
              className="text-sm font-extrabold text-blue-700"
            >
              {provider.name} provider page
            </Link>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              {provider.categoryFocus}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{provider.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {provider.commonOfferTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                >
                  {type}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">
            Shared and related categories
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {sharedCategories.length ? (
              sharedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {category.title}
                </Link>
              ))
            ) : (
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                These providers currently focus on different tracked offer
                categories. Compare requirements and fees separately before
                acting.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <OfferColumn title={`${page.providerA.name} tracked offers`} offers={providerAOffers} />
        <OfferColumn title={`${page.providerB.name} tracked offers`} offers={providerBOffers} />
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <LinkPanel title="Featured guides" links={featuredGuideLinks.slice(0, 6)} />
          <LinkPanel title="Popular comparisons" links={relatedComparisons.slice(0, 6)} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <DisclosureBlock />
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
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
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

function OfferColumn({
  title,
  offers,
}: {
  title: string;
  offers: ReturnType<typeof getOffersByProvider>;
}) {
  return (
    <section>
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-5">
        {offers.length ? (
          offers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)
        ) : (
          <p className="premium-card rounded-3xl p-6 text-slate-600">
            No live tracked offer is currently listed for this provider. Use the
            provider page and related categories for comparison context.
          </p>
        )}
      </div>
    </section>
  );
}
