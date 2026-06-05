import { getAllProviderComparisonPages } from "@/data/comparisonPages";
import { guidePages } from "@/data/guidePages";
import { localSeoPages } from "@/data/localSeo";
import { offerTypePages } from "@/data/offerTypePages";
import { categories, siteUrl } from "@/data/offers";
import { providers } from "@/data/providers";
import { statePages } from "@/data/statePages";
import { offers } from "@/lib/offerData";

const staticRoutes = [
  "",
  "/offers",
  "/about",
  "/disclosures",
  "/editorial-policy",
  "/advertising-disclosure",
  "/privacy-policy",
  "/terms-of-use",
  "/contact",
  "/best-bank-bonuses",
  "/best-brokerage-bonuses",
  "/best-referral-bonuses",
  "/providers",
  "/ops",
  "/ops/content-gaps",
  "/ops/monetization",
  "/ops/analytics",
  "/ops/seo",
];

export function getSiteStats() {
  const comparisons = getAllProviderComparisonPages();

  return {
    siteUrl,
    sitemapUrl: `${siteUrl}/sitemap.xml`,
    robotsUrl: `${siteUrl}/robots.txt`,
    staticRouteCount: staticRoutes.length,
    categoryCount: categories.length,
    offerCount: offers.length,
    providerCount: providers.length,
    comparisonCount: comparisons.length,
    guideCount: guidePages.length,
    offerTypePageCount: offerTypePages.length,
    statePageCount: statePages.length,
    localSeoPageCount: localSeoPages.length,
    estimatedPublicPageCount:
      staticRoutes.length +
      categories.length +
      offers.length +
      providers.length +
      comparisons.length +
      guidePages.length +
      offerTypePages.length +
      statePages.length +
      localSeoPages.length,
  };
}
