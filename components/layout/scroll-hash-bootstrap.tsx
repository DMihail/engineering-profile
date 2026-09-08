"use client";

import { useServerInsertedHTML } from "next/navigation";
import { SCROLL_HASH_BOOTSTRAP_SCRIPT } from "@/lib/scroll-hash-bootstrap";

/**
 * Injects the hash-scroll bootstrap into the SSR HTML stream outside the
 * hydrated React tree — avoids React 19's "script tag while rendering" warning
 * while still running before paint. Inline script is allowed by CSP `'unsafe-inline'`
 * (Cache Components cannot use per-request nonces).
 */
export function ScrollHashBootstrap() {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{ __html: SCROLL_HASH_BOOTSTRAP_SCRIPT }}
    />
  ));

  return null;
}
