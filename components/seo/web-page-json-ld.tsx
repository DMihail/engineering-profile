import { SITE_URL } from "@/lib/config";
import { SEO_IDS } from "@/lib/content/seo";

type WebPageJsonLd = {
  "@context": "https://schema.org";
  "@type": "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  isPartOf: { "@id": string };
  inLanguage: string;
  about?: { "@id": string };
  mainEntity?: { "@id": string };
};

export function buildWebPageJsonLd(options: {
  path: `/${string}` | "/";
  name: string;
  description: string;
  aboutPerson?: boolean;
}): WebPageJsonLd {
  const url = `${SITE_URL}${options.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": SEO_IDS.website },
    inLanguage: "en-IE",
    ...(options.aboutPerson
      ? {
          about: { "@id": SEO_IDS.person },
          mainEntity: { "@id": SEO_IDS.person },
        }
      : {}),
  };
}

export function WebPageJsonLdScript({ data }: { data: WebPageJsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
