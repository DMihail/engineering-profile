import type { Metadata } from "next";
import { SITE_AUTHOR, SITE_URL } from "@/lib/config";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";

/** Avoid duplicating the root layout title template on nested routes. */
export function absoluteTitle(title: string): Metadata["title"] {
  return { absolute: title };
}

export function buildRouteMetadata(options: {
  title: string;
  description: string;
  path: `/${string}` | "/";
  index?: boolean;
}): Metadata {
  const url = `${SITE_URL}${options.path}`;

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
    }),
    twitter: buildTwitter({
      title: options.title,
      description: options.description,
    }),
  };
}

export function titledPage(pageTitle: string, separator: " | " | " — " = " | "): string {
  return `${pageTitle}${separator}${SITE_AUTHOR}`;
}
