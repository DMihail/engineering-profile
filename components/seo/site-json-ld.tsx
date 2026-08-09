import { cacheLife, cacheTag } from "next/cache";
import { buildSiteJsonLd } from "@/lib/json-ld";
import { CACHE_TAGS } from "@/lib/cache-tags";

/** Structured data for crawlers — cached; valid in document body per schema.org / Google. */
export async function SiteJsonLd() {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.siteJsonLd);

  const jsonLd = buildSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
