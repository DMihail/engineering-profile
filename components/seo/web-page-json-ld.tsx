import { SITE_URL } from "@/lib/config";

type WebPageJsonLd = {
  "@context": "https://schema.org";
  "@type": "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  isPartOf: { "@id": string };
  inLanguage: string;
};

export function buildWebPageJsonLd(options: {
  path: `/${string}` | "/";
  name: string;
  description: string;
}): WebPageJsonLd {
  const url = `${SITE_URL}${options.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-IE",
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
