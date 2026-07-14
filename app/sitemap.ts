import type { MetadataRoute } from "next";
import { categories, siteUrl } from "@/data/offers";
import { getAllProviderComparisonPages } from "@/data/comparisonPages";
import { guidePages } from "@/data/guidePages";
import { localSeoPages } from "@/data/localSeo";
import { offerTypePages } from "@/data/offerTypePages";
import { providers } from "@/data/providers";
import { statePages } from "@/data/statePages";
import { offers } from "@/lib/offerData";
import { authorityPages } from "@/data/authorityPages";
import { researchArticles } from "@/data/researchArticles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/offers",
    "/offer-tracker",
    "/offer-history",
    "/recently-changed-offers",
    "/watchlist",
    "/research",
    "/money",
    "/travel",
    "/florida",
    "/banking-finder",
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
    "/compare",
    "/weekly-offer-radar",
    "/bank-bonus-calculator",
    "/brokerage-bonus-calculator",
    "/travel-fee-calculator",
  ];
  const categoryRoutes = categories.map((category) => `/${category.slug}`);
  const offerRoutes = offers.map((offer) => `/offer/${offer.slug}`);
  const providerRoutes = providers.map((provider) => `/provider/${provider.slug}`);
  const comparisonRoutes = getAllProviderComparisonPages().map((page) => `/compare/${page.slug}`);
  const guideRoutes = guidePages.map((page) => `/guides/${page.slug}`);
  const offerTypeRoutes = offerTypePages.map((page) => `/${page.slug}`);
  const stateRoutes = statePages.map((page) => `/${page.slug}`);
  const localSeoRoutes = localSeoPages.map((page) => `/${page.slug}`);
  const authorityRoutes = authorityPages.map((page) => `/${page.slug}`);
  const researchRoutes = researchArticles.map((article) => `/research/${article.slug}`);

  const routes = [
    ...staticRoutes,
    ...categoryRoutes,
    ...offerRoutes,
    ...providerRoutes,
    ...comparisonRoutes,
    ...guideRoutes,
    ...offerTypeRoutes,
    ...stateRoutes,
    ...localSeoRoutes,
    ...authorityRoutes,
    ...researchRoutes,
  ].filter((route, index, allRoutes) => allRoutes.indexOf(route) === index);

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/offer") ? "weekly" : "daily",
    priority: route === "" ? 1 : route.startsWith("/offer") ? 0.7 : 0.8,
  }));
}
