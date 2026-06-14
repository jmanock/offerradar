import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { OfferCard } from "@/components/OfferCard";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { formatDate, getLastUpdated, getRecentlyVerifiedOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Weekly OfferRadar | Recently Verified Offers and Research",
  description: "Review recently verified offers, priority brokerage and bank bonus pages, Florida banking research, travel money guides, and comparison calculators.",
  alternates: { canonical: "/weekly-offer-radar" },
};

const groups = [
  {
    title: "Top brokerage research",
    links: [
      { href: "/brokerage-bonuses", label: "Brokerage bonuses and promotions" },
      { href: "/brokerage-transfer-bonuses", label: "Brokerage transfer bonuses" },
      { href: "/robinhood-transfer-bonus-guide", label: "Robinhood transfer bonus guide" },
      { href: "/brokerage-bonus-calculator", label: "Brokerage bonus calculator" },
    ],
  },
  {
    title: "Bank bonus research",
    links: [
      { href: "/bank-bonuses", label: "Checking and savings bonuses" },
      { href: "/best-bank-bonuses", label: "Best tracked bank bonuses" },
      { href: "/wells-fargo-bonuses", label: "Wells Fargo bonus research" },
      { href: "/bank-bonus-calculator", label: "Bank bonus calculator" },
    ],
  },
  {
    title: "Florida banking pages",
    links: [
      { href: "/best-checking-accounts-florida", label: "Florida checking accounts" },
      { href: "/best-banks-in-florida", label: "Banks in Florida" },
      { href: "/florida-credit-unions", label: "Florida credit unions" },
      { href: "/florida-world-cup-travel-banking-guide", label: "Florida travel banking guide" },
    ],
  },
  {
    title: "Travel money guides",
    links: [
      { href: "/world-cup-travel-money-guide", label: "World Cup travel money guide" },
      { href: "/world-cup-credit-card-offers", label: "World Cup credit card research" },
      { href: "/world-cup-bank-account-travel-checklist", label: "Travel banking checklist" },
      { href: "/travel-fee-calculator", label: "Travel fee calculator" },
    ],
  },
];

export default function WeeklyOfferRadarPage() {
  const offers = getRecentlyVerifiedOffers(6);
  const lastUpdated = getLastUpdated();

  return (
    <div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Weekly OfferRadar", description: "Recently verified offers and priority OfferRadar research paths.", url: "https://offerradar.io/weekly-offer-radar" }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" }, { "@type": "ListItem", position: 2, name: "Weekly OfferRadar", item: "https://offerradar.io/weekly-offer-radar" }] }} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Priority research hub</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Weekly OfferRadar</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">A focused route into recently verified offer records, high-interest banking and brokerage research, Florida comparison pages, travel money guides, and useful calculators.</p>
          <p className="mt-4 text-sm font-bold text-slate-500">Last verified {lastUpdated ? formatDate(lastUpdated) : "review in progress"}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">Recently verified offers</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{offers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div>
      </section>
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          {groups.map((group) => (
            <article key={group.title} className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">{group.title}</h2>
              <div className="mt-5 grid gap-3">
                {group.links.map((link) => <Link key={link.href} href={link.href} className="rounded-xl bg-slate-50 p-4 font-bold text-slate-800 hover:text-blue-800">{link.label}</Link>)}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8"><VerificationMethodology /><DisclosureBlock /></section>
    </div>
  );
}
