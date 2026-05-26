"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";
import styles from "@/styles/layout/nav-bar.module.css";

const SECTION_IDS = ["hero", "impact", "projects", "skills", "experience", "contact"];

export function NavBar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -65% 0px" },
      );
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const goto = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  return (
    <>
      <nav className={`${styles.navGlass} fixed top-0 left-0 right-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[52px]">
          <button onClick={() => goto("hero")} className="mono-base text-primary tracking-[0.02em] bg-transparent border-none cursor-pointer p-0">
            md://portfolio
          </button>

          <div className="hidden md:flex items-center">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => goto(item)}
                className={`${styles.navLink} ${active === item ? "text-primary bg-[rgba(56,189,248,0.08)]" : "text-muted-foreground bg-transparent hover:text-text-secondary"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goto("contact")}
              className="hidden sm:flex items-center gap-1.5 btn-sm bg-primary text-background tracking-[0.04em] hover:bg-[#7DD3FC]"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-background opacity-70" />
              hire me
            </button>
            <button className="md:hidden text-muted-foreground bg-transparent border-none cursor-pointer p-1" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-background pt-[52px]">
          <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => goto(item)}
                className={`font-mono text-[20px] bg-transparent border-none cursor-pointer tracking-[0.04em] ${active === item ? "text-primary" : "text-text-secondary"}`}
              >
                {item}
              </button>
            ))}
            <button onClick={() => goto("contact")} className="btn-primary mt-4 py-[14px] px-9">
              hire me
            </button>
          </div>
        </div>
      )}
    </>
  );
}
