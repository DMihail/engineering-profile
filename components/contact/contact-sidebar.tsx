import { ExternalLink, Send } from "lucide-react";
import { TELEGRAM } from "@/lib/contact-region";
import { SOCIAL_LINKS } from "@/lib/content/portfolio/social-links";
import { SITE_CALENDLY_URL } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { ContactCopyEmailButton } from "@/components/contact/contact-copy-email-button";
import {
  ContactPhoneCard,
  ContactResumeButton,
} from "@/components/contact/contact-region-links";
import styles from "@/styles/sections/contact-aside.module.css";

function TelegramCard() {
  return (
    <a
      href={TELEGRAM.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.linkCard} group no-underline`}
    >
      <div className="icon-well icon-well-md">
        <Send size={14} className="text-primary" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{UI_LABELS.contact.telegram}</div>
        <div className="mono-sm text-text-dim truncate">{TELEGRAM.hint}</div>
      </div>
      <ExternalLink size={11} className="text-text-dim shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
    </a>
  );
}

function CalendlyLink() {
  if (!SITE_CALENDLY_URL) return null;

  return (
    <a
      href={SITE_CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.linkCard} w-full no-underline`}
    >
      <div className="icon-well icon-well-md">
        <ExternalLink size={14} className="text-primary" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{UI_LABELS.contact.bookCall}</div>
        <div className="mono-sm text-text-dim">{UI_LABELS.contact.bookCallHint}</div>
      </div>
    </a>
  );
}

/** Server aside — only phone/CV region + email copy hydrate as client islands. */
export function ContactSidebar() {
  const emailLink = SOCIAL_LINKS.find((link) => link.href.startsWith("mailto:"));
  const socialLinks = SOCIAL_LINKS.filter((link) => !link.href.startsWith("mailto:"));
  const EmailIcon = emailLink?.icon;

  return (
    <aside className={styles.contactAside} aria-labelledby="contact-links-heading">
      <h3 id="contact-links-heading" className="mono-label mb-3.5">
        {UI_LABELS.contact.linksHeading}
      </h3>

      <address className="not-italic space-y-3 mb-3">
        <ContactPhoneCard />
        {emailLink && EmailIcon ? (
          <div className={styles.emailRow}>
            <a href={emailLink.href} className={`${styles.linkCard} ${styles.emailLink} no-underline`}>
              <div className="icon-well icon-well-md">
                <EmailIcon size={14} className="text-primary" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground">{emailLink.label}</div>
                <div className="mono-sm text-text-dim truncate">{emailLink.hint}</div>
              </div>
            </a>
            <ContactCopyEmailButton email={emailLink.hint} />
          </div>
        ) : null}
      </address>

      <div className="space-y-3">
        <TelegramCard />
        <CalendlyLink />
        {socialLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.linkCard} group no-underline`}
            >
              <div className="icon-well icon-well-md">
                <LinkIcon size={14} className="text-primary" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground">{link.label}</div>
                <div className="mono-sm text-text-dim truncate">{link.hint}</div>
              </div>
              <ExternalLink size={11} className="text-text-dim shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            </a>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border mt-4">
        <h3 className="mono-label mb-2.5">{UI_LABELS.contact.resumeHeading}</h3>
        <ContactResumeButton />
      </div>
    </aside>
  );
}
