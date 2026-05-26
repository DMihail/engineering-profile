"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Terminal } from "lucide-react";

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
    <div className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden font-sans">

      <div className="absolute inset-0 pointer-events-none bg-grid" />
      <div className="absolute inset-0 pointer-events-none bg-vignette-sm" />

      <div
        className="relative text-center px-6"
        style={{
          opacity: rdy ? 1 : 0,
          transform: rdy ? "none" : "translateY(20px)",
          transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
      >
        <div className="badge-system mb-8">
          <Terminal size={11} className="text-primary" />
          <span className="mono-md tracking-[0.04em] text-muted-foreground">
            {"sys.error // route_not_found"}
          </span>
        </div>

        <div className="font-mono text-primary font-extrabold mb-7 leading-[0.9] tracking-[-0.06em] text-[clamp(96px,20vw,156px)] [text-shadow:0_0_80px_rgba(56,189,248,0.25)]">
          404
        </div>

        <h1 className="font-sans text-foreground font-bold mb-2.5 tracking-[-0.025em] text-[clamp(20px,3vw,28px)]">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-[1.65]">
          The route you requested doesn&apos;t exist in this system.
        </p>

        <div className="panel-sm p-[18px_22px] max-w-[440px] mx-auto mb-9 text-left">
          <div className="mono-label mb-3">
            {"// error trace"}
          </div>
          {[
            { prefix: "at ", name: "Router.resolve", loc: "(routes.ts:1)" },
            { prefix: "at ", name: "Request.match",  loc: "(browser.ts:44)" },
          ].map((line) => (
            <div key={line.name} className="mono-md text-text-faint mb-[5px]">
              <span className="text-text-dim">{line.prefix}</span>
              {line.name}
              <span className="text-text-dim"> {line.loc}</span>
            </div>
          ))}
          <div className="mono-md text-text-secondary mt-2.5 pt-2.5 border-t border-[rgba(255,255,255,0.05)]">
            <span className="text-text-dim">{"Error: "}</span>
            No route matches path &quot;<span className="text-primary">{pathname}</span>&quot;
          </div>
          <div className="mono-md text-primary mt-2">
            {"$ navigate --to /"}{cursor && <span className="inline-block w-[7px] h-[11px] bg-primary ml-0.5 align-middle" />}
          </div>
        </div>

        <button onClick={() => router.push("/")} className="btn-primary">
          <ArrowLeft size={14} />
          Return to portfolio
        </button>

        <div className="mono-sm text-text-faint mt-10">
          {"md://portfolio"} · Mykhailo Dzhezhelo
        </div>
      </div>
    </div>
  );
}
