"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { isModifiedNavigation } from "@/lib/focus-main-content";
import { Menu, X } from "lucide-react";
import { NAV, type NavId } from "@/lib/content/nav";
import { HERO_ID, sectionHref, PAGE_SECTION_IDS, isPageSectionId, SECTION_LABELS } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";
import {
  getActiveSectionFromScroll,
  getSectionIdFromHash,
  navigateToSection,
  unlockPageScroll,
} from "@/lib/section-navigation";
import { MDLogo } from "@/components/ui/icons";
import styles from "@/styles/layout/nav-bar.module.css";
const SCROLL_LOCK_MS = 2000;
const HASH_SCROLL_LOCK_MS = 3500;
const MOBILE_NAV_ID = "mobile-nav-menu";
const DEFAULT_ACTIVE = HERO_ID;

function handleSectionNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  id: string,
  onNavigate: (id: string) => void,
) {
  if (isModifiedNavigation(event)) return;
  event.preventDefault();
  onNavigate(id);
}

function SectionNavLink({
  id,
  label,
  active,
  onNavigate,
}: {
  id: string;
  label: string;
  active: boolean;
  onNavigate: (id: string) => void;
}) {
  return (
    <li>
      <a
        href={sectionHref(id)}
        onClick={(event) => {
          handleSectionNavClick(event, id, onNavigate);
        }}
        aria-current={active ? "true" : undefined}
        className={`${styles.navLink} ${active ? styles.navLinkActive : ""} no-underline`}
      >
        {label}
      </a>
    </li>
  );
}

function NavItem({
  id,
  label,
  active,
  onNavigate,
}: {
  id: NavId;
  label: string;
  active: boolean;
  onNavigate: (id: string) => void;
}) {
  return <SectionNavLink id={id} label={label} active={active} onNavigate={onNavigate} />;
}

export function NavBar() {
  const lockUntilRef = useRef(0);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback((returnFocus = true) => {
    setMenuOpen((open) => {
      if (open && returnFocus) {
        requestAnimationFrame(() => menuToggleRef.current?.focus());
      }
      return false;
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const lockActiveSection = useCallback((id: string, duration = SCROLL_LOCK_MS) => {
    setActive(id);
    lockUntilRef.current = Date.now() + duration;
  }, []);

  const onNavigate = useCallback(
    (id: string) => {
      lockActiveSection(id);
      closeMenu(false);
      unlockPageScroll();
      void navigateToSection(id);
    },
    [closeMenu, lockActiveSection],
  );

  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      if (Date.now() < lockUntilRef.current) return;
      setActive(getActiveSectionFromScroll(PAGE_SECTION_IDS));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    const syncHash = () => {
      const hashId = getSectionIdFromHash();
      if (!hashId || !isPageSectionId(hashId)) return;
      lockActiveSection(hashId, HASH_SCROLL_LOCK_MS);
      closeMenu(false);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("pageshow", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("pageshow", syncHash);
    };
  }, [closeMenu, lockActiveSection]);

  useEffect(() => {
    if (!menuOpen) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const nav = mobileNavRef.current;
    const focusable = nav
      ? Array.from(
          nav.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    requestAnimationFrame(() => first?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab" || focusable.length === 0) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) closeMenu(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  const activeLabel = isPageSectionId(active) ? SECTION_LABELS[active] : active;

  return (
    <header className={menuOpen ? styles.headerOpen : undefined}>
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
          <a
            href={sectionHref(HERO_ID)}
            onClick={(event) => {
              handleSectionNavClick(event, HERO_ID, onNavigate);
            }}
            aria-label="Go to top of portfolio"
            className={`${styles.navLogo} relative z-10 flex items-center gap-2 mono-base text-primary tracking-[0.02em] no-underline`}
          >
            <MDLogo size={22} aria-hidden />
            <span>{UI_LABELS.nav.portfolio}</span>
          </a>

          <ul className="hidden lg:flex items-center list-none m-0 p-0">
            {NAV.map((id) => (
              <NavItem
                key={id}
                id={id}
                label={SECTION_LABELS[id]}
                active={active === id}
                onNavigate={onNavigate}
              />
            ))}
          </ul>

          {active !== "hero" && (
            <span className={`lg:hidden mono-xs text-primary tracking-widest ${styles.sectionLabel}`}>
              {activeLabel}
            </span>
          )}

          <div className={`${styles.navActions} relative z-10 flex items-center gap-3`}>
            <a
              href={sectionHref("contact")}
              onClick={(event) => {
                handleSectionNavClick(event, "contact", onNavigate);
              }}
              className="hidden lg:flex items-center gap-1.5 py-1.25 px-3 rounded-md border border-primary/30 bg-primary/10 text-primary font-mono mono-sm font-medium tracking-[0.04em] leading-none whitespace-nowrap hover:bg-primary/20 hover:border-primary/50 transition-colors no-underline cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
              {UI_LABELS.nav.letsTalk}
            </a>
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
        <ul className="flex flex-col items-center gap-[inherit] list-none m-0 p-0 w-full">
          <SectionNavLink
            id={HERO_ID}
            label={SECTION_LABELS.hero}
            active={active === HERO_ID}
            onNavigate={onNavigate}
          />
          {NAV.map((id) => (
            <NavItem
              key={id}
              id={id}
              label={SECTION_LABELS[id]}
              active={active === id}
              onNavigate={onNavigate}
            />
          ))}
          <li>
            <a
              href={sectionHref("contact")}
              onClick={(event) => {
                handleSectionNavClick(event, "contact", onNavigate);
              }}
              className="btn-primary mt-6 py-3.5 px-10 text-hero-support whitespace-nowrap no-underline"
            >
              <span className="status-dot-sm bg-background! shadow-none! animate-pulse" aria-hidden />
              {UI_LABELS.nav.letsTalk}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
