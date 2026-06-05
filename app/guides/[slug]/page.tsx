import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { guidePages } from "@/data/guidePages";
import {
  getAllProviders,
  getCategoryBySlug,
  getOffersByCategory,
} from "@/lib/offers";
import type { CategoryInfo, OfferCategory } from "@/types/offer";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = guidePages.find((guide) => guide.slug === slug);

  if (!page) {
    return { title: "Guide not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/guides/${page.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = guidePages.find((guide) => guide.slug === slug);

  if (!page) {
    notFound();
  }

  const relatedCategorySlugs = getGuideCategorySlugs(page.slug);
  const relatedCategories = relatedCategorySlugs
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category): category is CategoryInfo => Boolean(category));
  const relatedOffers = relatedCategorySlugs
    .flatMap((categorySlug) => getOffersByCategory(categorySlug))
    .slice(0, 3);
  const relatedProviders = getAllProviders()
    .filter((provider) =>
      provider.relatedCategories.some((categorySlug) =>
        relatedCategorySlugs.includes(categorySlug),
      ),
    )
    .slice(0, 6);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          author: {
            "@type": "Organization",
            name: "OfferRadar",
          },
          publisher: {
            "@type": "Organization",
            name: "OfferRadar",
          },
          mainEntityOfPage: `https://offerradar.io/guides/${page.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
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
              name: "Guides",
              item: "https://offerradar.io/offers",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: page.title,
              item: `https://offerradar.io/guides/${page.slug}`,
            },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-3xl">
            <Link href="/offers" className="text-sm font-extrabold text-blue-700">
              Offer guides
            </Link>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{page.intro}</p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-lg font-black text-slate-950">
              Reader reminder
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Guides explain comparison concepts. They do not guarantee offer
              availability, eligibility, approval, payout, rate, or value.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <article className="premium-card rounded-3xl p-6 sm:p-8">
          <div className="grid gap-8">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-black text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
              </section>
            ))}
          </div>
        </article>
        <aside className="space-y-5">
          <section className="premium-card rounded-3xl p-5">
            <h2 className="text-lg font-black text-slate-950">
              Comparison checklist
            </h2>
            <div className="mt-4 grid gap-3">
              {page.checklist.map((item) => (
                <p key={item} className="rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </section>
          <DisclosureBlock compact />
        </aside>
      </div>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {page.faq.map((item) => (
              <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-extrabold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Related categories
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Related providers
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedProviders.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/provider/${provider.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {provider.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6 lg:col-span-2">
            <h2 className="text-2xl font-black text-slate-950">Related pages</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {page.relatedPages.map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {href
                    .replace("/", "")
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">
            Related offers
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedOffers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function getGuideCategorySlugs(slug: string): OfferCategory[] {
  const guideCategories: Record<string, OfferCategory[]> = {
    "bank-bonuses": ["bank-bonuses"],
    "direct-deposits": ["bank-bonuses", "business-banking"],
    "minimum-deposits": ["bank-bonuses", "high-yield-savings", "brokerage-bonuses"],
    "brokerage-bonuses": ["brokerage-bonuses"],
    "referral-bonuses": ["referral-offers", "cash-back-apps"],
    fees: ["bank-bonuses", "brokerage-bonuses", "credit-card-offers"],
    "offer-comparisons": ["bank-bonuses", "brokerage-bonuses", "referral-offers"],
    "offer-expiration-dates": ["bank-bonuses", "brokerage-bonuses"],
    "affiliate-disclosures": ["referral-offers", "cash-back-apps"],
  };

  return guideCategories[slug] ?? ["bank-bonuses", "brokerage-bonuses"];
}
