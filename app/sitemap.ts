import type { MetadataRoute } from "next";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/config";

const lastModified = new Date(SITE_LAST_MODIFIED);

/**
 * Indexable HTML only.
 * PDF CVs stay downloadable from the site but are omitted here and sent with
 * X-Robots-Tag: noindex so `/resume` remains the canonical resume URL.
 */
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
  ];
}
