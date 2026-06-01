import type { MetadataRoute } from "next";
import { categories, offers, siteUrl } from "@/data/offers";
import { offerTypePages } from "@/data/offerTypePages";
import { providers } from "@/data/providers";
import { statePages } from "@/data/statePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/offers",
    "/about",
    "/disclosures",
    "/editorial-policy",
    "/best-bank-bonuses",
    "/best-brokerage-bonuses",
    "/best-referral-bonuses",
    "/providers",
  ];
  const categoryRoutes = categories.map((category) => `/${category.slug}`);
  const offerRoutes = offers.map((offer) => `/offer/${offer.slug}`);
  const providerRoutes = providers.map((provider) => `/provider/${provider.slug}`);
  const offerTypeRoutes = offerTypePages.map((page) => `/${page.slug}`);
  const stateRoutes = statePages.map((page) => `/${page.slug}`);

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...offerRoutes,
    ...providerRoutes,
    ...offerTypeRoutes,
    ...stateRoutes,
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/offer") ? "weekly" : "daily",
    priority: route === "" ? 1 : route.startsWith("/offer") ? 0.7 : 0.8,
  }));
}
