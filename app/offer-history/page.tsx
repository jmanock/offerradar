import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HowOfferRadarWorks } from "@/components/HowOfferRadarWorks";
import { JsonLd } from "@/components/JsonLd";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { HistorySparkline } from "@/components/HistorySparkline";
import { offerHistoryRecords } from "@/data/offerHistory";
import { getApprovedChanges } from "@/lib/changeQueue";
import { formatDate, getAllOffers, getRecentlyVerifiedOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offer History | Tracked Offer Changes Foundation",
  description:
    "Learn how OfferRadar is building offer history tracking and review current tracked offer records without inventing past changes.",
  alternates: { canonical: "/offer-history" },
};

export default async function OfferHistoryPage() {
  const offers = getAllOffers().slice(0, 12);
  const recent = getRecentlyVerifiedOffers(8);
  const approvedChanges = await getApprovedChanges();

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Offer history",
          url: "https://offerradar.io/offer-history",
          description: metadata.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" },
            { "@type": "ListItem", position: 2, name: "Offer History", item: "https://offerradar.io/offer-history" },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Tracking foundation
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Offer history
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            OfferRadar is building a tracked history system for offer changes
            over time. Full historical change records are not available yet, so
            this page shows reviewed offer records and explains what future
            history tracking will cover.
          </p>
          <p className="mt-4 text-sm font-bold text-slate-500">
            No invented past changes · Current records only
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          {
            title: "How offer tracking works",
            body: "OfferRadar stores structured offer records with provider, amount, status, verification date, requirements, and source fields where available.",
          },
          {
            title: "Why offers change",
            body: "Providers may change eligibility, amounts, expiration dates, fees, campaign pages, account names, or payout timing.",
          },
          {
            title: "What users should verify",
            body: "Verify current availability, account terms, fees, deposit requirements, source pages, and eligibility directly before acting.",
          },
        ].map((item) => (
          <article key={item.title} className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"><div className="premium-card rounded-3xl p-6"><h2 className="text-2xl font-black">Approved observation chart</h2><p className="mt-2 mb-5 text-sm text-slate-600">Only editorially approved values can appear in this visualization.</p><HistorySparkline changes={approvedChanges} label="OfferRadar" /></div></section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">Current history foundation</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-600">
            These records mirror current tracked offers and their observed
            review dates. A previous amount appears only when a real historical
            value exists in the data.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[920px] w-full text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  {["Provider", "Current value", "Previous value", "First observed", "Last verified", "Change type", "Notes"].map((heading) => (
                    <th key={heading} className="px-4 py-3">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {offerHistoryRecords.map((record) => (
                  <tr key={record.offerId} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-extrabold text-slate-950">
                      <Link href={`/offer/${record.offerId}`} className="text-blue-700">
                        {record.provider}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-slate-700">{record.observedValue}</td>
                    <td className="px-4 py-4 text-slate-700">{record.previousObservedValue ?? "OfferRadar has not collected enough historical observations for a trend yet."}</td>
                    <td className="px-4 py-4 text-slate-700">{formatDate(record.firstSeen)}</td>
                    <td className="px-4 py-4 text-slate-700">{formatDate(record.lastVerified)}</td>
                    <td className="px-4 py-4 text-slate-700">{record.changeType}</td>
                    <td className="px-4 py-4 text-slate-700">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <QuickList title="Recently reviewed offers" offers={recent} />
        <QuickList title="Current tracked offers" offers={offers} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
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
  offers: ReturnType<typeof getAllOffers>;
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {offers.map((offer) => (
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
        ))}
      </div>
    </section>
  );
}
