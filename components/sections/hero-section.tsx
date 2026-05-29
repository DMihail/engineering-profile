import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE_AUTHOR, SITE_LOCATION, SITE_ROLE, SITE_WORK_AUTHORIZATION } from "@/lib/config";
import { HERO_CTA, HERO_STATS } from "@/lib/data";
import styles from "@/styles/sections/hero-section.module.css";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-hero flex items-center overflow-hidden bg-background pt-(--nav-h)"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid" aria-hidden />
      <div className="absolute inset-0 pointer-events-none bg-vignette" aria-hidden />
      <div className={`absolute top-0 inset-x-0 h-px pointer-events-none ${styles.heroLine}`} aria-hidden />

      <div className={`relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:max-w-4xl ${styles.heroEntrance}`}>
        <div className="text-center lg:text-left">
          <div className={`${styles.badgeAvailable} mb-6 mx-auto lg:mx-0`}>
            <span className="status-dot-sm animate-pulse" aria-hidden />
            <span className="text-sm text-text-secondary">
              Available · full-time, contract, remote & onsite · {SITE_LOCATION}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-sans font-extrabold mb-3 tracking-[-0.045em] leading-[0.98] text-foreground text-hero-name text-balance"
          >
            {SITE_AUTHOR.split(" ")[0]}
            <br />
            <span className="text-primary">{SITE_AUTHOR.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="font-semibold leading-snug text-text-secondary text-hero-lead mb-3">{SITE_ROLE}</p>

          <p className="text-xs text-text-dim mb-4">{SITE_WORK_AUTHORIZATION}</p>

          <p className="text-hero-support sm:text-base text-muted-foreground max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0 text-pretty">
            Six years across mobile and web — Expo and React Native for iOS and Android, React with Material UI
            for production web at Elementica, and Next.js or Node.js when the product needs APIs.
          </p>

          <nav
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-12"
            aria-label="Primary actions"
          >
            <a href={HERO_CTA.cv} download className="btn-primary no-underline min-h-11">
              <Download size={15} aria-hidden />
              Download CV
            </a>
            <a
              href={HERO_CTA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline no-underline min-h-11"
            >
              <GithubIcon size={15} aria-hidden />
              GitHub
            </a>
            <a
              href={HERO_CTA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline no-underline min-h-11"
            >
              <LinkedinIcon size={15} aria-hidden />
              LinkedIn
            </a>
            <a href={HERO_CTA.contact} className="btn-outline no-underline min-h-11">
              <Mail size={15} aria-hidden />
              Contact
            </a>
          </nav>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0 m-0">
            {HERO_STATS.map((m) => (
              <div key={m.label} className="text-center py-4 px-2 rounded-xl bg-card border border-border">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-sans text-hero-stat font-bold text-foreground tracking-[-0.03em] m-0">
                  {m.value}
                </dd>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug m-0" aria-hidden>
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
