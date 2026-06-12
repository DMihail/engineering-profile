import { SITE_URL } from "@/lib/config";
import { SEO_IDS } from "@/lib/content/seo";

export type ProfilePageJsonLd = {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  isPartOf: { "@id": string };
  about: { "@id": string };
  mainEntity: { "@id": string };
  inLanguage: string;
};

export function buildProfilePageJsonLd(options: {
  name: string;
  description: string;
}): ProfilePageJsonLd {
  const url = `${SITE_URL}/resume`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": SEO_IDS.website },
    about: { "@id": SEO_IDS.person },
    mainEntity: { "@id": SEO_IDS.person },
    inLanguage: "en-IE",
  };
}

export function ProfilePageJsonLdScript({ data }: { data: ProfilePageJsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
