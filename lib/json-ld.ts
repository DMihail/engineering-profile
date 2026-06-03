import { CASE_STUDIES } from "@/lib/content/portfolio/case-studies";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_ROLE,
  SITE_URL,
} from "@/lib/content/site";
import {
  SEO_ADDRESS,
  SEO_AREA_SERVED,
  SEO_IDS,
  buildKnowsAbout,
  buildSameAs,
  projectUrl,
} from "@/lib/content/seo";
import { SITE_PROFILE_IMAGE_PATH } from "@/lib/config";

export type JsonLdItemList = {
  "@type": "ItemList";
  "@id": string;
  name: string;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    item: {
      "@type": "CreativeWork";
      "@id": string;
      name: string;
      description: string;
      url: string;
      keywords: string;
      author: { "@id": string };
    };
  }>;
};

type JsonLdWebSite = {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  publisher: { "@id": string };
};

export type JsonLdPerson = {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  image: string;
  email: string;
  jobTitle: string;
  worksFor: { "@type": "Organization"; name: string };
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  workLocation: { "@type": "Place"; name: string };
  areaServed: string[];
  sameAs: string[];
  knowsAbout: string[];
};

type JsonLdItemListNode = JsonLdItemList;

type JsonLdGraphNode = JsonLdWebSite | JsonLdPerson | JsonLdItemListNode;

export type SiteJsonLd = {
  "@context": "https://schema.org";
  "@graph": JsonLdGraphNode[];
};

function buildCaseStudiesItemList(): JsonLdItemList {
  return {
    "@type": "ItemList",
    "@id": SEO_IDS.projects,
    name: "Projects",
    itemListElement: CASE_STUDIES.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": projectUrl(study.id),
        name: study.title,
        description: study.summary,
        url: projectUrl(study.id),
        keywords: study.stack.join(", "),
        author: { "@id": SEO_IDS.person },
      },
    })),
  };
}

export function buildSiteJsonLd(): SiteJsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SEO_IDS.website,
        url: SITE_URL,
        name: SITE_AUTHOR,
        description: SITE_DESCRIPTION,
        inLanguage: "en-IE",
        publisher: { "@id": SEO_IDS.person },
      },
      {
        "@type": "Person",
        "@id": SEO_IDS.person,
        name: SITE_AUTHOR,
        url: SITE_URL,
        image: `${SITE_URL}${SITE_PROFILE_IMAGE_PATH}`,
        email: SITE_EMAIL,
        jobTitle: SITE_ROLE,
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: SEO_ADDRESS.locality,
          addressCountry: SEO_ADDRESS.country,
        },
        workLocation: {
          "@type": "Place",
          name: SITE_LOCATION,
        },
        areaServed: [...SEO_AREA_SERVED],
        sameAs: buildSameAs(),
        knowsAbout: buildKnowsAbout(),
      },
      buildCaseStudiesItemList(),
    ],
  };
}
