import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HowOfferRadarWorks } from "@/components/HowOfferRadarWorks";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { OfferComparisonTable } from "@/components/OfferComparisonTable";
import { ResearchMethodologyBlock } from "@/components/ResearchMethodologyBlock";
import { SortableComparisonTable } from "@/components/SortableComparisonTable";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import type { AuthorityPage as AuthorityPageData } from "@/data/authorityPages";
import {
  formatDate,
  getBestOffersByCategory,
  getLastUpdated,
  getOffersByProvider,
  getOffersForOfferTypePage,
} from "@/lib/offers";

export function AuthorityPage({ page }: { page: AuthorityPageData }) {
  const offers =
    page.slug === "brokerage-transfer-bonuses"
      ? getOffersForOfferTypePage(page.slug).slice(0, 8)
      : page.slug.startsWith("robinhood-")
        ? getOffersByProvider("Robinhood").slice(0, 6)
        : page.slug.startsWith("wells-fargo-")
          ? getOffersByProvider("Wells Fargo").slice(0, 6)
        : page.offerCategory
          ? getBestOffersByCategory(page.offerCategory, 6)
          : [];
  const lastUpdated = getLastUpdated();
  const isTravelGuide = page.slug.includes("world-cup");
  const isCheckingAuthority =
    page.slug === "best-bank-for-checking" ||
    page.slug === "best-banks-for-checking" ||
    page.slug === "best-checking-and-savings-account-offers";

  return (
    <div>
      <JsonLd
        data={
          isTravelGuide
            ? {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: page.title,
                description: page.description,
                mainEntityOfPage: `https://offerradar.io/${page.slug}`,
                author: { "@type": "Organization", name: "OfferRadar" },
                publisher: { "@type": "Organization", name: "OfferRadar" },
              }
            : { "@context": "https://schema.org", "@type": "CollectionPage", name: page.title, description: page.description, url: `https://offerradar.io/${page.slug}` }
        }
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" }, { "@type": "ListItem", position: 2, name: page.title, item: `https://offerradar.io/${page.slug}` }] }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Research guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{page.intro}</p>
          <p className="mt-4 text-sm font-bold text-slate-500">Verification-first research · Last verified {lastUpdated ? formatDate(lastUpdated) : "review in progress"}</p>
        </div>
      </section>
      {page.slug === "best-bank-for-checking" ? <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"><p className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-slate-700">This supporting guide is retained for existing readers. Continue to the <Link href="/best-banks-for-checking" className="font-extrabold text-blue-800 underline underline-offset-4">primary national checking comparison</Link> for the broadest research framework.</p></div> : null}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ResearchMethodologyBlock
          focus={
            page.offerCategory === "brokerage-bonuses"
              ? "brokerage bonuses"
              : isCheckingAuthority
                ? "checking accounts"
                : "financial comparison pages"
          }
        />
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <HowOfferRadarWorks />
        <section className="premium-card rounded-3xl p-6">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Related tools
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Next comparison step
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { href: "/banking-finder", label: "Banking finder" },
              { href: "/offer-tracker", label: "Offer tracker" },
              { href: "/bank-bonus-calculator", label: "Bank bonus calculator" },
              { href: "/compare", label: "Compare providers" },
            ].map((link) => (
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
      </section>
      {isCheckingAuthority ? (
        <SortableComparisonTable
          title="Sortable checking account comparison"
          description="Sort common checking account paths by monthly fee, minimum deposit, ATM access, or bonus amount. Values are comparison prompts and must be verified directly with the provider."
          rows={checkingAuthorityRows}
          showBonus
        />
      ) : null}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">{page.sections.map((section) => <article key={section.title} className="premium-card rounded-3xl p-6"><h2 className="text-2xl font-black text-slate-950">{section.title}</h2><p className="mt-3 leading-7 text-slate-600">{section.body}</p><div className="mt-5 grid gap-2">{section.points.map((point) => <p key={point} className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">{point}</p>)}</div></article>)}</div>
      </section>
      {offers.length ? <section className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h2 className="text-3xl font-black text-slate-950">Tracked records to compare</h2><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{offers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div></div></section> : null}
      {offers.length && (page.slug === "brokerage-transfer-bonuses" || page.offerCategory) ? (
        <OfferComparisonTable
          offers={offers}
          title={
            page.offerCategory === "bank-bonuses"
              ? "Bank offer comparison table"
              : "Brokerage transfer bonus comparison"
          }
          variant={page.offerCategory === "bank-bonuses" ? "bank" : "brokerage"}
        />
      ) : null}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8"><VerificationMethodology /><DisclosureBlock /></section>
      <section className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h2 className="text-3xl font-black text-slate-950">FAQ</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{page.faq.map((item) => <article key={item.question} className="rounded-2xl bg-slate-50 p-5"><h3 className="font-extrabold text-slate-950">{item.question}</h3><p className="mt-2 leading-7 text-slate-600">{item.answer}</p></article>)}</div></div></section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h2 className="text-2xl font-black text-slate-950">Related research</h2><div className="mt-4 flex flex-wrap gap-3">{page.relatedLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800">{link.label}</Link>)}</div></section>
    </div>
  );
}

const checkingAuthorityRows = [
  {
    name: "Online bank",
    bestFor: "Low-fee digital checking",
    monthlyFee: "$0 to verify",
    minimumDeposit: "$0 to verify",
    atmAccess: "Partner or national ATM network; verify cash deposits",
    bonusAmount: "Verify current offers",
    notes: "Best for users who prefer mobile access and do not need branches.",
  },
  {
    name: "National bank",
    bestFor: "Branch and ATM coverage",
    monthlyFee: "Waivable fee varies",
    minimumDeposit: "Verify account package",
    atmAccess: "Broad national ATM and branch access",
    bonusAmount: "Tracked records available",
    notes: "Best for users who value physical access and broad product coverage.",
  },
  {
    name: "Credit union",
    bestFor: "Member-focused checking",
    monthlyFee: "Varies by account",
    minimumDeposit: "Membership share may apply",
    atmAccess: "Local, shared branch, or partner ATM access",
    bonusAmount: "Verify current promotions",
    notes: "Best for eligible members who value local service and account fit.",
  },
  {
    name: "Regional bank",
    bestFor: "Local relationship banking",
    monthlyFee: "Waivable fee varies",
    minimumDeposit: "Verify opening rules",
    atmAccess: "Regional ATM and branch access",
    bonusAmount: "Verify current promotions",
    notes: "Best for users who want local support with a bank branch footprint.",
  },
];
