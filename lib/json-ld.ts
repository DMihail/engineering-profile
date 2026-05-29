import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_OG_IMAGE_PATH,
  SITE_ROLE,
  SITE_URL,
} from "@/lib/config";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_AUTHOR,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_AUTHOR,
        url: SITE_URL,
        image: `${SITE_URL}${SITE_OG_IMAGE_PATH}`,
        email: `mailto:${SITE_EMAIL}`,
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
          "TypeScript",
          "iOS",
          "Android",
          "Real-time Systems",
          "Mobile Architecture",
          "Performance Optimization",
          "Native Modules",
        ],
      },
    ],
  };
}
