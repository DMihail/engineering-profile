"use client";

import { type MouseEvent, type ReactNode, useEffect, useEffectEvent, useRef } from "react";
import { Menu, X } from "lucide-react";
import { isModifiedNavigation } from "@/lib/focus-main-content";
import { HERO_ID, isPageSectionId, SECTION_LABELS } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { navigateToSection, unlockPageScroll } from "@/lib/section-navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import styles from "@/styles/layout/nav-bar.module.css";

const MOBILE_NAV_ID = "mobile-nav-menu";

interface NavBarClientProps {
  logo: ReactNode;
  desktopLinks: ReactNode;
  contactCta: ReactNode;
  mobileLinks: ReactNode;
}

/** Client island: active section + mobile drawer; link markup is SSR'd by `NavBar`. */
export function NavBarClient({ logo, desktopLinks, contactCta, mobileLinks }: NavBarClientProps) {
  const headerRef = useRef<HTMLElement>(null);
  const { active, lockActiveSection } = useActiveSection();
  const { menuOpen, menuToggleRef, mobileNavRef, closeMenu, toggleMenu } = useMobileMenu();

  const onNavigate = (id: string) => {
    lockActiveSection(id);
    closeMenu(false);
    unlockPageScroll();
    void navigateToSection(id);
  };

  const syncActiveLinks = useEffectEvent((sectionId: string) => {
    const root = headerRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>("[data-nav-section]").forEach((el) => {
      const id = el.dataset.navSection;
      const isActive = id === sectionId;
      if (isActive) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");

      if (el.classList.contains(styles.navLink)) {
        el.classList.toggle(styles.navLinkActive, isActive);
      }
    });
  });

  useEffect(() => {
    syncActiveLinks(active);
  }, [active]);

  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest<HTMLAnchorElement>("a[data-nav-section]");
    if (!anchor || !headerRef.current?.contains(anchor)) return;
    if (isModifiedNavigation(event)) return;

    const id = anchor.dataset.navSection;
    if (!id) return;

    event.preventDefault();
    onNavigate(id);
  };

  const activeLabel = isPageSectionId(active) ? SECTION_LABELS[active] : active;

  return (
    <header ref={headerRef} className={menuOpen ? styles.headerOpen : undefined} onClick={handleNavClick}>
      <nav aria-label={UI_LABELS.nav.main} className={`${styles.navRoot} ${styles.navGlass} fixed inset-x-0 top-0 z-50`}>
        {menuOpen && (
          <button
            type="button"
            className={`${styles.navBackdrop} ${styles.navBackdropOpen} lg:hidden`}
            onClick={() => closeMenu()}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />
        )}

        <div className={`max-w-6xl mx-auto px-4 sm:px-6 h-(--nav-h) ${styles.navBarInner}`}>
          <div className={styles.navLogo}>{logo}</div>

          {desktopLinks}

          {active !== HERO_ID && (
            <span className={`lg:hidden mono-xs text-primary tracking-widest ${styles.sectionLabel}`}>
              {activeLabel}
            </span>
          )}

          <div className={`${styles.navActions} relative z-10 flex items-center gap-3`}>
            {contactCta}
            <button
              type="button"
              ref={menuToggleRef}
              className={`${styles.menuToggle} lg:hidden`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls={MOBILE_NAV_ID}
              aria-haspopup="true"
            >
              <Menu size={20} className={styles.menuIconOpen} aria-hidden />
              <X size={20} className={styles.menuIconClose} aria-hidden />
            </button>
          </div>
        </div>
      </nav>

      <nav
        ref={mobileNavRef}
        id={MOBILE_NAV_ID}
        aria-label={UI_LABELS.nav.mobile}
        inert={!menuOpen ? true : undefined}
        className={`${styles.navList} lg:hidden ${menuOpen ? styles.navListOpen : ""}`}
      >
        {mobileLinks}
      </nav>
    </header>
  );
}
