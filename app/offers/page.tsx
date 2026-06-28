import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { OfferCard } from "@/components/OfferCard";
import {
  featuredGuideLinks,
  popularCategoryLinks,
  popularComparisonLinks,
  priorityLandingPages,
} from "@/data/internalLinks";
import { localSeoPages } from "@/data/localSeo";
import { categories } from "@/data/offers";
import { formatDate, getOffersByCategory, getRecentlyVerifiedOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Tracked Banking and Brokerage Offers | Compare Details",
  description:
    "Compare tracked banking, brokerage, savings, referral, business, credit card, and cash back offer records with requirements and verification dates.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  const recentOffers = getRecentlyVerifiedOffers(6);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tracked banking and brokerage offers",
          description: metadata.description,
          url: "https://offerradar.io/offers",
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
              name: "Offers",
              item: "https://offerradar.io/offers",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: offersFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
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
              appear first, with requirements, fees to check, and last verified
              dates surfaced for research before visiting a provider.
            </p>
            <p className="mt-4 text-sm font-bold text-slate-500">
              Verification-first database · Source links shown when reviewed
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="premium-card mb-12 rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">
            Research paths
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/providers"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
            >
              Provider directory
            </Link>
            <Link
              href="/compare/chase-vs-sofi"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
            >
              Provider comparisons
            </Link>
            {[
              { href: "/best-bank-for-checking", label: "Best bank for checking" },
              { href: "/best-banks-for-checking", label: "Best banks for checking" },
              { href: "/best-checking-and-savings-account-offers", label: "Checking and savings offers" },
              { href: "/best-credit-unions-florida", label: "Best credit unions in Florida" },
              { href: "/2026-world-cup-banking-guide", label: "2026 World Cup banking guide" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                {link.label}
              </Link>
            ))}
            {priorityLandingPages.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                {link.label}
              </Link>
            ))}
            {localSeoPages.slice(0, 5).map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-12 grid gap-5 lg:grid-cols-3">
          <LinkPanel title="Popular Categories" links={popularCategoryLinks} />
          <LinkPanel title="Featured Guides" links={featuredGuideLinks} />
          <LinkPanel title="Popular Comparisons" links={popularComparisonLinks} />
        </section>
        <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-950">
            Recently Verified Offers
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {recentOffers.map((offer) => (
              <Link
                key={offer.slug}
                href={`/offer/${offer.slug}`}
                className="rounded-2xl bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <span className="block font-extrabold text-slate-950">
                  {offer.provider}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  {offer.title}
                </span>
                <span className="mt-2 block text-sm font-bold text-teal-700">
                  {formatDate(offer.lastVerified)}
                </span>
              </Link>
            ))}
          </div>
        </section>
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
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <VerificationMethodology />
            <DisclosureBlock />
          </div>
        </div>
        <section className="mt-12 border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-black text-slate-950">Offer comparison FAQ</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {offersFaq.map((item) => (
              <article key={item.question} className="rounded-2xl bg-white p-5">
                <h3 className="font-extrabold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const offersFaq = [
  {
    question: "How should I compare tracked offers?",
    answer:
      "Compare requirements, fees, eligibility, timing, account usefulness, verification date, and the current provider terms rather than relying only on the headline value.",
  },
  {
    question: "Does a tracked offer mean it is currently available?",
    answer:
      "No. A tracked offer is a research record. Availability and terms can change, so verify the live provider source before acting.",
  },
];

function LinkPanel({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
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
