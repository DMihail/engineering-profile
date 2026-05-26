"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Terminal } from "lucide-react";
import { T } from "@/lib/tokens";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [cursor, setCursor] = useState(true);
  const [rdy, setRdy] = useState(false);

  useEffect(() => {
    const c = setInterval(() => setCursor((v) => !v), 540);
    const r = setTimeout(() => setRdy(true), 60);
    return () => { clearInterval(c); clearTimeout(r); };
  }, []);

  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: T.sans,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 10%, #0B0F17 100%)" }}
      />

      <div
        className="relative text-center px-6"
        style={{
          opacity: rdy ? 1 : 0,
          transform: rdy ? "none" : "translateY(20px)",
          transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
      >
        <div
          className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full"
          style={{ border: "1px solid rgba(56,189,248,0.2)", background: "rgba(56,189,248,0.05)" }}
        >
          <Terminal size={11} style={{ color: T.blue }} />
          <span style={{ fontFamily: T.mono, fontSize: "11px", color: T.m, letterSpacing: "0.04em" }}>
            {"sys.error // route_not_found"}
          </span>
        </div>

        <div
          style={{
            fontFamily: T.mono,
            fontSize: "clamp(96px, 20vw, 156px)",
            fontWeight: 800,
            color: T.blue,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            marginBottom: "28px",
            textShadow: "0 0 80px rgba(56,189,248,0.25)",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: T.sans,
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: T.p,
            marginBottom: "10px",
          }}
        >
          Page not found
        </h1>
        <p style={{ fontSize: "14px", color: T.m, marginBottom: "32px", lineHeight: "1.65" }}>
          The route you requested doesn&apos;t exist in this system.
        </p>

        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bd}`,
            borderRadius: "12px",
            padding: "18px 22px",
            maxWidth: "440px",
            margin: "0 auto 36px",
            textAlign: "left",
          }}
        >
          <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", marginBottom: "12px", textTransform: "uppercase" as const }}>
            {"// error trace"}
          </div>
          {[
            { prefix: "at ", name: "Router.resolve", loc: "(routes.ts:1)" },
            { prefix: "at ", name: "Request.match",  loc: "(browser.ts:44)" },
          ].map((line) => (
            <div key={line.name} style={{ fontFamily: T.mono, fontSize: "11px", color: T.f, marginBottom: "5px" }}>
              <span style={{ color: T.d }}>{line.prefix}</span>
              {line.name}
              <span style={{ color: T.d }}> {line.loc}</span>
            </div>
          ))}
          <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.s, marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ color: T.d }}>{"Error: "}</span>
            No route matches path &quot;<span style={{ color: T.blue }}>{pathname}</span>&quot;
          </div>
          <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.blue, marginTop: "8px" }}>
            {"$ navigate --to /"}{cursor && <span style={{ display: "inline-block", width: "7px", height: "11px", background: T.blue, marginLeft: "2px", verticalAlign: "middle" }} />}
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2"
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            background: T.blue,
            color: T.bg,
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            fontFamily: T.sans,
            transition: "background 200ms, transform 150ms",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#7DD3FC"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = T.blue; el.style.transform = "none"; }}
        >
          <ArrowLeft size={14} />
          Return to portfolio
        </button>

        <div style={{ fontFamily: T.mono, fontSize: "10px", color: T.f, marginTop: "40px" }}>
          {"md://portfolio"} · Mykhailo Dzhezhelo
        </div>
      </div>
    </div>
  );
}
