"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProviderBadge } from "@/components/ProviderBadge";
import { event } from "@/lib/analytics";
import { formatDate } from "@/lib/offers";
import { readWatchlist, writeWatchlist, type WatchlistItem } from "@/lib/watchlist";
import type { Offer } from "@/types/offer";

type WatchOffer = Pick<Offer, "slug" | "title" | "provider" | "offerAmount" | "lastVerified" | "status" | "verificationStatus">;

export function WatchlistClient({ offers }: { offers: WatchOffer[] }) {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readWatchlist());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const rows = useMemo(
    () => items.map((item) => ({ item, offer: offers.find((offer) => offer.slug === item.offerId) })).filter((row) => row.offer),
    [items, offers],
  );

  function update(offerId: string, updates: Partial<WatchlistItem>) {
    const next = items.map((item) => item.offerId === offerId ? { ...item, ...updates } : item);
    setItems(next);
    writeWatchlist(next);
  }

  function remove(offerId: string, provider: string) {
    const next = items.filter((item) => item.offerId !== offerId);
    setItems(next);
    writeWatchlist(next);
    event("remove_from_watchlist", { offer_id: offerId, provider, source_page: "/watchlist" });
  }

  if (!ready) {
    return <div className="premium-card rounded-3xl p-6 text-sm text-slate-600">Loading this device&apos;s saved offers…</div>;
  }

  if (!rows.length) {
    return (
      <div className="premium-card rounded-3xl p-8 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-slate-950 text-2xl text-teal-300">◎</div>
        <h2 className="mt-5 text-2xl font-black text-slate-950">Your watchlist is ready</h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">Save an offer from the tracker or an offer card. It will appear here on this device without an account.</p>
        <Link href="/offer-tracker" className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white">Explore tracked offers</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {rows.map(({ item, offer }) => offer && (
        <article key={offer.slug} className="premium-card rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <ProviderBadge provider={offer.provider} size="lg" />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{offer.provider}</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{offer.title}</h2>
                <p className="mt-2 text-2xl font-black text-blue-700">{offer.offerAmount}</p>
                <p className="mt-2 text-xs text-slate-500">Last reviewed {formatDate(offer.lastVerified)} · {offer.verificationStatus.replaceAll("_", " ")}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[440px]">
              <label className="grid gap-1 text-xs font-bold text-slate-600">Target value
                <input value={item.targetValue ?? ""} onChange={(e) => update(offer.slug, { targetValue: e.target.value })} placeholder="e.g. $500" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950" />
              </label>
              <label className="grid gap-1 text-xs font-bold text-slate-600">Private note
                <input value={item.notes ?? ""} onChange={(e) => update(offer.slug, { notes: e.target.value })} placeholder="Stored on this device" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950" />
              </label>
              <div className="flex flex-wrap gap-2 sm:col-span-2 sm:justify-end">
                <Link href={`/offer/${offer.slug}`} className="rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white">View details</Link>
                <button type="button" onClick={() => remove(offer.slug, offer.provider)} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-700">Remove</button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
