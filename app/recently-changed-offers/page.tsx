import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { AlertSubscribeForm } from "@/components/AlertSubscribeForm";
import { ChangeFeedClient, type PublicChangeEntry } from "@/components/ChangeFeedClient";
import { JsonLd } from "@/components/JsonLd";
import { getApprovedChanges } from "@/lib/changeQueue";
import { getAllOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Recently Changed and Reviewed Offers",
  description: "Filter editorially approved offer changes and recent verification activity without fabricated trends.",
  alternates: { canonical: "/recently-changed-offers" },
};

export default async function RecentlyChangedPage() {
  await connection();
  const approved = await getApprovedChanges();
  const approvedEntries: PublicChangeEntry[] = approved.map((change) => ({
    id: change.id, offerId: change.offerId, provider: change.provider, title: change.title,
    currentValue: change.currentObservedValue, previousValue: change.previousObservedValue,
    observedAt: change.approvedAt, changeType: change.changeType,
    summary: change.reviewerNote || `Editorial review approved this ${change.changeType.replace("-", " ")} observation.`,
  }));
  const reviewedEntries: PublicChangeEntry[] = getAllOffers()
    .filter((offer) => !approved.some((change) => change.offerId === offer.slug))
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified)).slice(0, 24)
    .map((offer) => ({
      id: `verified-${offer.slug}-${offer.lastVerified}`, offerId: offer.slug, provider: offer.provider,
      title: offer.title, currentValue: offer.offerAmount, observedAt: offer.lastVerified,
      changeType: offer.verificationStatus === "needs_review" ? "needs-review" : "verified",
      summary: offer.verificationStatus === "needs_review" ? "This record needs a fresh provider review." : "Offer record reviewed. No approved value change is recorded.",
    }));
  const entries = [...approvedEntries, ...reviewedEntries].sort((a, b) => b.observedAt.localeCompare(a.observedAt));
  const today = new Date().toISOString().slice(0, 10);

  return <div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Recently changed and reviewed offers", url: "https://offerradar.io/recently-changed-offers", mainEntity: { "@type": "ItemList", itemListElement: entries.slice(0, 20).map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.title, url: `https://offerradar.io/offer/${entry.offerId}` })) } }} />
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_36%,#f6f8fb_75%)]">
      <div className="radar-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-500"><Link href="/">Home</Link> / Recently changed</nav>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-wide text-teal-700">The reviewed change feed</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Recently changed offers</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Detected differences enter a private editorial queue first. Only approved observations appear as increases, decreases, new, expired, or reactivated offers.</p>
        <div className="mt-6 grid max-w-2xl grid-cols-3 gap-3"><Stat label="Approved changes" value={approved.length} /><Stat label="Recent reviews" value={reviewedEntries.length} /><Stat label="Auto-published" value={0} /></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><ChangeFeedClient entries={entries} today={today} /></section>
    <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_.8fr] lg:px-8"><div><p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Return loop</p><h2 className="mt-3 text-3xl font-black">Follow the reviewed feed</h2><p className="mt-3 leading-7 text-slate-600">Choose immediate delivery after approval or a weekly digest. Scraper detections never trigger public alerts on their own.</p></div><div className="premium-card rounded-3xl p-6"><AlertSubscribeForm scopeType="provider" scopeId="all-offers" scopeLabel="all tracked offers" compact /></div></div></section>
  </div>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white bg-white/75 p-4"><p className="text-2xl font-black text-slate-950">{value}</p><p className="mt-1 text-xs font-bold text-slate-500">{label}</p></div>;
}
