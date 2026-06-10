import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { getComparisonsForProvider } from "@/data/comparisonPages";
import { featuredGuideLinks } from "@/data/internalLinks";
import {
  getLinkRegistryRecordByProvider,
  getPublicLinkForProvider,
} from "@/lib/linkRegistry";
import {
  getAllProviders,
  getCategoryBySlug,
  getOffersByProvider,
  getProviderBySlug,
} from "@/lib/offers";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProviders().map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    return { title: "Provider not found" };
  }

  return {
    title: `${provider.name} Offers`,
    description: `${provider.description} Compare tracked offers and verify current terms directly with ${provider.name}.`,
    alternates: { canonical: `/provider/${provider.slug}` },
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const offers = getOffersByProvider(provider.name);
  const comparisons = getComparisonsForProvider(provider.slug, 8);
  const publicLink = getPublicLinkForProvider(provider.name);
  const registryRecord = getLinkRegistryRecordByProvider(provider.name);
  const relatedProviders = getAllProviders()
    .filter(
      (candidate) =>
        candidate.slug !== provider.slug &&
        candidate.relatedCategories.some((category) =>
          provider.relatedCategories.includes(category),
        ),
    )
    .slice(0, 6);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${provider.name} offers`,
          description: provider.description,
          url: `https://offerradar.io/provider/${provider.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: offers.slice(0, 10).map((offer, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: offer.title,
              url: `https://offerradar.io/offer/${offer.slug}`,
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
              name: provider.name,
              item: `https://offerradar.io/provider/${provider.slug}`,
            },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <Link href="/providers" className="text-sm font-extrabold text-blue-700">
              Providers
            </Link>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {provider.name} offers
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {provider.description} Use this page to compare requirements and
              verification status, then confirm current terms directly with{" "}
              {provider.name}.
            </p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Provider focus
            </p>
            <p className="mt-3 text-2xl font-black text-slate-950">
              {provider.categoryFocus}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {provider.disclosureNote}
            </p>
            <div className="mt-5 grid gap-3">
              {registryRecord ? (
                <dl className="grid gap-3 border-b border-slate-200 pb-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-semibold text-slate-500">Last verified</dt>
                    <dd className="font-extrabold text-slate-900">
                      {registryRecord.lastReviewed}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-semibold text-slate-500">Verification status</dt>
                    <dd className="font-extrabold text-slate-900">
                      {registryRecord.officialOfferUrl
                        ? "Official offer URL recorded"
                        : "Official website recorded"}
                    </dd>
                  </div>
                </dl>
              ) : null}
              {publicLink ? (
                <>
                  <TrackedOutboundLink
                    href={publicLink.href}
                    target="_blank"
                    rel="noreferrer"
                    eventParams={{
                      provider: provider.name,
                      link_type: publicLink.linkType,
                    }}
                    className="inline-flex w-full justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
                  >
                    {publicLink.label}
                  </TrackedOutboundLink>
                  <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                    {publicLink.sourceLabel}
                  </p>
                </>
              ) : (
                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                  Provider terms should be verified directly before acting.
                </p>
              )}
              {registryRecord?.officialWebsiteUrl &&
              registryRecord.officialWebsiteUrl !== publicLink?.href ? (
                <TrackedOutboundLink
                  href={registryRecord.officialWebsiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventParams={{
                    provider: provider.name,
                    link_type: "official_website",
                  }}
                  className="inline-flex w-full justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  Visit official website
                </TrackedOutboundLink>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <section className="premium-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">
            Common offer types
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {provider.commonOfferTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
              >
                {type}
              </span>
            ))}
          </div>
        </section>
        <section className="premium-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">
            Things to verify
          </h2>
          <ul className="mt-4 grid gap-3">
            {provider.thingsToVerify.map((item) => (
              <li key={item} className="rounded-lg bg-slate-50 p-3 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {registryRecord ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="premium-card grid gap-6 rounded-3xl p-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Verification notes
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Source review
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Official website reviewed on {registryRecord.lastReviewed}.{" "}
                {registryRecord.officialOfferUrl
                  ? "A direct official offer source is recorded for comparison."
                  : "No direct official offer source is currently recorded. Verify current promotions on the provider's official website."}
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Editorial disclosure
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                How this provider page works
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                OfferRadar independently organizes provider and offer details
                for research and comparison. Source links are included when
                available, but provider terms control eligibility, approval,
                and offer availability.
              </p>
              <Link
                href="/editorial-policy"
                className="mt-4 inline-flex font-extrabold text-blue-700 hover:text-blue-800"
              >
                Read the editorial policy
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Related offers
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {provider.name} offer tracker
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Related categories
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {provider.relatedCategories.map((categorySlug) => {
                const category = getCategoryBySlug(categorySlug);

                return category ? (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                  >
                    {category.title}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
          <DisclosureBlock compact />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Related providers
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedProviders.map((relatedProvider) => (
                <Link
                  key={relatedProvider.slug}
                  href={`/provider/${relatedProvider.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {relatedProvider.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Related guides
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {featuredGuideLinks.slice(0, 5).map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6 lg:col-span-2">
            <h2 className="text-2xl font-black text-slate-950">
              Related comparisons
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {comparison.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
