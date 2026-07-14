export const WATCHLIST_KEY = "offerradar-watchlist-v1";

export type WatchlistItem = {
  offerId: string;
  targetValue?: string;
  notes?: string;
  savedAt: string;
};

export function readWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(WATCHLIST_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function writeWatchlist(items: WatchlistItem[]) {
  window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("offerradar:watchlist"));
}
