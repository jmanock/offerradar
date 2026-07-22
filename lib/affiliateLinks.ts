import { affiliateLinks, type AffiliateEntry } from "@/data/affiliateLinks";

const requiredAwinParams = ["gid", "mid", "awinaffid", "linkid"];

export type AffiliateValidation = {
  valid: boolean;
  errors: string[];
};

export type ResolvedAffiliateLink = {
  entry: AffiliateEntry;
  href: string;
  clickref: string;
  linkType: "affiliate" | "official";
};

export function getAffiliateEntry(id: string) {
  return affiliateLinks.find((entry) => entry.id === id);
}

export function validateAffiliateEntry(entry: AffiliateEntry): AffiliateValidation {
  const errors: string[] = [];

  if (!entry.id || !/^[a-z0-9-]+$/.test(entry.id)) errors.push("Invalid registry ID.");
  if (!entry.advertiser.trim()) errors.push("Advertiser is required.");
  if (!entry.allowedRoutes.length) errors.push("At least one allowed route is required.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastVerified)) errors.push("lastVerified must use YYYY-MM-DD.");

  try {
    const url = new URL(entry.affiliateUrl);
    if (url.protocol !== "https:") errors.push("Affiliate URL must use HTTPS.");
    if (url.hostname !== "www.awin1.com" || url.pathname !== "/awclick.php") {
      errors.push("Affiliate URL must use the approved Awin click endpoint.");
    }
    for (const parameter of requiredAwinParams) {
      if (!url.searchParams.get(parameter)) errors.push(`Missing Awin parameter: ${parameter}.`);
    }
  } catch {
    errors.push("Affiliate URL is malformed.");
  }

  if (entry.officialUrl) {
    try {
      if (new URL(entry.officialUrl).protocol !== "https:") errors.push("Official URL must use HTTPS.");
    } catch {
      errors.push("Official URL is malformed.");
    }
  }

  return { valid: errors.length === 0, errors };
}

export function isRouteAllowed(entry: AffiliateEntry, pagePath: string) {
  const route = normalizeRoute(pagePath);
  const prohibited = entry.prohibitedRoutes.some((candidate) => routeMatches(route, candidate));
  const allowed = entry.allowedRoutes.some((candidate) => routeMatches(route, candidate));
  return allowed && !prohibited;
}

export function createAffiliateClickref(pagePath: string, placementId: string) {
  const pageKey = normalizeRoute(pagePath).replace(/^\//, "").replaceAll("/", "-") || "home";
  const placementKey = sanitizeKey(placementId || "link");
  return `offerradar-${sanitizeKey(pageKey)}-${placementKey}`.slice(0, 80).replace(/-+$/g, "");
}

export function resolveAffiliateLink(
  affiliateId: string,
  pagePath: string,
  placementId: string,
): ResolvedAffiliateLink | undefined {
  const entry = getAffiliateEntry(affiliateId);
  if (!entry || !isRouteAllowed(entry, pagePath)) return undefined;

  const validation = validateAffiliateEntry(entry);
  const affiliateReady = entry.approved && entry.status === "active" && validation.valid;
  const clickref = createAffiliateClickref(pagePath, placementId);

  if (affiliateReady) {
    const url = new URL(entry.affiliateUrl);
    url.searchParams.set("clickref", clickref);
    return { entry, href: url.toString(), clickref, linkType: "affiliate" };
  }

  if (entry.officialUrl) {
    return { entry, href: entry.officialUrl, clickref: "", linkType: "official" };
  }

  return undefined;
}

export function getActiveAffiliateEntriesForRoute(pagePath: string) {
  return affiliateLinks.filter(
    (entry) =>
      entry.approved &&
      entry.status === "active" &&
      validateAffiliateEntry(entry).valid &&
      isRouteAllowed(entry, pagePath),
  );
}

function normalizeRoute(value: string) {
  const route = value.trim().split(/[?#]/, 1)[0] || "/";
  return route === "/" ? route : route.replace(/\/$/, "");
}

function routeMatches(route: string, candidate: string) {
  const normalizedCandidate = normalizeRoute(candidate);
  return route === normalizedCandidate || route.startsWith(`${normalizedCandidate}/`);
}

function sanitizeKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "link";
}
