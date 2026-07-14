"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ProviderBadge } from "@/components/ProviderBadge";
import { WatchlistButton } from "@/components/WatchlistButton";
import { event } from "@/lib/analytics";
import { formatDate } from "@/lib/offers";
import type { Offer } from "@/types/offer";

type TrackerOffer = Pick<
  Offer,
  | "slug"
  | "title"
  | "provider"
  | "category"
  | "offerAmount"
  | "lastVerified"
  | "status"
  | "verificationStatus"
  | "stateRestrictions"
  | "offerType"
  | "lastChanged"
>;

export function OfferTrackerClient({ offers }: { offers: TrackerOffer[] }) {
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("all");
  const [verification, setVerification] = useState("all");
  const [amount, setAmount] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [status, setStatus] = useState("all");
  const [offerType, setOfferType] = useState("all");
  const [sort, setSort] = useState("reviewed");

  const providers = useMemo(
    () => Array.from(new Set(offers.map((offer) => offer.provider))).sort(),
    [offers],
  );
  const offerTypes = useMemo(() => Array.from(new Set(offers.map((offer) => offer.offerType))).sort(), [offers]);

  const filtered = useMemo(() => {
    return offers.filter((offer) => {
      if (category !== "all" && offer.category !== category) {
        return false;
      }

      if (provider !== "all" && offer.provider !== provider) {
        return false;
      }

      if (verification !== "all" && offer.verificationStatus !== verification) {
        return false;
      }

      if (status !== "all" && offer.status !== status) return false;
      if (offerType !== "all" && offer.offerType !== offerType) return false;

      if (amount !== "all") {
        const value = numericValue(offer.offerAmount);
        if (amount === "listed" && value <= 0) {
          return false;
        }
        if (amount === "500-plus" && value < 500) {
          return false;
        }
      }

      if (availability === "florida") {
        return offer.stateRestrictions?.includes("Florida");
      }

      if (availability === "national") {
        return !offer.stateRestrictions?.length || offer.stateRestrictions.includes("National");
      }

      return true;
    }).sort((a, b) => {
      if (sort === "value") return numericValue(b.offerAmount) - numericValue(a.offerAmount);
      if (sort === "provider") return a.provider.localeCompare(b.provider);
      if (sort === "changed") return (b.lastChanged ?? "").localeCompare(a.lastChanged ?? "");
      return b.lastVerified.localeCompare(a.lastVerified);
    });
  }, [amount, availability, category, offerType, offers, provider, sort, status, verification]);

  const trackFilter = (name: string, value: string, setter: (value: string) => void) => {
    setter(value);
    event("filter_used", { filter_name: name, filter_value: value, source_page: "/offer-tracker" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="premium-card h-fit rounded-3xl p-6">
        <h2 className="text-xl font-black text-slate-950">Filter tracker</h2>
        <div className="mt-5 grid gap-4">
          <Select label="Category" value={category} onChange={(value) => trackFilter("category", value, setCategory)}>
            <option value="all">All categories</option>
            <option value="bank-bonuses">Bank bonuses</option>
            <option value="brokerage-bonuses">Brokerage bonuses</option>
            <option value="referral-offers">Referral offers</option>
            <option value="high-yield-savings">High-yield savings</option>
            <option value="business-banking">Business banking</option>
          </Select>
          <Select label="Provider" value={provider} onChange={(value) => trackFilter("provider", value, setProvider)}>
            <option value="all">All providers</option>
            {providers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <Select label="Status" value={status} onChange={(value) => trackFilter("status", value, setStatus)}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="watching">Watching</option>
            <option value="expired">Expired</option>
          </Select>
          <Select label="Offer type" value={offerType} onChange={(value) => trackFilter("offer_type", value, setOfferType)}>
            <option value="all">All offer types</option>
            {offerTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </Select>
          <Select label="Verification freshness" value={verification} onChange={(value) => trackFilter("verification", value, setVerification)}>
            <option value="all">All statuses</option>
            <option value="verified_today">Verified today</option>
            <option value="verified_this_week">Verified this week</option>
            <option value="needs_review">Needs review</option>
            <option value="expired">Expired</option>
          </Select>
          <Select label="Bonus amount" value={amount} onChange={(value) => trackFilter("amount", value, setAmount)}>
            <option value="all">All amounts</option>
            <option value="listed">Listed amount</option>
            <option value="500-plus">$500+ listed</option>
          </Select>
          <Select label="State / national" value={availability} onChange={(value) => trackFilter("availability", value, setAvailability)}>
            <option value="all">All availability</option>
            <option value="florida">Florida noted</option>
            <option value="national">National or unspecified</option>
          </Select>
          <Select label="Sort by" value={sort} onChange={(value) => trackFilter("sort", value, setSort)}>
            <option value="reviewed">Recently reviewed</option>
            <option value="value">Largest tracked value</option>
            <option value="provider">Provider name</option>
            <option value="changed">Recently changed</option>
          </Select>
        </div>
      </aside>
      <section>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {filtered.length} tracked records
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Filters refine the current OfferRadar data set. Verify current
              terms directly with each provider.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filtered.map((offer) => (
            <article key={offer.slug} className="premium-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <ProviderBadge provider={offer.provider} />
                  <div><p className="text-sm font-extrabold text-slate-950">{offer.provider}</p>
                  <h3 className="mt-2 text-lg font-black text-slate-950">
                    {offer.title}
                  </h3>
                  </div>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                  {offer.status}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <p>
                  <span className="font-bold text-slate-900">Amount:</span>{" "}
                  {offer.offerAmount}
                </p>
                <p>
                  <span className="font-bold text-slate-900">Category:</span>{" "}
                  {offer.category}
                </p>
                <p>
                  <span className="font-bold text-slate-900">Last verified:</span>{" "}
                  {formatDate(offer.lastVerified)}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                <Link href={`/offer/${offer.slug}`} onClick={() => event("offer_card_click", { offer_id: offer.slug, provider: offer.provider, source_page: "/offer-tracker" })} className="rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white">View details</Link>
                <WatchlistButton offerId={offer.slug} provider={offer.provider} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-950"
      >
        {children}
      </select>
    </label>
  );
}

function numericValue(value: string) {
  const match = value.replaceAll(",", "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}
