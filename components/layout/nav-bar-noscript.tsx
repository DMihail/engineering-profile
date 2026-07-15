import { NAV } from "@/lib/content/nav";
import { HERO_ID, sectionHref, SECTION_LABELS } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/layout/nav-bar.module.css";

/** Section links when JavaScript is disabled (mobile drawer requires JS). */
export function NavBarNoScript() {
  return (
    <noscript>
      <nav className={styles.noScriptNav} aria-label={UI_LABELS.nav.noScript}>
        <ul className={styles.noScriptNavList}>
          <li>
            <a href={sectionHref(HERO_ID)} className={styles.noScriptNavLink}>
              {SECTION_LABELS.hero}
            </a>
          </li>
          {NAV.map((id) => (
            <li key={id}>
              <a href={sectionHref(id)} className={styles.noScriptNavLink}>
                {SECTION_LABELS[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </noscript>
  );
}
