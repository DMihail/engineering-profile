import { buildSiteJsonLd } from "@/lib/json-ld";

const jsonLd = buildSiteJsonLd();

/** Structured data for crawlers — valid in document body per schema.org / Google. */
export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
