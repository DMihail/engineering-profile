import { SITE_AUTHOR, SITE_ROLE } from "@/lib/config";
import { SOCIAL_LINKS } from "@/lib/data/social-links";
import { MDLogo } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-border py-7 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <MDLogo size={16} aria-hidden />
            <small className="mono-md text-text-dim">
              © {new Date().getFullYear()} {SITE_AUTHOR}
            </small>
          </div>
          <span className="hidden sm:inline mono-md text-text-faint" aria-hidden="true">·</span>
          <span className="mono-md text-text-faint">{SITE_ROLE}</span>
        </div>

        <nav aria-label="Social links">
          <ul className="flex items-center gap-4 list-none m-0 p-0">
            {SOCIAL_LINKS.map((link) => {
              const isMailto = link.href.startsWith("mailto:");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(!isMailto && { target: "_blank", rel: "noreferrer" })}
                    className="mono-sm text-text-dim no-underline transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li aria-hidden="true">
              <span className="status-dot animate-pulse" />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
