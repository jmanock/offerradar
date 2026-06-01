export const GA_MEASUREMENT_ID = "G-M5706CBZ5M";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function canTrack() {
  return process.env.NODE_ENV === "production" && typeof window !== "undefined";
}

export function pageview(url?: string) {
  if (!canTrack() || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url ?? `${window.location.pathname}${window.location.search}`,
  });
}

export function event(name: string, params: AnalyticsParams = {}) {
  if (!canTrack() || !window.gtag) {
    return;
  }

  window.gtag("event", name, params);
}

// Add future product analytics events here so event names and payload shapes
// stay consistent across pages, cards, outbound links, and comparison tools.
