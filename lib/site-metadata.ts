import type { Metadata } from "next";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE_PATH,
  SITE_SHORT_DESCRIPTION,
  SITE_URL,
} from "@/lib/config";

export const DEFAULT_OG_IMAGE = {
  url: SITE_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${SITE_AUTHOR} — Mobile Engineer · React Native · Web Developer`,
} as const;

export const DEFAULT_SITE_TITLE = `${SITE_AUTHOR} — Mobile Engineer · React Native · Web Developer`;

type OpenGraphOverrides = NonNullable<Metadata["openGraph"]>;

export function buildOpenGraph(overrides: OpenGraphOverrides = {}): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_IE",
    url: SITE_URL,
    siteName: SITE_AUTHOR,
    title: DEFAULT_SITE_TITLE,
    description: SITE_SHORT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    ...overrides,
  };
}

type TwitterOverrides = NonNullable<Metadata["twitter"]>;

export function buildTwitter(overrides: TwitterOverrides = {}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: DEFAULT_SITE_TITLE,
    description: SITE_SHORT_DESCRIPTION,
    creator: "@mykhailo_dev",
    images: [SITE_OG_IMAGE_PATH],
    ...overrides,
  };
}

export const ROOT_SITE_METADATA = {
  openGraph: buildOpenGraph({ description: SITE_DESCRIPTION }),
  twitter: buildTwitter({ description: SITE_DESCRIPTION }),
} as const;
