import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { VerificationMethodology } from "@/components/VerificationMethodology";
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

const providerSearchContent: Record<
  string,
  {
    title: string;
    body: string;
    links: { href: string; label: string }[];
    faq: { question: string; answer: string }[];
  }
> = {
  chase: {
    title: "Chase banking and credit card research",
    body: "Chase tracked records can include checking, savings, and credit card categories. Compare offer codes, direct deposit definitions, account packages, monthly fees, card eligibility, and current provider terms.",
    links: [{ href: "/bank-bonuses", label: "Bank bonuses" }, { href: "/credit-card-offers", label: "Credit card records" }, { href: "/compare/chase-vs-sofi", label: "Chase vs SoFi" }],
    faq: [{ question: "What Chase offer types does OfferRadar track?", answer: "OfferRadar tracks Chase records across banking and credit card categories when data is available." }, { question: "What should I verify with Chase?", answer: "Verify current availability, offer codes, eligibility, direct deposit definitions, fees, spend requirements, and provider terms." }],
  },
  sofi: {
    title: "SoFi banking, savings, and referral research",
    body: "SoFi tracked records may involve checking and savings, direct deposit tiers, or referral eligibility. Compare account type, required activity, evaluation period, fees, and current terms.",
    links: [{ href: "/bank-bonuses", label: "Bank bonuses" }, { href: "/high-yield-savings", label: "Savings records" }, { href: "/compare/chase-vs-sofi", label: "Chase vs SoFi" }],
    faq: [{ question: "What should I verify for a SoFi promotion?", answer: "Verify the eligible account, direct deposit or funding tier, evaluation period, referral eligibility, fees, and current terms." }, { question: "Are SoFi terms the same for every user?", answer: "Not necessarily. Eligibility and visible promotions can vary, so check the terms shown directly by SoFi." }],
  },
  robinhood: {
    title: "Robinhood transfer and brokerage research",
    body: "Robinhood tracked records may involve transfers, subscription features, or referral activity. Compare eligible assets, ACAT support, transfer value, holding periods, subscription costs, and investment risk.",
    links: [{ href: "/robinhood-transfer-bonus-guide", label: "Robinhood transfer guide" }, { href: "/brokerage-transfer-bonuses", label: "Transfer bonuses" }, { href: "/compare/robinhood-vs-webull", label: "Robinhood vs Webull" }],
    faq: [{ question: "What should I verify before a Robinhood transfer?", answer: "Verify eligible assets, ACAT support, transfer fees, minimum value, holding period, subscription costs, and current terms." }, { question: "Does a tracked Robinhood record guarantee a transfer bonus?", answer: "No. Verify current availability and all terms directly with Robinhood before transferring assets." }],
  },
  fidelity: {
    title: "Fidelity brokerage, retirement, and transfer research",
    body: "Fidelity tracked records may involve brokerage funding, asset transfers, or retirement accounts. Compare eligible account types, funding thresholds, holding periods, fees, tax considerations, and current terms.",
    links: [{ href: "/brokerage-bonuses", label: "Brokerage promotions" }, { href: "/brokerage-transfer-bonuses", label: "Transfer bonuses" }, { href: "/compare/fidelity-vs-robinhood", label: "Fidelity vs Robinhood" }],
    faq: [{ question: "What Fidelity account types should I compare?", answer: "Compare eligible brokerage, retirement, cash management, and transfer account types using current Fidelity terms." }, { question: "What should I verify before moving assets?", answer: "Verify eligible assets, account type, fees, tax considerations, funding or transfer threshold, and holding period." }],
  },
  "wells-fargo": {
    title: "Wells Fargo checking and credit card offer records",
    body: "OfferRadar currently tracks Wells Fargo checking and credit card offer records. Credit card approval, spend requirements, rewards value, annual fees, APR, and availability must be verified directly with Wells Fargo; the records are not recommendations or approval estimates.",
    links: [
      { href: "/bank-bonuses", label: "Compare bank bonuses" },
      { href: "/credit-card-offers", label: "Compare credit card offers" },
      { href: "/checking-account-bonuses", label: "Checking account bonuses" },
      { href: "/compare/chase-vs-wells-fargo", label: "Chase vs Wells Fargo" },
    ],
    faq: [
      {
        question: "Does OfferRadar track Wells Fargo credit card offers?",
        answer:
          "Yes. OfferRadar has a tracked Wells Fargo credit card offer record, but approval, spend requirements, rewards terms, APR, fees, and current availability must be verified directly with Wells Fargo.",
      },
      {
        question: "What should I verify for a Wells Fargo checking offer?",
        answer:
          "Verify new-customer eligibility, direct deposit definitions, state availability, monthly fees, waiver rules, deadlines, and current provider terms.",
      },
    ],
  },
  "merrill-edge": {
    title: "Merrill Edge brokerage and transfer research",
    body: "Merrill Edge promotions may connect brokerage funding, asset transfers, and Bank of America relationship requirements. Compare eligible account types, funding or transfer thresholds, holding periods, investment fees, and current provider terms.",
    links: [
      { href: "/brokerage-bonuses", label: "Brokerage promotions" },
      { href: "/brokerage-transfer-bonuses", label: "Transfer bonus records" },
      { href: "/compare/fidelity-vs-merrill-edge", label: "Fidelity vs Merrill Edge" },
      { href: "/guides/brokerage-bonuses", label: "Brokerage bonus guide" },
    ],
    faq: [
      {
        question: "What should I compare in a Merrill Edge promotion?",
        answer:
          "Compare eligible account types, funding or transfer requirements, holding periods, relationship requirements, fees, investment risk, and current provider terms.",
      },
      {
        question: "Does a tracked Merrill Edge record guarantee a promotion?",
        answer:
          "No. Tracked records are for research. Verify current availability and all requirements directly with Merrill Edge before transferring or opening an account.",
      },
    ],
  },
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

  if (provider.slug === "wells-fargo") {
    return {
      title: "Wells Fargo Offers | Checking and Credit Card Records",
      description:
        "Compare tracked Wells Fargo checking and credit card offer records, requirements, fees to verify, last reviewed dates, and current provider terms.",
      alternates: { canonical: `/provider/${provider.slug}` },
    };
  }

  if (provider.slug === "merrill-edge") {
    return {
      title: "Merrill Edge Offers | Brokerage and Transfer Research",
      description:
        "Review tracked Merrill Edge brokerage and transfer offer records, funding requirements, holding periods, fees, and verification notes.",
      alternates: { canonical: `/provider/${provider.slug}` },
    };
  }

  return {
    title: `${provider.name} Offers | Tracked Records and Requirements`,
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
  const searchContent = providerSearchContent[provider.slug];
  const isPriorityProvider = ["robinhood", "fidelity", "wells-fargo", "chase", "sofi"].includes(provider.slug);
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
      {searchContent ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: searchContent.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      ) : null}

      {isPriorityProvider ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="premium-card rounded-3xl p-6">
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Provider overview</p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">{provider.name} account types</h2>
              <p className="mt-3 leading-7 text-slate-600">{provider.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{provider.commonOfferTypes.map((type) => <span key={type} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">{type}</span>)}</div>
            </article>
            <article className="premium-card rounded-3xl p-6">
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Tracked offer history</p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">Current tracked records</h2>
              <div className="mt-5 grid gap-3">
                {offers.length ? offers.slice(0, 4).map((offer, index) => <Link key={offer.slug} href={`/offer/${offer.slug}`} className="rounded-2xl bg-slate-50 p-4"><span className="block text-xs font-extrabold uppercase tracking-wide text-teal-700">{index === 0 ? "Current tracked record" : "Other tracked record"}</span><span className="mt-2 block font-extrabold text-slate-950">{offer.title}</span><span className="mt-1 block text-sm text-slate-600">Last verified {offer.lastVerified}</span></Link>) : <p className="rounded-2xl bg-slate-50 p-4 text-slate-600">No current tracked offer record. Verify directly with the provider.</p>}
              </div>
            </article>
          </div>
          <div className="mt-6"><VerificationMethodology /></div>
        </section>
      ) : null}
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

      {searchContent ? (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Provider research
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {searchContent.title}
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-600">
              {searchContent.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {searchContent.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {link.label}
                </Link>
              ))}
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
      {searchContent ? (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {searchContent.faq.map((item) => (
                <article key={item.question} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-extrabold text-slate-950">{item.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
