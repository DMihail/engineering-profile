import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { PrivacyPolicyDocument } from "@/components/legal/privacy-policy-document";
import { WebPageJsonLdScript, buildWebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { BreadcrumbJsonLdScript, buildBreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SITE_EMAIL } from "@/lib/config";
import { buildRouteMetadata, titledPage } from "@/lib/page-metadata";
import { PRIVACY_POLICY_LAST_UPDATED } from "@/lib/privacy-policy-content";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import styles from "@/styles/legal-page.module.css";

const privacyTitle = titledPage("Privacy Policy");
const privacyDescription =
  "Privacy Policy for dzhezhelo.dev — how contact form data, cookies, reCAPTCHA, and hosting logs are handled.";

export const metadata: Metadata = buildRouteMetadata({
  title: privacyTitle,
  description: privacyDescription,
  path: "/privacy",
});

const privacyWebPageJsonLd = buildWebPageJsonLd({
  path: "/privacy",
  name: privacyTitle,
  description: privacyDescription,
});

const privacyBreadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <WebPageJsonLdScript data={privacyWebPageJsonLd} />
      <BreadcrumbJsonLdScript data={privacyBreadcrumbJsonLd} />
      <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
        Skip to content
      </a>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← Back to portfolio
        </Link>
        <PrivacyPolicyDocument />
        <p className={`${styles.meta} mt-8`}>
          Questions:{" "}
          <a href={`mailto:${SITE_EMAIL}`} className={styles.link}>
            {SITE_EMAIL}
          </a>
          {" · "}
          Effective {PRIVACY_POLICY_LAST_UPDATED}
        </p>
      </main>
      <Footer />
    </div>
  );
}
