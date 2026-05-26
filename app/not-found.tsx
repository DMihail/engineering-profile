"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Terminal } from "lucide-react";
import { NOT_FOUND_TRACE } from "@/lib/data";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden font-sans">

      <div className="absolute inset-0 pointer-events-none bg-grid" />
      <div className="absolute inset-0 pointer-events-none bg-vignette-sm" />

      <div className="relative text-center px-6 fade-up">
        <div className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-[rgba(56,189,248,0.2)] bg-[rgba(56,189,248,0.05)]">
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

        <div className="panel p-[18px_22px] max-w-[440px] mx-auto mb-9 text-left">
          <div className="mono-label mb-3">
            {"// error trace"}
          </div>
          {NOT_FOUND_TRACE.map((line) => (
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
            {"$ navigate --to /"}<span className="inline-block w-[7px] h-[11px] bg-primary ml-0.5 align-middle cursor-blink" />
          </div>
        </div>

        <Link href="/" className="btn-primary no-underline">
          <ArrowLeft size={14} />
          Return to portfolio
        </Link>

        <div className="mono-sm text-text-faint mt-10">
          {"md://portfolio"} · Mykhailo Dzhezhelo
        </div>
      </div>
    </div>
  );
}
