import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { OfferCard } from "@/components/OfferCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  featuredGuideLinks,
  popularCategoryLinks,
  popularComparisonLinks,
  priorityLandingPages,
} from "@/data/internalLinks";
import { floridaCities, localSeoPages } from "@/data/localSeo";
import { categories } from "@/data/offers";
import {
  formatDate,
  getActiveOfferCount,
  getAllProviders,
  getBestOffersByCategory,
  getExpiringSoonOffers,
  getFeaturedOffers,
  getLastUpdated,
  getRecentlyVerifiedOffers,
} from "@/lib/offers";

export const metadata: Metadata = {
  title: "Florida Banking Offers and Account Comparisons | OfferRadar",
  description:
    "Compare Florida checking accounts, savings options, bank bonuses, brokerage promotions, providers, requirements, and last verified offer records.",
};

export default function Home() {
  const featuredOffers = getFeaturedOffers();
  const bestCurrentOffers = [
    ...getBestOffersByCategory("bank-bonuses", 2),
    ...getBestOffersByCategory("brokerage-bonuses", 2),
    ...getBestOffersByCategory("referral-offers", 2),
  ].slice(0, 6);
  const recentOffers = getRecentlyVerifiedOffers(5);
  const expiringSoonOffers = getExpiringSoonOffers(5);
  const popularProviders = getAllProviders().slice(0, 8);
  const newThisWeekOffers = getRecentlyVerifiedOffers(4);
  const lastUpdated = getLastUpdated();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homepageFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_20%_20%,#dffcf4_0,#f8fbff_32%,#f6f8fb_70%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div>
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700 shadow-sm">
              OfferRadar.io
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-[#07111f] sm:text-6xl sm:leading-[1.02]">
              Compare banking offers and accounts in Florida.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              OfferRadar helps compare Florida checking accounts, savings
              options, credit unions, business banking, mortgage topics, and
              bank bonuses with requirements, last verified dates, source
              review, and clear disclosures.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/best-checking-accounts-florida"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-700 px-6 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800"
              >
                Compare offers
              </Link>
              <Link
                href="#lead-capture"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white/90 px-6 text-sm font-extrabold text-slate-950 shadow-sm hover:border-blue-300 hover:text-blue-800"
              >
                Review local options
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Built for daily tracking",
                "Disclosure first",
                "Verification status",
                "No financial advice",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <HeroDashboard
            activeCount={getActiveOfferCount()}
            categoryCount={categories.length}
            lastUpdated={lastUpdated ? formatDate(lastUpdated) : "Reviewing"}
          />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            "Transparent disclosures",
            "Verification dates",
            "Requirements-first comparison",
            "Source links when available",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <span className="size-2 rounded-full bg-teal-500 shadow-[0_0_16px_rgba(20,184,166,0.6)]" />
              <p className="text-sm font-bold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <OfferSection
        eyebrow="Ranked for comparison"
        title="Best current offers"
        description="Active offers surfaced by category, featured status, and verification recency. Verify live terms before acting."
        action={<SectionLinks />}
      >
        {bestCurrentOffers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </OfferSection>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Current research paths</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">Trending financial guides this week</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Timely comparison pages and tools connected to the banking and brokerage topics readers are researching now.</p>
            </div>
            <Link href="/weekly-offer-radar" className="text-sm font-extrabold text-blue-700">Open the weekly hub</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["/brokerage-bonuses", "Brokerage bonuses", "Compare tracked promotions, transfers, and requirements."],
              ["/best-checking-accounts-florida", "Florida checking accounts", "Review access, fees, bonuses, and verification details."],
              ["/bank-bonuses", "Bank bonuses", "Compare checking and savings offer requirements."],
              ["/world-cup-travel-money-guide", "World Cup travel money guide", "Plan cards, ATM access, fees, and backup payments."],
              ["/bank-bonus-calculator", "Bank bonus calculator", "Estimate a bonus after listed monthly fees."],
              ["/brokerage-bonus-calculator", "Brokerage bonus calculator", "Estimate a promotion after transfer and account fees."],
            ].map(([href, label, description]) => (
              <Link key={href} href={href} className="premium-card rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200">
                <h3 className="font-extrabold text-slate-950">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OfferSection
        tone="white"
        eyebrow="Reviewed data"
        title="Featured offers"
        description="Selected active offers with clear requirements, last reviewed dates, and visible verification status."
        action={<Link href="/offers" className="text-sm font-extrabold text-blue-700">View all offers</Link>}
      >
        {featuredOffers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </OfferSection>

      <OfferSection
        eyebrow="Time-sensitive"
        title="Expiring soon"
        description="Offers with listed expiration dates in the next 45 days. Providers may end or update terms earlier."
      >
        {expiringSoonOffers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </OfferSection>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Popular Providers
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Provider pages to compare
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Start with provider pages, then compare related offers,
                categories, and provider-vs-provider pages.
              </p>
            </div>
            <Link href="/providers" className="text-sm font-extrabold text-blue-700">
              Browse all providers
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularProviders.map((provider) => (
              <Link
                key={provider.slug}
                href={`/provider/${provider.slug}`}
                className="premium-card rounded-2xl p-4 font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-800"
              >
                {provider.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Verification feed
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Recently verified
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These listings were most recently checked in the OfferRadar data.
              Dates help orient comparison, but provider terms remain the source
              of truth.
            </p>
          </div>
          <div className="grid gap-3">
            {recentOffers.map((offer) => (
              <Link
                key={offer.slug}
                href={`/offer/${offer.slug}`}
                className="premium-card flex flex-col justify-between gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 sm:flex-row sm:items-center"
              >
                <span>
                  <span className="block font-extrabold text-slate-950">
                    {offer.provider}
                  </span>
                  <span className="text-sm text-slate-600">{offer.title}</span>
                </span>
                <span className="text-sm font-bold text-teal-700">
                  {formatDate(offer.lastVerified)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              New This Week
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Recently refreshed offer records
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              New and recently verified records are shown with last reviewed
              dates so readers can verify terms directly before acting.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {newThisWeekOffers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/offer/${offer.slug}`}
              className="premium-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200"
            >
              <p className="text-sm font-extrabold text-slate-950">
                {offer.provider}
              </p>
              <p className="mt-2 text-sm text-slate-600">{offer.title}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-teal-700">
                Last verified {formatDate(offer.lastVerified)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Coverage
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Categories tracked
            </h2>
          </div>
          <Link href="/providers" className="text-sm font-extrabold text-blue-700">
            Browse providers
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Florida city pages
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Local banking research in Florida
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Start with city and statewide pages, then compare offers,
                account requirements, and provider terms directly.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <div className="premium-card rounded-3xl p-6">
              <h3 className="text-xl font-black text-slate-950">
                Featured local pages
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {localSeoPages.map((page) => (
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
            <div className="premium-card rounded-3xl p-6">
              <h3 className="text-xl font-black text-slate-950">
                Florida cities tracked
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {floridaCities.map((city) => (
                  <span
                    key={city.slug}
                    className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700"
                  >
                    {city.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Research paths
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Programmatic guides
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Comparison pages for common offer searches and state bank bonus
                research.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/checking-account-bonuses", "Checking bonuses"],
              ["/direct-deposit-bonuses", "Direct deposit bonuses"],
              ["/credit-card-welcome-offers", "Card welcome offers"],
              ["/national-bank-bonuses", "National bank bonuses"],
              ...priorityLandingPages.map((link) => [link.href, link.label]),
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:text-blue-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Provider research
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Provider comparisons and guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Compare providers, then use educational guides to check
              requirements, fees, disclosures, and expiration dates.
            </p>
          </div>
          <Link href="/providers" className="text-sm font-extrabold text-blue-700">
            Browse providers
          </Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="premium-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-950">
              Popular Comparisons
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {popularComparisonLinks.map((comparison) => (
                <Link
                  key={comparison.href}
                  href={comparison.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {comparison.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h3 className="text-xl font-black text-slate-950">
              Featured Guides
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {featuredGuideLinks.map((guide) => (
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
            <h3 className="text-xl font-black text-slate-950">
              Popular Categories
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {popularCategoryLinks.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="premium-card rounded-3xl p-7">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Method
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            How OfferRadar works
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Track offers",
              "Verify details",
              "Compare requirements",
              "Review source links",
            ].map((item, index) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4">
                <span className="text-sm font-black text-teal-700">
                  0{index + 1}
                </span>
                <p className="mt-2 font-extrabold text-slate-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <DisclosureBlock />
      </section>

      <section className="border-t border-slate-200 bg-[#07111f] text-white">
        <div className="radar-grid mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-300">
              Trust model
            </p>
            <h2 className="mt-3 text-3xl font-black">Why trust OfferRadar?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              OfferRadar is designed around requirements, verification dates,
              and visible disclosures, not just headline bonus amounts.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "We organize offers by requirements, not just bonus size.",
              "We show last reviewed dates and verification status.",
              "We flag terms users should verify before applying.",
              "Outbound link relationships are disclosed.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="font-bold text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lead-capture" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Research updates
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Track banking updates
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Tell us your city and product interest. We will use this to improve
            local Florida banking comparisons and research-update workflows.
          </p>
        </div>
        <div className="premium-card rounded-3xl p-6">
          <LeadCaptureForm source="homepage" />
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">OfferRadar FAQ</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {homepageFaq.map((item) => (
              <article key={item.question} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-extrabold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <VerificationMethodology />
      </section>
    </>
  );
}

const homepageFaq = [
  {
    question: "What does OfferRadar track?",
    answer:
      "OfferRadar organizes banking, brokerage, savings, referral, business, credit card, and cash back offer records for research and comparison.",
  },
  {
    question: "How current are OfferRadar records?",
    answer:
      "Pages show last verified or last reviewed dates where available. Provider terms remain the source of truth and should be checked before acting.",
  },
];

function HeroDashboard({
  activeCount,
  categoryCount,
  lastUpdated,
}: {
  activeCount: number;
  categoryCount: number;
  lastUpdated: string;
}) {
  return (
    <div className="premium-card relative overflow-hidden rounded-[2rem] p-6">
      <div className="absolute right-[-70px] top-[-70px] size-56 rounded-full border border-teal-200" />
      <div className="absolute right-[-34px] top-[-34px] size-36 rounded-full border border-blue-200" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold text-slate-950">Radar Scan</p>
          <StatusBadge status="verified_today" />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <Stat label="Active offers" value={String(activeCount)} />
          <Stat label="Recently verified" value={lastUpdated} />
          <Stat label="Top categories" value={String(categoryCount)} />
        </div>
        <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-300">Expiring soon</p>
            <span className="size-3 rounded-full bg-amber-300" />
          </div>
          <div className="mt-5 h-2 rounded-full bg-white/10">
            <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-teal-300 to-blue-400" />
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-300">
            Scan requirements, deadlines, fees, and verification notes before
            opening an account.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionLinks() {
  return (
    <div className="flex flex-wrap gap-3 text-sm font-extrabold text-blue-700">
      <Link href="/best-bank-bonuses">Bank bonuses</Link>
      <Link href="/best-brokerage-bonuses">Brokerage</Link>
      <Link href="/best-referral-bonuses">Referrals</Link>
      <Link href="/providers">Providers</Link>
    </div>
  );
}

function OfferSection({
  tone = "slate",
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  tone?: "slate" | "white";
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className={
        tone === "white"
          ? "border-y border-slate-200 bg-white"
          : "bg-transparent"
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
          {action}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}
