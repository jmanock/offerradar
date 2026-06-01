import Link from "next/link";
import { formatDate, getCategoryBySlug } from "@/lib/offers";
import type { Offer } from "@/types/offer";
import { StatusBadge } from "./StatusBadge";

export function OfferCard({ offer }: { offer: Offer }) {
  const category = getCategoryBySlug(offer.category);

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{offer.provider}</p>
          <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-950">
            {offer.title}
          </h3>
        </div>
        <StatusBadge status={offer.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
          {offer.offerAmount}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {category?.shortTitle}
        </span>
        <StatusBadge status={offer.verificationStatus} />
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
        {offer.description}
      </p>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500">
          Last checked {formatDate(offer.lastVerified)}
        </p>
        <Link
          href={`/offer/${offer.slug}`}
          className="text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
