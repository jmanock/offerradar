"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
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
>;

export function OfferTrackerClient({ offers }: { offers: TrackerOffer[] }) {
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("all");
  const [verification, setVerification] = useState("all");
  const [amount, setAmount] = useState("all");
  const [availability, setAvailability] = useState("all");

  const providers = useMemo(
    () => Array.from(new Set(offers.map((offer) => offer.provider))).sort(),
    [offers],
  );

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
    });
  }, [amount, availability, category, offers, provider, verification]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="premium-card h-fit rounded-3xl p-6">
        <h2 className="text-xl font-black text-slate-950">Filter tracker</h2>
        <div className="mt-5 grid gap-4">
          <Select label="Category" value={category} onChange={setCategory}>
            <option value="all">All categories</option>
            <option value="bank-bonuses">Bank bonuses</option>
            <option value="brokerage-bonuses">Brokerage bonuses</option>
            <option value="referral-offers">Referral offers</option>
            <option value="high-yield-savings">High-yield savings</option>
            <option value="business-banking">Business banking</option>
          </Select>
          <Select label="Provider" value={provider} onChange={setProvider}>
            <option value="all">All providers</option>
            {providers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <Select label="Verification status" value={verification} onChange={setVerification}>
            <option value="all">All statuses</option>
            <option value="verified_today">Verified today</option>
            <option value="verified_this_week">Verified this week</option>
            <option value="needs_review">Needs review</option>
            <option value="expired">Expired</option>
          </Select>
          <Select label="Bonus amount" value={amount} onChange={setAmount}>
            <option value="all">All amounts</option>
            <option value="listed">Listed amount</option>
            <option value="500-plus">$500+ listed</option>
          </Select>
          <Select label="State / national" value={availability} onChange={setAvailability}>
            <option value="all">All availability</option>
            <option value="florida">Florida noted</option>
            <option value="national">National or unspecified</option>
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
            <Link
              key={offer.slug}
              href={`/offer/${offer.slug}`}
              className="premium-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold text-slate-950">
                    {offer.provider}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-slate-950">
                    {offer.title}
                  </h3>
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
            </Link>
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
