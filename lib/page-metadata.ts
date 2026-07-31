import type { Metadata } from "next";
import { SITE_AUTHOR, SITE_OG_IMAGE_PATH, SITE_URL } from "@/lib/config";
import { buildOpenGraph, buildTwitter, DEFAULT_OG_IMAGE } from "@/lib/site-metadata";

/** Avoid duplicating the root layout title template on nested routes. */
export function absoluteTitle(title: string): Metadata["title"] {
  return { absolute: title };
}

export function buildRouteMetadata(options: {
  title: string;
  description: string;
  path: `/${string}` | "/";
  index?: boolean;
  /** Route-specific OG/Twitter image path (defaults to site OG). */
  ogImagePath?: string;
}): Metadata {
  const url = `${SITE_URL}${options.path}`;
  const imagePath = options.ogImagePath ?? SITE_OG_IMAGE_PATH;
  const images =
    options.ogImagePath !== undefined
      ? [
          {
            url: options.ogImagePath,
            width: DEFAULT_OG_IMAGE.width,
            height: DEFAULT_OG_IMAGE.height,
            alt: options.title,
          },
        ]
      : [DEFAULT_OG_IMAGE];

  return {
    title: absoluteTitle(options.title),
    description: options.description,
    alternates: { canonical: url },
    robots: {
      index: options.index ?? true,
      follow: true,
    },
    openGraph: buildOpenGraph({
      url,
      title: options.title,
      description: options.description,
      images,
    }),
    twitter: buildTwitter({
      title: options.title,
      description: options.description,
      images: [imagePath],
    }),
  };
}

export function titledPage(pageTitle: string, separator: " | " | " — " = " | "): string {
  return `${pageTitle}${separator}${SITE_AUTHOR}`;
}
