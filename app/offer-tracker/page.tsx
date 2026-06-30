import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HowOfferRadarWorks } from "@/components/HowOfferRadarWorks";
import { JsonLd } from "@/components/JsonLd";
import { OfferTrackerClient } from "@/components/OfferTrackerClient";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { getAllOffers, getRecentlyVerifiedOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offer Tracker Dashboard | Banking and Brokerage Offers",
  description:
    "Filter tracked banking, brokerage, referral, Florida, and recently reviewed offer records by category, provider, verification status, amount, and availability.",
  alternates: { canonical: "/offer-tracker" },
};

export default function OfferTrackerPage() {
  const offers = getAllOffers();
  const recent = getRecentlyVerifiedOffers(6);
  const needsReview = offers.filter((offer) => offer.verificationStatus === "needs_review").slice(0, 6);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "OfferRadar Offer Tracker",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          url: "https://offerradar.io/offer-tracker",
          description: metadata.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Offer tracker dashboard",
          url: "https://offerradar.io/offer-tracker",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: offers.slice(0, 20).map((offer, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: offer.title,
              url: `https://offerradar.io/offer/${offer.slug}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" },
            { "@type": "ListItem", position: 2, name: "Offer Tracker", item: "https://offerradar.io/offer-tracker" },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Product dashboard
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Offer tracker dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Filter tracked offer records by category, provider, verification
            status, listed amount, and availability. OfferRadar shows research
            records; provider terms control eligibility and availability.
          </p>
          <p className="mt-4 text-sm font-bold text-slate-500">
            {offers.length} tracked records · Verification dates shown where available
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Bank bonuses", offers.filter((offer) => offer.category === "bank-bonuses").length],
            ["Brokerage bonuses", offers.filter((offer) => offer.category === "brokerage-bonuses").length],
            ["Referral offers", offers.filter((offer) => offer.category === "referral-offers").length],
            ["Florida noted", offers.filter((offer) => offer.stateRestrictions?.includes("Florida")).length],
            ["Needs review", offers.filter((offer) => offer.verificationStatus === "needs_review").length],
          ].map(([label, value]) => (
            <div key={label} className="premium-card rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
            </div>
          ))}
        </div>
        <OfferTrackerClient offers={offers} />
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <QuickList title="Recently reviewed" offers={recent} />
          <QuickList title="Needs review" offers={needsReview} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <HowOfferRadarWorks />
        <DisclosureBlock />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <VerificationMethodology />
      </section>
    </div>
  );
}

function QuickList({
  title,
  offers,
}: {
  title: string;
  offers: ReturnType<typeof getRecentlyVerifiedOffers>;
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {offers.length ? (
          offers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/offer/${offer.slug}`}
              className="rounded-2xl bg-slate-50 p-4 transition hover:bg-white"
            >
              <span className="block font-extrabold text-slate-950">
                {offer.provider}
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                {offer.title}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-sm leading-6 text-slate-600">
            No records currently match this status.
          </p>
        )}
      </div>
    </section>
  );
}
