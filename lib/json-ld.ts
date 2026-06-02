import { CASE_STUDIES } from "@/lib/data/case-studies";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_PROFILE_IMAGE_PATH,
  SITE_ROLE,
  SITE_URL,
} from "@/lib/config";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROJECTS_ID = `${SITE_URL}/#projects`;

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
    "@id": PROJECTS_ID,
    name: "Projects",
    itemListElement: CASE_STUDIES.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/#project-${study.id}`,
        name: study.title,
        description: study.summary,
        url: `${SITE_URL}/#project-${study.id}`,
        keywords: study.stack.join(", "),
        author: { "@id": PERSON_ID },
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
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_AUTHOR,
        description: SITE_DESCRIPTION,
        inLanguage: "en-IE",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
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
          addressLocality: "Dublin",
          addressCountry: "IE",
        },
        workLocation: {
          "@type": "Place",
          name: SITE_LOCATION,
        },
        areaServed: ["Ireland", "European Union", "United Kingdom", "Ukraine", "Remote"],
        sameAs: [
          "https://github.com/DMihail",
          "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
        ],
        knowsAbout: [
          "React Native",
          "Expo",
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "Jest",
          "Detox",
          "Firebase",
          "Firebase Crashlytics",
          "Full-Stack Development",
          "iOS",
          "Android",
          "App Store",
          "Google Play",
        ],
      },
      buildCaseStudiesItemList(),
    ],
  };
}
