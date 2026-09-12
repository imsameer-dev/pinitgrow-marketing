import type { MetadataRoute } from "next";
import { featurePages } from "@/lib/feature-pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/features",
    "/pricing",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund",
    "/affiliate",
    ...featurePages.map((page) => `/features/${page.slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-09-11"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/features/") ? 0.8 : 0.7,
  }));
}
