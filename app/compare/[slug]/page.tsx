import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { HowOfferRadarWorks } from "@/components/HowOfferRadarWorks";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { VerificationMethodology } from "@/components/VerificationMethodology";
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
  formatDate,
  getLastUpdated,
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
  const lastVerified = getLastUpdated();
  const comparisonFaq = [
    {
      question: `How should I compare ${page.providerA.name} and ${page.providerB.name}?`,
      answer:
        "Compare account types, fees, access, mobile tools, requirements, verification dates, and current provider terms. OfferRadar organizes research records and does not recommend one provider for every user.",
    },
    {
      question: "Should I choose a provider only because of a promotion?",
      answer:
        "No. A promotion can be one comparison point, but account fit, ongoing fees, access, service, and provider terms may matter more over time.",
    },
    {
      question: "What fees should I verify?",
      answer:
        "Verify monthly fees, fee waiver rules, transfer fees, ATM fees, annual fees where relevant, advisory or subscription fees, and any early closure or withdrawal terms.",
    },
  ];

  return (
    <div>
      <AnalyticsEvent name="comparison_opened" params={{ comparison_slug: page.slug, comparison_providers: `${page.providerA.name}|${page.providerB.name}`, source_page: `/compare/${page.slug}` }} />
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
          "@type": "FAQPage",
          mainEntity: comparisonFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
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
            <p className="mt-4 text-sm font-bold text-slate-500">
              Last verified {lastVerified ? formatDate(lastVerified) : "review in progress"}
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
          <h2 className="text-3xl font-black text-slate-950">Side-by-side comparison table</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-600">
            Use this table as a research checklist. Provider terms control
            account availability, eligibility, fees, rewards, and features.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  {["Comparison area", page.providerA.name, page.providerB.name, "What to verify"].map((heading) => (
                    <th key={heading} className="px-4 py-3">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows(page.providerA, page.providerB).map((row) => (
                  <tr key={row.area} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-extrabold text-slate-950">{row.area}</td>
                    <td className="px-4 py-4 text-slate-700">{row.a}</td>
                    <td className="px-4 py-4 text-slate-700">{row.b}</td>
                    <td className="px-4 py-4 text-slate-700">{row.verify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <ResearchPanel
          title={`${page.providerA.name} research notes`}
          items={page.providerA.commonOfferTypes}
          footer={page.providerA.disclosureNote}
        />
        <ResearchPanel
          title={`${page.providerB.name} research notes`}
          items={page.providerB.commonOfferTypes}
          footer={page.providerB.disclosureNote}
        />
        <ResearchPanel
          title="Fees and account costs"
          items={["Monthly fees or waivers", "Transfer or funding fees", "ATM and cash access costs", "Subscription, annual, or advisory fees where relevant"]}
          footer="Fee schedules can change. Verify current costs directly before opening or moving an account."
        />
        <ResearchPanel
          title="Mobile experience and access"
          items={["Mobile deposit and transfers", "Alerts and card controls", "ATM or branch access", "Support channels and availability"]}
          footer="Mobile tools, ATM policies, and support options vary by provider and account type."
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <HowOfferRadarWorks />
        <LinkPanel
          title="Related tools"
          links={[
            { href: "/banking-finder", label: "Banking finder" },
            { href: "/offer-tracker", label: "Offer tracker" },
            { href: "/compare", label: "Comparison hub" },
            { href: "/offers", label: "Tracked offers" },
          ]}
        />
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {comparisonFaq.map((item) => (
            <article key={item.question} className="rounded-2xl bg-white p-5">
              <h3 className="font-extrabold text-slate-950">{item.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <VerificationMethodology />
          <DisclosureBlock />
        </div>
      </div>
    </div>
  );
}

function comparisonRows(
  providerA: NonNullable<ReturnType<typeof getProviderComparisonBySlug>>["providerA"],
  providerB: NonNullable<ReturnType<typeof getProviderComparisonBySlug>>["providerB"],
) {
  return [
    {
      area: "Account types",
      a: providerA.commonOfferTypes.join(", "),
      b: providerB.commonOfferTypes.join(", "),
      verify: "Eligible account type, opening rules, and current terms",
    },
    {
      area: "Fees",
      a: providerA.thingsToVerify.filter((item) => item.toLowerCase().includes("fee")).join(", ") || "Review provider fee schedule",
      b: providerB.thingsToVerify.filter((item) => item.toLowerCase().includes("fee")).join(", ") || "Review provider fee schedule",
      verify: "Monthly, transfer, ATM, annual, subscription, or advisory fees",
    },
    {
      area: "Mobile experience",
      a: "Review mobile tools, alerts, transfers, and support access",
      b: "Review mobile tools, alerts, transfers, and support access",
      verify: "Mobile deposit, card controls, alerts, transfer limits, and app support",
    },
    {
      area: "ATM or branch access",
      a: providerA.relatedCategories.includes("bank-bonuses") ? "Verify branch, ATM, and cash access" : "Verify cash movement, transfer, and account access",
      b: providerB.relatedCategories.includes("bank-bonuses") ? "Verify branch, ATM, and cash access" : "Verify cash movement, transfer, and account access",
      verify: "Availability can vary by location, account type, and provider rules",
    },
    {
      area: "Promotion research",
      a: providerA.disclosureNote,
      b: providerB.disclosureNote,
      verify: "Last verified date, source reviewed, eligibility, and current provider terms",
    },
  ];
}

function ResearchPanel({
  title,
  items,
  footer,
}: {
  title: string;
  items: string[];
  footer: string;
}) {
  return (
    <article className="premium-card rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
            {item}
          </p>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{footer}</p>
    </article>
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
