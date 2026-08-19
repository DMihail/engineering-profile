import { NAV } from "@/lib/content/nav";
import { HERO_ID, sectionHref, SECTION_LABELS } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { MDLogo } from "@/components/ui/icons";
import { NavBarClient } from "@/components/layout/nav-bar-client";
import styles from "@/styles/layout/nav-bar.module.css";

const logoClassName =
  "relative z-10 flex items-center gap-2 mono-base text-primary tracking-[0.02em] no-underline";

const contactCtaClassName =
  "hidden lg:flex items-center gap-1.5 py-1.25 px-3 rounded-md border border-primary/30 bg-primary/10 text-primary font-mono mono-sm font-medium tracking-[0.04em] leading-none whitespace-nowrap hover:bg-primary/20 hover:border-primary/50 transition-colors no-underline cursor-pointer";

/**
 * Server shell: link markup is SSR'd for crawlers / no-JS.
 * Interactive active-state + mobile drawer live in `NavBarClient`.
 */
export function NavBar() {
  return (
    <NavBarClient
      logo={
        <a
          href={sectionHref(HERO_ID)}
          data-nav-section={HERO_ID}
          aria-label="Go to top of portfolio"
          className={logoClassName}
        >
          <MDLogo size={22} aria-hidden />
          <span>{UI_LABELS.nav.portfolio}</span>
        </a>
      }
      desktopLinks={
        <ul className="hidden lg:flex items-center list-none m-0 p-0">
          {NAV.filter((id) => id !== "contact").map((id) => (
            <li key={id}>
              <a
                href={sectionHref(id)}
                data-nav-section={id}
                className={`${styles.navLink} no-underline`}
              >
                {SECTION_LABELS[id]}
              </a>
            </li>
          ))}
        </ul>
      }
      contactCta={
        <a href={sectionHref("contact")} data-nav-section="contact" className={contactCtaClassName}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
          {UI_LABELS.nav.letsTalk}
        </a>
      }
      mobileLinks={
        <ul className="flex flex-col items-center gap-[inherit] list-none m-0 p-0 w-full">
          <li>
            <a
              href={sectionHref(HERO_ID)}
              data-nav-section={HERO_ID}
              className={`${styles.navLink} no-underline`}
            >
              {SECTION_LABELS.hero}
            </a>
          </li>
          {NAV.map((id) => {
            const isContact = id === "contact";
            return (
              <li key={id}>
                <a
                  href={sectionHref(id)}
                  data-nav-section={id}
                  className={
                    isContact
                      ? "btn-primary mt-6 py-3.5 px-10 text-hero-support whitespace-nowrap no-underline"
                      : `${styles.navLink} no-underline`
                  }
                >
                  {isContact ? (
                    <>
                      <span className="status-dot-sm bg-background! shadow-none! animate-pulse" aria-hidden />
                      {UI_LABELS.nav.letsTalk}
                    </>
                  ) : (
                    SECTION_LABELS[id]
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      }
    />
  );
}
