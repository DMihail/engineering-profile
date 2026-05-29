import type { MetadataRoute } from "next";
import { CV_FILES, SITE_LAST_MODIFIED, SITE_URL } from "@/lib/config";

const lastModified = new Date(SITE_LAST_MODIFIED);

/** Indexable HTML + downloadable CV assets only (no API, images, or SW routes). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...CV_FILES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
