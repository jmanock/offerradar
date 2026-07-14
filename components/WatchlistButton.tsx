"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/analytics";
import { readWatchlist, writeWatchlist } from "@/lib/watchlist";

export function WatchlistButton({ offerId, provider }: { offerId: string; provider: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => setSaved(readWatchlist().some((item) => item.offerId === offerId));
    refresh();
    window.addEventListener("offerradar:watchlist", refresh);
    return () => window.removeEventListener("offerradar:watchlist", refresh);
  }, [offerId]);

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => {
        const current = readWatchlist();
        const next = saved
          ? current.filter((item) => item.offerId !== offerId)
          : [...current, { offerId, savedAt: new Date().toISOString() }];
        writeWatchlist(next);
        event(saved ? "remove_from_watchlist" : "save_to_watchlist", {
          offer_id: offerId,
          provider,
        });
        setSaved(!saved);
      }}
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-extrabold transition ${
        saved
          ? "border-teal-300 bg-teal-50 text-teal-800"
          : "border-slate-300 bg-white text-slate-800 hover:border-blue-300"
      }`}
    >
      {saved ? "Saved" : "Save offer"}
    </button>
  );
}
