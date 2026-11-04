import type { MetadataRoute } from "next";
import { brands } from "@/content/brands";
import { site } from "@/content/site";

/** Standalone routes, highest priority first. The homepage is handled separately. */
const pages = ["/about", "/industries", "/community", "/news", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...brands.map((b) => ({
      url: `${site.url}/brands/${b.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
