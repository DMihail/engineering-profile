import type { MetadataRoute } from "next";
import { CV_FILES, SITE_LAST_MODIFIED, SITE_URL } from "@/lib/config";

const lastModified = new Date(SITE_LAST_MODIFIED);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CV_FILES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
