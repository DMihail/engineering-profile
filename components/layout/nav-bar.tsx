"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";
import { MDLogo } from "@/components/ui/icons";
import styles from "@/styles/layout/nav-bar.module.css";

const SECTION_IDS = ["hero", ...NAV];
const SCROLL_LOCK_MS = 1200;

function getObserverMargin(): string {
  const w = window.innerWidth;
  if (w < 640) return "-8% 0px -40% 0px";
  if (w < 1024) return "-15% 0px -45% 0px";
  return "-25% 0px -55% 0px";
}

function NavItem({ id, active, onClick }: { id: string; active: boolean; onClick: (id: string) => void }) {
  return (
    <li>
      <a
        href={`#${id}`}
        onClick={() => onClick(id)}
        aria-current={active ? "true" : undefined}
        className={`${styles.navLink} ${active ? styles.navLinkActive : ""} no-underline`}
      >
        {id}
      </a>
    </li>
  );
}

export function NavBar() {
  const [active, setActive] = useState("hero");
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

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const navigateTo = useCallback((id: string) => {
    setActive(id);
    setMenuOpen(false);
    lockUntilRef.current = Date.now() + SCROLL_LOCK_MS;
  }, []);

  return (
    <header>
      <nav aria-label="Main navigation" className={`${styles.navGlass} fixed inset-x-0 top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[var(--nav-h)]">
          <a href="#hero" onClick={() => navigateTo("hero")} className="relative z-10 flex items-center gap-2 mono-base text-primary tracking-[0.02em] no-underline">
            <MDLogo size={22} />
            md://portfolio
          </a>

          <ul className={`${styles.navList} ${menuOpen ? styles.navListOpen : ""}`}>
            {NAV.map((id) => (
              <NavItem key={id} id={id} active={active === id} onClick={navigateTo} />
            ))}
            <li className="md:hidden">
              <a href="#contact" onClick={() => navigateTo("contact")} className="btn-primary mt-4 py-[14px] px-9 no-underline">
                Hire me
              </a>
            </li>
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            {active !== "hero" && (
              <span className={`md:hidden mono-xs text-primary tracking-[0.1em] ${styles.sectionLabel}`}>{active}</span>
            )}
            <a
              href="#contact"
              onClick={() => navigateTo("contact")}
              className="hidden sm:flex items-center gap-1.5 btn-sm bg-primary text-background tracking-[0.04em] hover:bg-[#7DD3FC] no-underline"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-background opacity-70" />
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-muted-foreground cursor-pointer p-1"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
