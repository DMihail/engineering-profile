import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { absoluteTitle, titledPage } from "@/lib/page-metadata";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import { SkipLink } from "@/components/layout/skip-link";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";

const NOT_FOUND_DESCRIPTION = "The requested page does not exist on dzhezhelo.dev.";

const NOT_FOUND_TITLE = "Page not found";

export const metadata: Metadata = {
  title: absoluteTitle(NOT_FOUND_TITLE),
  description: NOT_FOUND_DESCRIPTION,
  robots: { index: false, follow: true },
  openGraph: buildOpenGraph({
    title: titledPage(NOT_FOUND_TITLE),
    description: NOT_FOUND_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: titledPage(NOT_FOUND_TITLE),
    description: NOT_FOUND_DESCRIPTION,
  }),
};

export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname");

  return (
    <>
      <SkipLink />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="bg-background min-h-screen flex items-center justify-center px-6 font-sans"
      >
        <div className="max-w-md text-center">
          <p className="mono-md text-muted-foreground mb-2">404</p>
          <h1 className="font-sans text-foreground font-bold mb-3 tracking-[-0.025em] text-404-title text-balance">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground mb-8 leading-body text-pretty">
            {pathname ? (
              <>
                No page at <span className="text-foreground">{pathname}</span>.
              </>
            ) : (
              "This page does not exist."
            )}
          </p>
          <Link href="/" className="btn-primary no-underline">
            Back to homepage
          </Link>
        </div>
      </main>
    </>
  );
}
