import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const API_DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Googlebot", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Yandex", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Bingbot", allow: "/", disallow: API_DISALLOW },
      { userAgent: "DuckDuckBot", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Baiduspider", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Yeti", allow: "/", disallow: API_DISALLOW },
      { userAgent: "facebookexternalhit", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Twitterbot", allow: "/", disallow: API_DISALLOW },
      { userAgent: "LinkedInBot", allow: "/", disallow: API_DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
