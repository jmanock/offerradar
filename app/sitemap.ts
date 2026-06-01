import type { MetadataRoute } from "next";
import { categories, offers, siteUrl } from "@/data/offers";

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
  ];
  const categoryRoutes = categories.map((category) => `/${category.slug}`);
  const offerRoutes = offers.map((offer) => `/offer/${offer.slug}`);

  return [...staticRoutes, ...categoryRoutes, ...offerRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/offer") ? "weekly" : "daily",
    priority: route === "" ? 1 : route.startsWith("/offer") ? 0.7 : 0.8,
  }));
}
