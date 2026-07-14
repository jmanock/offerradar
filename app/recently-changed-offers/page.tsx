import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProviderBadge } from "@/components/ProviderBadge";
import { WatchlistButton } from "@/components/WatchlistButton";
import { formatDate, getAllOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Recently Changed and Reviewed Offers",
  description: "See genuine OfferRadar verification activity, needs-review records, and recorded offer changes without fabricated trends.",
  alternates: { canonical: "/recently-changed-offers" },
};

export default function RecentlyChangedPage() {
  const offers = getAllOffers().sort((a, b) => (b.lastChanged ?? b.lastVerified).localeCompare(a.lastChanged ?? a.lastVerified));
  return (
    <div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Recently changed and reviewed offers", url: "https://offerradar.io/recently-changed-offers", mainEntity: { "@type": "ItemList", itemListElement: offers.slice(0, 20).map((offer, index) => ({ "@type": "ListItem", position: index + 1, name: offer.title, url: `https://offerradar.io/offer/${offer.slug}` })) } }} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_36%,#f6f8fb_75%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-500"><Link href="/">Home</Link> / Recently changed</nav>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-wide text-teal-700">Verification feed</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Recently changed and reviewed</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">A transparent feed of recent review activity. OfferRadar only labels an increase, decrease, or new offer when a stored observation supports it. The current change report records no such changes.</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800">Recently reviewed</span><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">Needs review</span><span className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">No fabricated deltas</span></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {offers.slice(0, 20).map((offer) => {
            const needsReview = offer.verificationStatus === "needs_review";
            const label = needsReview ? "Needs review" : offer.status === "expired" ? "Expired" : "Recently reviewed";
            return <article key={offer.slug} className="premium-card rounded-3xl p-5">
              <div className="flex items-start gap-4"><ProviderBadge provider={offer.provider} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{offer.provider}</p><span className={`rounded-full px-3 py-1 text-xs font-bold ${needsReview ? "bg-amber-50 text-amber-800" : "bg-teal-50 text-teal-800"}`}>{label}</span></div><h2 className="mt-2 text-lg font-black text-slate-950">{offer.title}</h2><p className="mt-2 text-2xl font-black text-blue-700">{offer.offerAmount}</p></div></div>
              <div className="mt-4 border-l-2 border-teal-300 pl-4"><p className="text-sm font-bold text-slate-800">Observed {formatDate(offer.lastChanged ?? offer.lastVerified)}</p><p className="mt-1 text-sm leading-6 text-slate-600">{offer.changeSummary || "Review recorded. No prior value is available for a trend comparison."}</p></div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4"><Link href={`/offer/${offer.slug}`} className="rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white">View offer</Link><WatchlistButton offerId={offer.slug} provider={offer.provider} /></div>
            </article>;
          })}
        </div>
      </section>
    </div>
  );
}
