import { formatDate, getCategoryBySlug } from "@/lib/offers";
import type { Offer } from "@/types/offer";
import { ProviderBadge } from "./ProviderBadge";
import { StatusBadge } from "./StatusBadge";
import { TrackedLink } from "./TrackedLink";
import { WatchlistButton } from "./WatchlistButton";

export function OfferCard({ offer }: { offer: Offer }) {
  const category = getCategoryBySlug(offer.category);

  return (
    <article className="premium-card group flex h-full min-h-[390px] flex-col rounded-3xl p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-950/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <ProviderBadge provider={offer.provider} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{offer.provider}</p>
            <h3 className="mt-1 text-lg font-extrabold leading-7 text-slate-950">
            {offer.title}
            </h3>
          </div>
        </div>
        <StatusBadge status={offer.status} />
      </div>
      <div className="mt-5">
        <p className="text-3xl font-black tracking-tight text-slate-950">
          {offer.offerAmount}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {category?.shortTitle}
        </span>
        <StatusBadge status={offer.verificationStatus} />
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
        {offer.description}
      </p>
      <p className="mt-4 rounded-2xl bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">
        Review fees, eligibility, and provider terms before acting.
      </p>
      <div className="mt-5 border-t border-slate-200/70 pt-4">
        <p className="text-xs text-slate-500">
          Last reviewed {formatDate(offer.lastVerified)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <TrackedLink
            href={`/offer/${offer.slug}`}
            eventName="offer_card_click"
            eventParams={{ offer_id: offer.slug, provider: offer.provider, category: offer.category }}
            className="rounded-full bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-800"
          >
            Compare details
          </TrackedLink>
          <WatchlistButton offerId={offer.slug} provider={offer.provider} />
        </div>
      </div>
    </article>
  );
}
