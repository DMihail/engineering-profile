"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { T } from "@/lib/tokens";
import { NAV } from "@/lib/data";

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
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(11,15,23,0.93)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${T.bd}` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: "52px" }}>
          <button onClick={() => goto("hero")} style={{ fontFamily: T.mono, fontSize: "12px", color: T.blue, letterSpacing: "0.02em", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            md://portfolio
          </button>

          <div className="hidden md:flex items-center">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => goto(item)}
                style={{ fontFamily: T.mono, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: active === item ? T.blue : T.m, background: active === item ? "rgba(56,189,248,0.08)" : "transparent", border: "none", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", transition: "color 150ms, background 150ms" }}
                onMouseEnter={(e) => { if (active !== item) (e.currentTarget as HTMLElement).style.color = T.s; }}
                onMouseLeave={(e) => { if (active !== item) (e.currentTarget as HTMLElement).style.color = T.m; }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goto("contact")}
              className="hidden sm:flex items-center gap-1.5"
              style={{ fontFamily: T.mono, fontSize: "10px", padding: "5px 14px", borderRadius: "6px", background: T.blue, color: T.bg, border: "none", cursor: "pointer", letterSpacing: "0.04em", transition: "background 150ms" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#7DD3FC"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = T.blue; }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.bg, opacity: 0.7 }} />
              hire me
            </button>
            <button className="md:hidden" onClick={() => setOpen((v) => !v)} style={{ color: T.m, background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: T.bg, paddingTop: "52px" }}>
          <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
            {NAV.map((item) => (
              <button key={item} onClick={() => goto(item)} style={{ fontFamily: T.mono, fontSize: "20px", color: active === item ? T.blue : T.s, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em" }}>
                {item}
              </button>
            ))}
            <button onClick={() => goto("contact")} style={{ marginTop: "16px", padding: "14px 36px", borderRadius: "10px", background: T.blue, color: T.bg, fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}>
              hire me
            </button>
          </div>
        </div>
      )}
    </>
  );
}
