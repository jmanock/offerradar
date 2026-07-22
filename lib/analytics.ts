export const GA_MEASUREMENT_ID = "G-M5706CBZ5M";
export const CLARITY_PROJECT_ID = "x29lg7gz7q";

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
  firstPartyEvent("page_view", { page: url ?? (typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "") });
  if (!canTrack() || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url ?? `${window.location.pathname}${window.location.search}`,
  });
}

export function event(name: string, params: AnalyticsParams = {}) {
  firstPartyEvent(name, params);
  if (!canTrack() || !window.gtag) return;

  window.gtag("event", name, params);
}

function firstPartyEvent(name:string,params:AnalyticsParams){
  if(typeof window==="undefined"||process.env.NEXT_PUBLIC_FIRST_PARTY_ANALYTICS_ENABLED!=="true")return;
  const referrer=document.referrer; const source=classifySource(referrer,new URLSearchParams(window.location.search).get("utm_source"));
  const seen=window.localStorage.getItem("offerradar_seen"); window.localStorage.setItem("offerradar_seen","1");
  const affiliateDimension=params.affiliate_id
    ? [params.affiliate_id,params.advertiser,params.placement].filter(Boolean).join("|")
    : "";
  const payload=JSON.stringify({name,source,page:String(params.source_page||params.page||window.location.pathname).slice(0,160),return_state:seen?"returning":"new",dimension:String(affiliateDimension||params.comparison_providers||params.provider||params.network_destination||"").slice(0,160)});
  if(navigator.sendBeacon){navigator.sendBeacon("/api/events",new Blob([payload],{type:"application/json"}));}else{void fetch("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body:payload,keepalive:true});}
}
function classifySource(referrer:string,utm:string|null){if(utm)return `utm:${utm.slice(0,40)}`;if(!referrer)return "direct";try{const host=new URL(referrer).hostname;if(/google\./.test(host))return "google";if(/bing\./.test(host))return "bing";if(/yahoo\.|duckduckgo\./.test(host))return "other_search";if(/offerradar\.io$/.test(host))return "internal";return "referral";}catch{return "unknown";}}

export function offerClick(params: AnalyticsParams = {}) {
  event("offer_click", params);
}

export function compareClick(params: AnalyticsParams = {}) {
  event("compare_click", params);
}

export function leadSubmit(params: AnalyticsParams = {}) {
  event("lead_submit", params);
}

export function newsletterSignup(params: AnalyticsParams = {}) {
  event("newsletter_signup", params);
}

export function cityPageView(params: AnalyticsParams = {}) {
  event("city_page_view", params);
}

// Add future product analytics events here so event names and payload shapes
// stay consistent across pages, cards, outbound links, and comparison tools.
