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
        body: "Brokerage promotions and brokerage account bonuses can involve new-account funding, ACAT transfers, referral eligibility, or a required holding period. Compare the required transfer or deposit behind the headline value and review investment, transfer, tax, and account fees.",
      },
      {
        title: "Brokerage account bonus comparison",
        body: "A useful brokerage account bonus comparison starts with the provider, displayed bonus amount, transfer or funding requirement, holding period, account fees, and source-reviewed date. Investment risk and account fit matter more than the headline amount alone.",
      },
      {
        title: "Transfer bonus section",
        body: "Transfer bonuses may depend on eligible incoming assets, ACAT support, asset value tiers, unsupported securities, outgoing transfer fees, and a required holding period after assets arrive.",
      },
      {
        title: "Account funding section",
        body: "Funding promotions may use cash deposits, minimum account values, eligible account types, campaign windows, and reward rules. Verify whether funds or assets must stay in the account.",
      },
      {
        title: "Robinhood transfer bonus records for 2026",
        body: "OfferRadar tracks a Robinhood transfer promotion record for comparison. Transfer thresholds, subscription requirements, holding periods, and current availability should be checked directly with Robinhood before moving assets.",
      },
      {
        title: "Robinhood, Webull, Fidelity, Merrill Edge, and SoFi Invest",
        body: "These providers can appear in brokerage bonus research for different reasons: app-based signup promotions, transfer offers, retirement or brokerage account funding, relationship requirements, or investing platform features. Compare the account fit before comparing a promotion.",
      },
      {
        title: "Clearpath Brokerage search note",
        body: "OfferRadar has a tracked Clearpath Brokerage record, but no verified official provider source is currently recorded. Treat the listing as a research record and verify the provider and current terms independently before acting.",
      },
      {
        title: "How brokerage bonuses work",
        body: "A brokerage account bonus usually depends on opening an eligible account, transferring or depositing assets, maintaining assets for a stated period, and meeting current provider terms. The bonus value is only one part of the comparison.",
      },
    ],
    faq: [
      {
        question: "What is a brokerage account bonus?",
        answer:
          "A brokerage account bonus is a promotion that may depend on opening, funding, transferring, or maintaining an eligible account. Requirements and availability can change.",
      },
      {
        question: "Where can I compare brokerage promotions?",
        answer:
          "Use a comparison table that shows the provider, displayed bonus amount, transfer or funding requirement, holding period, fees, verification date, and current provider source. OfferRadar organizes tracked records for research, not recommendations.",
      },
      {
        question: "How should I compare brokerage account promotions?",
        answer:
          "Compare the stated value, eligible account type, funding or transfer requirement, holding period, transfer and account fees, investment risk, verification date, and current provider terms.",
      },
      {
        question: "Are brokerage account promotions worth it?",
        answer:
          "They may be worth researching when the account already fits your investing needs. Review transfer costs, account fees, taxes, holding periods, available investments, and provider terms before moving money or assets.",
      },
      {
        question: "Are brokerage bonuses taxable?",
        answer:
          "Brokerage bonus tax treatment can vary by provider, reward type, account type, and reporting. OfferRadar does not provide tax advice; review provider tax documents and consult a qualified tax professional when needed.",
      },
      {
        question: "How long do brokerage bonuses take?",
        answer:
          "Timing can vary. Review the provider's funding or transfer deadline, asset arrival date, holding period, reward calculation window, and expected payout timing.",
      },
      {
        question: "What is a transfer bonus?",
        answer:
          "A transfer bonus is a promotion tied to moving eligible assets or cash to a brokerage. Verify ACAT support, eligible assets, minimum value, outgoing fees, holding period, and current terms.",
      },
      {
        question: "Are brokerage promotions available to every investor?",
        answer:
          "No. Availability and eligibility can vary by provider, account type, customer history, transfer value, campaign, and location. Verify current terms directly.",
      },
      {
        question: "What should I verify before transferring investments?",
        answer:
          "Verify eligible assets, transfer fees, minimum values, holding periods, subscription costs, tax considerations, and current provider terms.",
      },
      {
        question: "How should I research a Robinhood transfer bonus?",
        answer:
          "Verify eligible assets, transfer amount, ACAT support, subscription requirements, holding period, transfer fees, investment risk, and current Robinhood terms before moving assets.",
      },
      {
        question: "What should I compare in a Webull bonus?",
        answer:
          "Compare eligible account type, deposit or transfer requirement, campaign dates, reward form, holding period, fees, and current Webull terms. Availability can vary.",
      },
    ],
  },
  "bank-bonuses": {
    sections: [
      {
        title: "Checking and savings account offers",
        body: "The best checking and savings account offers are the ones where the account still fits after the promotion. Checking promotions often focus on direct deposit or activity, while savings promotions may require new money, a maintained balance, and variable-rate terms.",
      },
      {
        title: "How to compare banks for checking",
        body: "The best bank for checking depends on how you use the account. Compare monthly fees, waiver rules, direct deposit definitions, ATM access, overdraft policies, regional availability, mobile tools, and the account's ongoing fit after a promotion ends.",
      },
      {
        title: "Best bank for checking research",
        body: "A checking account that looks attractive in search results can still be a poor fit if the fee waiver is hard to meet or branch and ATM access are inconvenient. Use the comparison table to separate offer value from everyday account usefulness.",
      },
      {
        title: "Direct deposit requirements and monthly fees",
        body: "Providers define qualifying direct deposit differently. Check the required source, amount, timing window, monthly service fee, waiver conditions, and early account closure rules.",
      },
      {
        title: "Checking and savings promotions",
        body: "Checking account promotions and savings account promotions should be compared separately because they often use different requirements, account access rules, balance expectations, and fee structures.",
      },
    ],
    faq: [
      {
        question: "What makes a bank bonus worth comparing?",
        answer:
          "Compare the stated value against required deposits, direct deposit rules, monthly fees, account usefulness, eligibility restrictions, and the time required to complete the terms.",
      },
      {
        question: "What are the best checking and savings account offers?",
        answer:
          "The best offers are the ones with requirements you can verify and accounts that fit after the promotion. Compare checking direct deposit rules, savings balance requirements, monthly fees, account access, payout timing, and source-reviewed dates.",
      },
      {
        question: "Do all checking bonuses require direct deposit?",
        answer:
          "No. Some require deposits, transactions, balances, or offer codes instead. Verify the live provider terms for each tracked offer.",
      },
      {
        question: "What is the best bank for checking?",
        answer:
          "There is no single best bank for every user. Compare monthly fees, waiver rules, branch and ATM access, digital tools, direct deposit definitions, support, and ongoing account fit.",
      },
      {
        question: "How do I choose the best bank for checking?",
        answer:
          "Start with the account's ongoing cost and access: monthly fee, fee waiver, ATM network, branch needs, mobile tools, overdraft policy, customer support, and direct deposit compatibility. Then compare any tracked promotion as a secondary factor.",
      },
      {
        question: "How should I compare checking and savings account offers?",
        answer:
          "Compare the account purpose, required activity or balance, fees, access, eligibility, payout timing, verification date, and current provider terms.",
      },
      {
        question: "How do checking account promotions differ from savings account promotions?",
        answer:
          "Checking promotions often involve direct deposit or account activity, while savings promotions may require new money, balance tiers, and a maintained balance. Verify the current provider terms for each account.",
      },
      {
        question: "Can a savings account promotion be better than a checking promotion?",
        answer:
          "It depends on your account needs, balance, access requirements, fees, timing, and eligibility. Compare the full account fit instead of only the stated bonus amount.",
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
      ? "Brokerage promotions and account bonuses"
      : category.slug === "bank-bonuses"
        ? "Best checking and savings account offers"
        : category.title;
  const isBrokerage = category.slug === "brokerage-bonuses";
  const isBank = category.slug === "bank-bonuses";
  const comparisonOffers = [...offers]
    .filter((offer) => offer.status === "active")
    .slice(0, 8);
  const brokerageLeaders = isBrokerage
    ? [...offers]
        .filter((offer) => offer.status === "active")
        .sort((a, b) => numericValue(b.offerAmount) - numericValue(a.offerAmount))
        .slice(0, 7)
    : [];
  const popularBrokerages = ["robinhood", "webull", "fidelity", "merrill-edge", "sofi", "public", "schwab", "moomoo", "etrade"]
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
              {isBank
                ? "Compare tracked checking and savings account offers by direct deposit rules, required balances, monthly fees, branch and ATM access, verification dates, and current provider terms. The best bank for checking depends on everyday account fit, not only a promotion."
                : isBrokerage
                  ? "Compare tracked brokerage promotions and account bonuses by funding or transfer requirements, holding periods, fees, verification status, and current provider terms before opening or moving an account."
                  : category.description}
            </p>
            <p className="mt-4 text-sm font-bold text-slate-500">
              Source-reviewed records · Last verified{" "}
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
                <Link href="/brokerage-bonus-calculator" className="mt-3 block font-extrabold text-blue-700">
                  Estimate bonus costs
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

      {isBank ? (
        <OfferComparisonTable offers={comparisonOffers} title="Checking and savings offer comparison" variant="bank" />
      ) : null}

      {category.slug === "bank-bonuses" ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link href="/bank-bonus-calculator" className="premium-card block rounded-3xl p-6 transition hover:border-blue-200">
            <h2 className="text-2xl font-black text-slate-950">Estimate bank bonus costs</h2>
            <p className="mt-3 leading-7 text-slate-600">Use the bank bonus calculator to compare a stated bonus with monthly fees, deposit requirements, and holding time.</p>
          </Link>
        </section>
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

      {(isBank || isBrokerage) ? (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-slate-950">Related high-intent pages</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { href: "/best-checking-accounts-florida", label: "Best checking accounts in Florida" },
                { href: "/best-banks-for-checking", label: "Best banks for checking" },
                { href: "/best-checking-and-savings-account-offers", label: "Checking and savings offers" },
                { href: "/bank-bonuses", label: "Bank bonuses" },
                { href: "/brokerage-bonuses", label: "Brokerage bonuses" },
                { href: "/best-bank-bonuses-florida", label: "Best Florida bank bonuses" },
                { href: "/offers", label: "All tracked offers" },
              ]
                .filter((link) => link.href !== `/${category.slug}`)
                .map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800">
                    {link.label}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      ) : null}

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
