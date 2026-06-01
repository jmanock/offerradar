import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { OfferCard } from "@/components/OfferCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  formatDate,
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
    title: `${offer.provider} ${offer.offerAmount} Example Offer`,
    description: `${offer.description} Last checked ${formatDate(
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
  const primaryUrl = offer.referralUrl ?? offer.sourceUrl;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <Link
                href={category ? `/${category.slug}` : "/offers"}
                className="text-sm font-semibold text-blue-700"
              >
                {category?.title ?? "Offers"}
              </Link>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {offer.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-slate-600">
                {offer.provider}
              </p>
            </div>
            <StatusBadge status={offer.status} />
          </div>

          <div className="mt-8 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-3">
            <DetailStat label="Offer amount" value={offer.offerAmount} />
            <DetailStat label="Offer type" value={offer.offerType} />
            <DetailStat
              label="Last checked"
              value={formatDate(offer.lastVerified)}
            />
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-950">Overview</h2>
            <p className="mt-3 leading-7 text-slate-600">{offer.description}</p>
          </section>

          <InfoList title="Requirements" items={offer.requirements} />
          {offer.fees?.length ? (
            <InfoList title="Fees and costs to check" items={offer.fees} />
          ) : null}
          {offer.riskNotes?.length ? (
            <InfoList title="Things to verify" items={offer.riskNotes} />
          ) : null}

          {offer.expirationDate ? (
            <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
                Expiration date
              </h2>
              <p className="mt-2 text-slate-700">
                Listed as {formatDate(offer.expirationDate)}. Terms may change
                or the offer may end earlier, so verify with the provider.
              </p>
            </section>
          ) : null}
        </article>

        <aside className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950">
              Verify before applying
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the provider or referral link as a starting point, then
              compare the live terms, eligibility, fees, and payout timing.
            </p>
            {primaryUrl ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Open provider details
              </a>
            ) : null}
          </div>
          <DisclosureBlock compact />
        </aside>
      </div>

      {relatedOffers.length ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-950">Related offers</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedOffers.map((relatedOffer) => (
              <OfferCard key={relatedOffer.slug} offer={relatedOffer} />
            ))}
          </div>
        </section>
      ) : null}
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

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <ul className="mt-3 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-slate-50 p-4 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
