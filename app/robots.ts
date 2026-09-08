import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { CV_FILES } from "@/lib/content/cv";

const API_DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...API_DISALLOW, ...CV_FILES],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: [...API_DISALLOW, ...CV_FILES],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
