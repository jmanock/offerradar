import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import {
  getAllOfferTypePages,
  getAllStatePages,
  getCategoryBySlug,
  getOfferTypePageBySlug,
  getOffersForOfferTypePage,
  getOffersForStatePage,
  getStatePageBySlug,
} from "@/lib/offers";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...getAllOfferTypePages().map((page) => ({ slug: page.slug })),
    ...getAllStatePages().map((page) => ({ slug: page.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offerTypePage = getOfferTypePageBySlug(slug);
  const statePage = getStatePageBySlug(slug);

  if (offerTypePage) {
    return {
      title: offerTypePage.title,
      description: offerTypePage.description,
      alternates: { canonical: `/${offerTypePage.slug}` },
    };
  }

  if (statePage) {
    return {
      title: statePage.title,
      description: statePage.description,
      alternates: { canonical: `/${statePage.slug}` },
    };
  }

  return { title: "Page not found" };
}

export default async function ProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const offerTypePage = getOfferTypePageBySlug(slug);
  const statePage = getStatePageBySlug(slug);

  if (offerTypePage) {
    const offers = getOffersForOfferTypePage(offerTypePage.slug);

    return (
      <ProgrammaticLayout
        eyebrow="Offer type"
        h1={offerTypePage.h1}
        intro={offerTypePage.intro}
        offers={offers}
        tipsTitle="How to compare"
        tips={offerTypePage.comparisonTips}
        faq={offerTypePage.faq}
        relatedLinks={offerTypePage.relatedCategories.map((categorySlug) => {
          const category = getCategoryBySlug(categorySlug);
          return {
            href: `/${categorySlug}`,
            label: category?.title ?? categorySlug,
          };
        })}
      />
    );
  }

  if (statePage) {
    const offers = getOffersForStatePage(statePage.slug);

    return (
      <ProgrammaticLayout
        eyebrow="State guide"
        h1={statePage.h1}
        intro={statePage.intro}
        offers={offers}
        tipsTitle={`How to compare offers in ${statePage.stateName}`}
        tips={statePage.cautions}
        faq={statePage.faq}
        relatedLinks={statePage.relatedPages.map((href) => ({
          href,
          label: href
            .replace("/", "")
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }))}
      />
    );
  }

  notFound();
}

function ProgrammaticLayout({
  eyebrow,
  h1,
  intro,
  offers,
  tipsTitle,
  tips,
  faq,
  relatedLinks,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  offers: ReturnType<typeof getOffersForOfferTypePage>;
  tipsTitle: string;
  tips: string[];
  faq: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          {h1}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Listings are examples for comparison. Terms may change, and users
          should verify availability, fees, eligibility, and payout timing
          directly with the provider.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-950">Matching offers</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">{tipsTitle}</h2>
          <div className="mt-5 grid gap-3">
            {tips.map((tip) => (
              <p key={tip} className="rounded-lg bg-slate-50 p-4 text-slate-700">
                {tip}
              </p>
            ))}
          </div>
        </section>
        <DisclosureBlock />
      </div>

      <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-950">FAQ</h2>
        <div className="mt-5 grid gap-5">
          {faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-semibold text-slate-950">{item.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-950">Related pages</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-blue-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
