"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";
import { MDLogo } from "@/components/ui/icons";
import styles from "@/styles/layout/nav-bar.module.css";

const SECTION_IDS = ["hero", ...NAV];
const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: "-30% 0px -65% 0px" };

function NavItem({ id, active, onClick }: { id: string; active: boolean; onClick: () => void }) {
  return (
    <li>
      <a
        href={`#${id}`}
        onClick={onClick}
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
  const toggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, OBSERVER_OPTIONS);

    const observed = new WeakSet<Element>();
    let timer: ReturnType<typeof setTimeout>;

    const observeAll = () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });
    };

    observeAll();

    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(observeAll, 80);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && toggleRef.current?.checked) {
        toggleRef.current.checked = false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    if (toggleRef.current) toggleRef.current.checked = false;
  };

  return (
    <header>
      <input type="checkbox" id="nav-toggle" className={styles.toggle} ref={toggleRef} tabIndex={-1} />

      <nav aria-label="Main navigation" className={`${styles.navGlass} ${styles.navBar} fixed inset-x-0 top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[var(--nav-h)]">
          <a href="#hero" className="flex items-center gap-2 mono-base text-primary tracking-[0.02em] no-underline">
            <MDLogo size={22} />
            md://portfolio
          </a>

          <ul className={styles.navList}>
            {NAV.map((id) => (
              <NavItem key={id} id={id} active={active === id} onClick={closeMenu} />
            ))}
            <li className="md:hidden">
              <a href="#contact" onClick={closeMenu} className="btn-primary mt-4 py-[14px] px-9 no-underline">
                Hire me
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-1.5 btn-sm bg-primary text-background tracking-[0.04em] hover:bg-[#7DD3FC] no-underline"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-background opacity-70" />
              Hire me
            </a>
            <label
              htmlFor="nav-toggle"
              className="md:hidden text-muted-foreground cursor-pointer p-1"
              aria-label="Toggle navigation menu"
            >
              <Menu size={18} className={styles.iconOpen} />
              <X size={18} className={styles.iconClose} />
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
}
