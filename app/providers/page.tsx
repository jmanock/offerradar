import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { getAllProviders, getOffersByProvider } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offer Providers",
  description:
    "Browse OfferRadar provider pages for example bonuses, referral offers, card offers, and verification reminders.",
  alternates: { canonical: "/providers" },
};

export default function ProvidersPage() {
  const providers = getAllProviders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Provider directory
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Providers tracked by OfferRadar
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Provider pages group local example offers with common offer types,
          verification reminders, and links into related categories. Always
          verify current terms directly with the provider.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => (
          <Link
            key={provider.slug}
            href={`/provider/${provider.slug}`}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {provider.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {provider.categoryFocus}
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {getOffersByProvider(provider.name).length} offers
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {provider.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <DisclosureBlock />
      </div>
    </div>
  );
}
