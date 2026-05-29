import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page does not exist.",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname");

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6 font-sans">
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
  );
}
