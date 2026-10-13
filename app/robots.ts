import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { CV_FILES } from "@/lib/content/cv";

const API_DISALLOW = ["/api/"];

function sharedDisallow(): string[] {
  return [...API_DISALLOW, ...CV_FILES];
}

/**
 * Index HTML; block APIs and PDF CVs. AI crawlers inherit `*` — keep
 * `/llms.txt` and `/llms-full.txt` crawlable for recruiter agents.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: sharedDisallow() },
      { userAgent: "Yandex", allow: "/", disallow: sharedDisallow() },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
