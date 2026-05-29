"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, NAV_LABELS, type NavId } from "@/lib/data/nav";
import { HERO_ID, sectionHref, PAGE_SECTION_IDS, isPageSectionId, SECTION_LABELS } from "@/lib/section-ids";
import { getSectionIdFromHash, scrollToSection } from "@/lib/section-navigation";
import { MDLogo } from "@/components/ui/icons";
import styles from "@/styles/layout/nav-bar.module.css";

const SECTION_IDS = PAGE_SECTION_IDS;
const SCROLL_LOCK_MS = 1200;
const MOBILE_NAV_ID = "mobile-nav-menu";
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
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <li>
      <a
        href={sectionHref(id)}
        onClick={(e) => {
          e.preventDefault();
          onClick(id);
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
  onClick,
}: {
  id: NavId;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return <SectionNavLink id={id} label={label} active={active} onClick={onClick} />;
}

export function NavBar() {
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const [menuOpen, setMenuOpen] = useState(false);
  const lockUntilRef = useRef(0);

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
    if (!menuOpen) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const hashId = getSectionIdFromHash();
    if (!hashId || !isPageSectionId(hashId)) return;

    lockUntilRef.current = Date.now() + SCROLL_LOCK_MS;
    void scrollToSection(hashId);

    const frame = requestAnimationFrame(() => {
      setActive(hashId);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const navigateTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    lockUntilRef.current = Date.now() + SCROLL_LOCK_MS;
    void scrollToSection(id);
  };

  const activeLabel = active in SECTION_LABELS ? SECTION_LABELS[active as keyof typeof SECTION_LABELS] : active;

  return (
    <header>
      <nav aria-label="Main navigation" className={`${styles.navGlass} fixed inset-x-0 top-0 z-50`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 h-(--nav-h) ${styles.navBarInner}`}>
          <a
            href={sectionHref(HERO_ID)}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("hero");
            }}
            className={`${styles.navLogo} relative z-10 flex items-center gap-2 mono-base text-primary tracking-[0.02em] no-underline`}
          >
            <MDLogo size={22} aria-hidden />
            <span>md://portfolio</span>
          </a>

          {menuOpen && (
            <button
              type="button"
              className={`${styles.navBackdrop} ${styles.navBackdropOpen} lg:hidden`}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            />
          )}

          <ul className="hidden lg:flex items-center list-none m-0 p-0">
            {NAV.map((id) => (
              <NavItem
                key={id}
                id={id}
                label={NAV_LABELS[id]}
                active={active === id}
                onClick={navigateTo}
              />
            ))}
          </ul>

          <ul
            id={MOBILE_NAV_ID}
            className={`${styles.navList} lg:hidden ${menuOpen ? styles.navListOpen : ""}`}
            aria-hidden={!menuOpen}
          >
            <SectionNavLink
              id={HERO_ID}
              label={SECTION_LABELS.hero}
              active={active === HERO_ID}
              onClick={navigateTo}
            />
            {NAV.map((id) => (
              <NavItem
                key={id}
                id={id}
                label={NAV_LABELS[id]}
                active={active === id}
                onClick={navigateTo}
              />
            ))}
            <li>
              <a
                href={sectionHref("contact")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("contact");
                }}
                className="btn-primary mt-6 py-3.5 px-10 text-hero-support whitespace-nowrap no-underline"
              >
                <span className="status-dot-sm bg-background! shadow-none! animate-pulse" aria-hidden />
                Let&apos;s talk
              </a>
            </li>
          </ul>

          <div className={`${styles.navActions} relative z-10 flex items-center gap-3`}>
            {active !== "hero" && (
              <span className={`lg:hidden mono-xs text-primary tracking-widest ${styles.sectionLabel}`}>
                {activeLabel}
              </span>
            )}
            <a
              href={sectionHref("contact")}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("contact");
              }}
              className="hidden lg:flex items-center gap-1.5 py-1.25 px-3 rounded-md border border-primary/30 bg-primary/10 text-primary font-mono mono-sm font-medium tracking-[0.04em] leading-none whitespace-nowrap hover:bg-primary/20 hover:border-primary/50 transition-colors no-underline cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-muted-foreground cursor-pointer p-1"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls={MOBILE_NAV_ID}
            >
              {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
