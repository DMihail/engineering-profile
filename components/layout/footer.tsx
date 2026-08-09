import Link from "next/link";
import { SITE_AUTHOR, SITE_LAST_MODIFIED, SITE_ROLE } from "@/lib/config";
import { SOCIAL_LINKS } from "@/lib/content/portfolio/social-links";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { MDLogo } from "@/components/ui/icons";
import styles from "@/styles/layout/footer.module.css";

const COPYRIGHT_YEAR = Number.parseInt(SITE_LAST_MODIFIED.slice(0, 4), 10) || 2026;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <div className={styles.brandRow}>
            <MDLogo size={16} aria-hidden />
            <small className={`mono-md ${styles.copyright}`}>
              © {COPYRIGHT_YEAR} {SITE_AUTHOR}
            </small>
          </div>
          <p className={styles.role}>{SITE_ROLE}</p>
        </div>

        <div className={styles.metaBlock}>
          <nav aria-label={UI_LABELS.footer.links} className={styles.footerNav}>
            <ul className={styles.linkList}>
              <li>
                <Link href="/privacy" className={styles.footerLink}>
                  {UI_LABELS.footer.privacyPolicy}
                </Link>
              </li>
              {SOCIAL_LINKS.map((link) => {
                const isMailto = link.href.startsWith("mailto:");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
                      className={styles.footerLink}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.availability}>
            <span className={`status-dot ${styles.statusDot}`} aria-hidden />
            <span className={styles.availabilityText}>{UI_LABELS.footer.availableForWork}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
