import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
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
    description: `${provider.description} Compare example offers and verify current terms directly with ${provider.name}.`,
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <Link href="/providers" className="text-sm font-semibold text-blue-700">
            Providers
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            {provider.name} offers
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {provider.description} This page uses local example data for
            comparison and does not guarantee availability, approval, eligibility,
            or payout.
          </p>
        </div>
        <DisclosureBlock compact />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
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
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
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

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-950">
          Related {provider.name} offers
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-950">
          Related categories
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {provider.relatedCategories.map((categorySlug) => {
            const category = getCategoryBySlug(categorySlug);

            return category ? (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                {category.title}
              </Link>
            ) : null;
          })}
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-600">
          {provider.disclosureNote}
        </p>
      </section>
    </div>
  );
}
