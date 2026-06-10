import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { featuredGuideLinks, popularComparisonLinks } from "@/data/internalLinks";
import { formatDate, getBestOffersByCategory, getLastUpdated } from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

export function BestOfPage({
  category,
  title,
  intro,
}: {
  category: CategoryInfo;
  title: string;
  intro: string;
}) {
  const offers = getBestOffersByCategory(category.slug, 6);
  const path = getBestOfPath(category.slug);
  const lastUpdated = getLastUpdated();
  const faq = [
    {
      question: `How are ${title.toLowerCase()} organized?`,
      answer:
        "OfferRadar organizes tracked records using active status, verification recency, requirements completeness, and last reviewed dates. It does not guarantee availability or eligibility.",
    },
    {
      question: "What should I verify before opening an account?",
      answer:
        "Verify current provider terms, eligibility, required activity, fees, timing, account usefulness, and any early closure or holding-period rules.",
    },
  ];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description: intro,
          url: `https://offerradar.io/${path}`,
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
              name: title,
              item: `https://offerradar.io/${path}`,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Comparison tracker
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p>
            <p className="mt-4 text-sm font-bold text-slate-500">
              Verification-first comparison · Last verified{" "}
              {lastUpdated ? formatDate(lastUpdated) : "review in progress"}
            </p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-lg font-black text-slate-950">
              Ranking notes
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Offers are organized by active status, verification recency,
              requirements completeness, and last reviewed date. Provider
              terms control availability, eligibility, approval, and payout.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">
          Tracked offers to compare
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <section className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">
              How to compare these offers
            </h2>
            <div className="mt-5 grid gap-4">
              {[
                "Compare the offer value against fees, deposits, and required activity.",
                "Check verification status and last reviewed date before using a listing.",
                "Review risk notes, eligibility limits, and provider terms directly.",
                "Avoid changing account behavior solely for a bonus unless the terms fit your situation.",
              ].map((item) => (
                <p key={item} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                  {item}
                </p>
              ))}
            </div>
            <Link
              href={`/${category.slug}`}
              className="mt-6 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
            >
              View all {category.shortTitle.toLowerCase()} offers
            </Link>
          </section>
          <DisclosureBlock />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <LinkPanel title="Related guides" links={featuredGuideLinks.slice(0, 6)} />
        <LinkPanel title="Popular comparisons" links={popularComparisonLinks.slice(0, 6)} />
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {faq.map((item) => (
              <article key={item.question} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-extrabold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
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

function getBestOfPath(categorySlug: CategoryInfo["slug"]) {
  const paths: Partial<Record<CategoryInfo["slug"], string>> = {
    "bank-bonuses": "best-bank-bonuses",
    "brokerage-bonuses": "best-brokerage-bonuses",
    "referral-offers": "best-referral-bonuses",
  };

  return paths[categorySlug] ?? categorySlug;
}
