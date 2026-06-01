import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { StatusBadge } from "@/components/StatusBadge";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import {
  formatDate,
  getAllProviders,
  getCategoryBySlug,
  getOfferBySlug,
  getRelatedOffers,
} from "@/lib/offers";
import { offers } from "@/data/offers";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    return {
      title: "Offer not found",
    };
  }

  return {
    title: `${offer.provider} ${offer.offerAmount} tracked offer details`,
    description: `${offer.description} Last reviewed ${formatDate(
      offer.lastVerified,
    )}. Verify current terms directly with the provider.`,
    alternates: { canonical: `/offer/${offer.slug}` },
  };
}

export default async function OfferDetailPage({ params }: Props) {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  const category = getCategoryBySlug(offer.category);
  const relatedOffers = getRelatedOffers(offer);
  const provider = getAllProviders().find(
    (providerInfo) =>
      providerInfo.name.toLowerCase() === offer.provider.toLowerCase(),
  );
  const primaryUrl = offer.referralUrl ?? offer.sourceUrl;

  return (
    <div>
      <AnalyticsEvent
        name="offer_detail_view"
        params={{
          offer_slug: offer.slug,
          provider: offer.provider,
          category: offer.category,
          status: offer.status,
          verification_status: offer.verificationStatus,
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <Link
              href={category ? `/${category.slug}` : "/offers"}
              className="text-sm font-extrabold text-blue-700"
            >
              {category?.title ?? "Offers"}
            </Link>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {offer.title}
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-600">
              {provider ? (
                <Link
                  href={`/provider/${provider.slug}`}
                  className="text-blue-700 hover:text-blue-900"
                >
                  {offer.provider}
                </Link>
              ) : (
                offer.provider
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge status={offer.status} />
              <StatusBadge status={offer.verificationStatus} />
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Offer amount
            </p>
            <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              {offer.offerAmount}
            </p>
            <div className="mt-5 grid gap-3 text-sm">
              <DetailStat label="Offer type" value={offer.offerType} />
              <DetailStat
                label="Last reviewed"
                value={formatDate(offer.lastVerified)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <article className="premium-card rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Summary
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Offer details to compare
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-5 sm:grid-cols-4">
            <DetailStat label="Offer amount" value={offer.offerAmount} />
            <DetailStat label="Category" value={category?.shortTitle ?? "Offer"} />
            <DetailStat label="Offer type" value={offer.offerType} />
            <DetailStat
              label="Last reviewed"
              value={formatDate(offer.lastVerified)}
            />
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-black text-slate-950">Overview</h2>
            <p className="mt-3 leading-7 text-slate-600">{offer.description}</p>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <DetailPanel
              label="Direct deposit"
              value={offer.requiresDirectDeposit ? "May be required" : "Not listed"}
            />
            <DetailPanel
              label="Minimum deposit or spend"
              value={offer.minimumDeposit ?? "Verify with provider"}
            />
            <DetailPanel
              label="Monthly or annual fee"
              value={offer.monthlyFee ?? "Verify with provider"}
            />
            <DetailPanel
              label="Referral code"
              value={offer.referralCode ?? "Not listed"}
            />
          </section>

          <InfoList title="Requirements" items={offer.requirements} />
          {offer.fees?.length ? (
            <InfoList title="Fees and costs to check" items={offer.fees} />
          ) : null}
          {offer.stateRestrictions?.length ? (
            <InfoList
              title="State or availability restrictions"
              items={offer.stateRestrictions}
            />
          ) : null}
          {offer.riskNotes?.length ? (
            <InfoList title="Things to verify" items={offer.riskNotes} />
          ) : null}

          {offer.expirationDate ? (
            <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
                Expiration date
              </h2>
              <p className="mt-2 text-slate-700">
                Listed as {formatDate(offer.expirationDate)}. Terms may change
                or the offer may end earlier, so verify with the provider.
              </p>
            </section>
          ) : null}

          <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
            <h2 className="text-xl font-black">Before you act</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Verify terms directly",
                "Check eligibility",
                "Review fees",
                "Confirm expiration",
                "Keep records",
              ].map((item) => (
                <p key={item} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm font-bold">
                  {item}
                </p>
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-5">
          <div className="premium-card rounded-3xl p-5">
            <h2 className="text-lg font-black text-slate-950">
              Verify before applying
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the provider or referral link as a starting point, then
              compare the live terms, eligibility, fees, and payout timing.
            </p>
            <div className="mt-5 grid gap-3">
              {offer.referralUrl ? (
                <TrackedOutboundLink
                  href={offer.referralUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventParams={{
                    offer_slug: offer.slug,
                    provider: offer.provider,
                    category: offer.category,
                    link_type: "referral",
                  }}
                  className="inline-flex w-full justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
                >
                  Open referral link
                </TrackedOutboundLink>
              ) : null}
              {offer.sourceUrl ? (
                <TrackedOutboundLink
                  href={offer.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventParams={{
                    offer_slug: offer.slug,
                    provider: offer.provider,
                    category: offer.category,
                    link_type: "source",
                  }}
                  className="inline-flex w-full justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                >
                  Open source details
                </TrackedOutboundLink>
              ) : null}
              {!primaryUrl ? (
                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                  Provider terms should be verified directly before acting.
                </p>
              ) : null}
            </div>
          </div>
          <div className="premium-card rounded-3xl p-5">
            <h2 className="text-lg font-black text-slate-950">
              Verification notes
            </h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <TrackingRow
                label="Last reviewed"
                value={formatDate(offer.lastVerified)}
              />
              <TrackingRow
                label="Verification status"
                value={offer.verificationStatus
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (letter) => letter.toUpperCase())}
              />
              {offer.lastChanged ? (
                <TrackingRow
                  label="Last detail change"
                  value={formatDate(offer.lastChanged)}
                />
              ) : null}
            </dl>
          </div>
          <DisclosureBlock compact />
        </aside>
      </div>

      {relatedOffers.length ? (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-950">Related offers</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedOffers.map((relatedOffer) => (
                <OfferCard key={relatedOffer.slug} offer={relatedOffer} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function DetailPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-bold text-slate-950">{value}</p>
    </div>
  );
}

function TrackingRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-slate-700">{value}</dd>
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <ul className="mt-3 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
