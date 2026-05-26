import { SITE_AUTHOR } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border py-7 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="mono-md text-text-dim">{SITE_AUTHOR} © {new Date().getFullYear()}</span>
        <div className="flex items-center gap-4">
          <span className="mono-md text-text-faint">React Native · TypeScript · Frontend Engineering</span>
          <span className="status-dot animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
