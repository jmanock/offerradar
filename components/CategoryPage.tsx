import Link from "next/link";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { OfferComparisonTable } from "@/components/OfferComparisonTable";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { featuredGuideLinks, popularComparisonLinks } from "@/data/internalLinks";
import {
  formatDate,
  getAllOfferTypePages,
  getAllProviders,
  getLastUpdated,
  getOffersByCategory,
} from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

const categorySearchContent: Partial<
  Record<
    CategoryInfo["slug"],
    {
      sections: { title: string; body: string }[];
      faq: { question: string; answer: string }[];
    }
  >
> = {
  "brokerage-bonuses": {
    sections: [
      {
        title: "Brokerage promotions and account bonuses",
        body: "Brokerage promotions can involve new-account funding, asset transfers, referral eligibility, or a required holding period. Compare the requirement behind the headline value and review investment, transfer, and account fees.",
      },
      {
        title: "Robinhood transfer bonus records for 2026",
        body: "OfferRadar tracks a Robinhood transfer promotion record for comparison. Transfer thresholds, subscription requirements, holding periods, and current availability should be checked directly with Robinhood before moving assets.",
      },
      {
        title: "Clearpath Brokerage search note",
        body: "OfferRadar has a tracked Clearpath Brokerage record, but no verified official provider source is currently recorded. Treat the listing as a research record and verify the provider and current terms independently before acting.",
      },
    ],
    faq: [
      {
        question: "What is a brokerage account bonus?",
        answer:
          "A brokerage account bonus is a promotion that may depend on opening, funding, transferring, or maintaining an eligible account. Requirements and availability can change.",
      },
      {
        question: "What should I verify before transferring investments?",
        answer:
          "Verify eligible assets, transfer fees, minimum values, holding periods, subscription costs, tax considerations, and current provider terms.",
      },
    ],
  },
  "bank-bonuses": {
    sections: [
      {
        title: "Checking and savings account offers",
        body: "Checking bonuses often focus on direct deposit or account activity, while savings offers may require new money and a maintained balance. Compare the account itself as well as the promotion.",
      },
      {
        title: "How to compare banks for checking",
        body: "A useful checking account comparison includes monthly fees, waiver rules, direct deposit definitions, ATM access, overdraft policies, regional availability, and the account's ongoing fit after a promotion ends.",
      },
      {
        title: "Direct deposit requirements and monthly fees",
        body: "Providers define qualifying direct deposit differently. Check the required source, amount, timing window, monthly service fee, waiver conditions, and early account closure rules.",
      },
    ],
    faq: [
      {
        question: "What makes a bank bonus worth comparing?",
        answer:
          "Compare the stated value against required deposits, direct deposit rules, monthly fees, account usefulness, eligibility restrictions, and the time required to complete the terms.",
      },
      {
        question: "Do all checking bonuses require direct deposit?",
        answer:
          "No. Some require deposits, transactions, balances, or offer codes instead. Verify the live provider terms for each tracked offer.",
      },
    ],
  },
};

export function CategoryPage({ category }: { category: CategoryInfo }) {
  const offers = getOffersByCategory(category.slug);
  const searchContent = categorySearchContent[category.slug];
  const lastUpdated = getLastUpdated();
  const relatedProviders = getAllProviders()
    .filter((provider) => provider.relatedCategories.includes(category.slug))
    .slice(0, 8);
  const relatedOfferTypePages = getAllOfferTypePages().filter((page) =>
    page.relatedCategories.includes(category.slug),
  );
  const h1 =
    category.slug === "brokerage-bonuses"
      ? "Brokerage bonuses and promotions"
      : category.slug === "bank-bonuses"
        ? "Bank bonuses for checking and savings"
        : category.title;
  const isBrokerage = category.slug === "brokerage-bonuses";
  const brokerageLeaders = isBrokerage
    ? [...offers]
        .filter((offer) => offer.status === "active")
        .sort((a, b) => numericValue(b.offerAmount) - numericValue(a.offerAmount))
        .slice(0, 7)
    : [];
  const popularBrokerages = ["robinhood", "webull", "fidelity", "public", "schwab", "moomoo", "etrade"]
    .map((slug) => getAllProviders().find((provider) => provider.slug === slug))
    .filter((provider): provider is NonNullable<typeof provider> => Boolean(provider));

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
              {h1}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {category.description}
            </p>
            <p className="mt-4 text-sm font-bold text-slate-500">
              Verification-first tracker · Last verified{" "}
              {lastUpdated ? formatDate(lastUpdated) : "review in progress"}
            </p>
            <Link
              href="/offers"
              className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800"
            >
              Compare all tracked offers
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

      {searchContent ? (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Search-focused research
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              What to compare before opening or transferring an account
            </h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {searchContent.sections.map((section) => (
                <article key={section.title} className="premium-card rounded-3xl p-6">
                  <h3 className="text-xl font-black text-slate-950">{section.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">
          {isBrokerage ? "Best brokerage bonuses right now" : "Tracked offers"}
        </h2>
        {isBrokerage ? (
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Ranked from available active tracked data using verification status,
            last verified date, and displayed value. Provider terms control
            current availability and eligibility.
          </p>
        ) : null}
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(isBrokerage ? brokerageLeaders : offers).map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      {isBrokerage ? (
        <>
          <OfferComparisonTable offers={brokerageLeaders} title="Brokerage bonus comparison table" />
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-2">
              <article className="premium-card rounded-3xl p-6">
                <h2 className="text-2xl font-black text-slate-950">Robinhood transfer bonus guide</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Transfer promotions may depend on eligible incoming assets,
                  transfer value, ACAT support, subscription features, and a
                  required holding period. Verify transfer fees, unsupported
                  assets, withdrawal treatment, and current Robinhood terms.
                </p>
                <Link href="/robinhood-transfer-bonus-guide" className="mt-5 inline-flex font-extrabold text-blue-700">
                  Read the transfer guide
                </Link>
              </article>
              <article className="premium-card rounded-3xl p-6">
                <h2 className="text-2xl font-black text-slate-950">Highest tracked brokerage offers</h2>
                <div className="mt-4 grid gap-3">
                  {brokerageLeaders.slice(0, 5).map((offer) => (
                    <Link key={offer.slug} href={`/offer/${offer.slug}`} className="flex justify-between gap-4 rounded-xl bg-slate-50 p-3 text-sm">
                      <span className="font-extrabold text-slate-950">{offer.provider}</span>
                      <span className="font-bold text-teal-700">{offer.offerAmount}</span>
                    </Link>
                  ))}
                </div>
              </article>
            </div>
          </section>
          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-slate-950">Popular brokerage providers</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {popularBrokerages.map((provider) => (
                  <Link key={provider.slug} href={`/provider/${provider.slug}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800">
                    {provider.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

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

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <LinkPanel
          title="Related providers"
          links={relatedProviders.map((provider) => ({
            href: `/provider/${provider.slug}`,
            label: provider.name,
          }))}
        />
        <LinkPanel title="Related guides" links={featuredGuideLinks.slice(0, 6)} />
        <LinkPanel title="Popular comparisons" links={popularComparisonLinks.slice(0, 6)} />
      </section>

      {searchContent ? (
        <section className="border-y border-slate-200 bg-white">
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <VerificationMethodology />
          <DisclosureBlock />
        </div>
      </div>
    </div>
  );
}

function numericValue(value: string) {
  const match = value.replaceAll(",", "").match(/\d+/);
  return match ? Number(match[0]) : 0;
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
