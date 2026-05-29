"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, NAV_LABELS, type NavId } from "@/lib/data/nav";
import { HERO_ID, sectionHref, PAGE_SECTION_IDS, isPageSectionId, SECTION_LABELS } from "@/lib/section-ids";
import { getSectionIdFromHash } from "@/lib/section-navigation";
import { MDLogo } from "@/components/ui/icons";
import styles from "@/styles/layout/nav-bar.module.css";

const SECTION_IDS = PAGE_SECTION_IDS;
const SCROLL_LOCK_MS = 1200;
const MOBILE_NAV_ID = "mobile-nav-menu";
const NAV_TOGGLE_ID = "nav-menu-toggle";
const DEFAULT_ACTIVE = HERO_ID;

function getObserverMargin(): string {
  const w = window.innerWidth;
  if (w < 640) return "-8% 0px -40% 0px";
  if (w < 1024) return "-15% 0px -45% 0px";
  return "-25% 0px -55% 0px";
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
        onClick={() => onNavigate(id)}
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
  const toggleRef = useRef<HTMLInputElement>(null);
  const lockUntilRef = useRef(0);
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    if (toggleRef.current) toggleRef.current.checked = false;
    setMenuOpen(false);
  }, []);

  const lockActiveSection = useCallback((id: string) => {
    setActive(id);
    lockUntilRef.current = Date.now() + SCROLL_LOCK_MS;
  }, []);

  const onNavigate = useCallback(
    (id: string) => {
      lockActiveSection(id);
      closeMenu();
    },
    [closeMenu, lockActiveSection],
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    let timer: ReturnType<typeof setTimeout>;

    const createObserver = () => {
      observer?.disconnect();
      observer = new IntersectionObserver((entries) => {
        if (Date.now() < lockUntilRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      }, { rootMargin: getObserverMargin() });

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    createObserver();

    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(createObserver, 80);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const mq = window.matchMedia("(max-width: 1023px)");
    const onResize = () => createObserver();
    mq.addEventListener("change", onResize);

    return () => {
      observer.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const hashId = getSectionIdFromHash();
      if (!hashId || !isPageSectionId(hashId)) return;
      lockActiveSection(hashId);
      closeMenu();
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [closeMenu, lockActiveSection]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && toggleRef.current?.checked) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  const activeLabel = active in SECTION_LABELS ? SECTION_LABELS[active as keyof typeof SECTION_LABELS] : active;

  return (
    <header>
      <nav aria-label="Main navigation" className={`${styles.navRoot} ${styles.navGlass} fixed inset-x-0 top-0 z-50`}>
        <input
          ref={toggleRef}
          type="checkbox"
          id={NAV_TOGGLE_ID}
          className={styles.navToggle}
          tabIndex={-1}
          onChange={(e) => {
            setMenuOpen(e.target.checked);
            e.target.blur();
          }}
        />

        <button
          type="button"
          className={`${styles.navBackdrop} lg:hidden`}
          onClick={closeMenu}
          aria-label="Close navigation menu"
          aria-hidden={!menuOpen}
          tabIndex={-1}
        />

        <div className={`max-w-6xl mx-auto px-4 sm:px-6 h-(--nav-h) ${styles.navBarInner}`}>
          <a
            href={sectionHref(HERO_ID)}
            onClick={() => onNavigate(HERO_ID)}
            aria-label="Go to top of portfolio"
            className={`${styles.navLogo} relative z-10 flex items-center gap-2 mono-base text-primary tracking-[0.02em] no-underline`}
          >
            <MDLogo size={22} aria-hidden />
            <span>md://portfolio</span>
          </a>

          <ul className="hidden lg:flex items-center list-none m-0 p-0">
            {NAV.map((id) => (
              <NavItem
                key={id}
                id={id}
                label={NAV_LABELS[id]}
                active={active === id}
                onNavigate={onNavigate}
              />
            ))}
          </ul>

          <div className={`${styles.navActions} relative z-10 flex items-center gap-3`}>
            {active !== "hero" && (
              <span className={`lg:hidden mono-xs text-primary tracking-widest ${styles.sectionLabel}`}>
                {activeLabel}
              </span>
            )}
            <a
              href={sectionHref("contact")}
              onClick={() => onNavigate("contact")}
              className="hidden lg:flex items-center gap-1.5 py-1.25 px-3 rounded-md border border-primary/30 bg-primary/10 text-primary font-mono mono-sm font-medium tracking-[0.04em] leading-none whitespace-nowrap hover:bg-primary/20 hover:border-primary/50 transition-colors no-underline cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
              Let&apos;s talk
            </a>
            <label
              htmlFor={NAV_TOGGLE_ID}
              className={`${styles.menuToggle} lg:hidden`}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls={MOBILE_NAV_ID}
              tabIndex={0}
            >
              <Menu size={20} className={styles.menuIconOpen} aria-hidden />
              <X size={20} className={styles.menuIconClose} aria-hidden />
            </label>
          </div>
        </div>

        <div
          role="dialog"
          aria-modal={menuOpen}
          aria-hidden={!menuOpen}
          aria-label="Navigation menu"
          inert={!menuOpen ? true : undefined}
          className={`${styles.navList} lg:hidden`}
        >
          <ul id={MOBILE_NAV_ID} className="flex flex-col items-center gap-[inherit] list-none m-0 p-0 w-full">
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
                label={NAV_LABELS[id]}
                active={active === id}
                onNavigate={onNavigate}
              />
            ))}
            <li>
              <a
                href={sectionHref("contact")}
                onClick={() => onNavigate("contact")}
                className="btn-primary mt-6 py-3.5 px-10 text-hero-support whitespace-nowrap no-underline"
              >
                <span className="status-dot-sm bg-background! shadow-none! animate-pulse" aria-hidden />
                Let&apos;s talk
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
