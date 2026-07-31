import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const API_DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: API_DISALLOW },
      { userAgent: "Yandex", allow: "/", disallow: API_DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
