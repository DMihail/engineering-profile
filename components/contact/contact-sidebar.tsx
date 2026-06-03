"use client";

import { useSyncExternalStore } from "react";
import { Download, ExternalLink, Send, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  getContactRegionFromClient,
  getServerContactRegion,
  phoneForRegion,
  TELEGRAM,
} from "@/lib/contact-region";
import { getClientCvLink, getServerCvLink } from "@/lib/contact-cv";
import { SOCIAL_LINKS } from "@/lib/data";
import { SITE_CALENDLY_URL } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-section.module.css";

const NOOP_SUBSCRIBE = () => () => {};

function useContactRegion() {
  return useSyncExternalStore(NOOP_SUBSCRIBE, getContactRegionFromClient, getServerContactRegion);
}

function useCvLink() {
  return useSyncExternalStore(NOOP_SUBSCRIBE, getClientCvLink, getServerCvLink);
}

function PhoneCard() {
  const region = useContactRegion();
  const phone = phoneForRegion(region);

  return (
    <a href={`tel:${phone.e164}`} className={`${styles.linkCard} no-underline`}>
      <div className="icon-well icon-well-md">
        <Phone size={14} className="text-primary" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{UI_LABELS.contact.phone}</div>
        <div className="mono-sm text-text-dim">{phone.display}</div>
      </div>
    </a>
  );
}

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

function ResumeButton() {
  const cv = useCvLink();

  return (
    <a href={cv.file} download className={`${styles.linkCard} w-full no-underline`}>
      <div className="icon-well icon-well-md">
        <Download size={14} className="text-primary" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{cv.label}</div>
        <div className="mono-sm text-text-dim">{UI_LABELS.contact.pdfDownload}</div>
      </div>
    </a>
  );
}

function EmailCard({ link }: { link: (typeof SOCIAL_LINKS)[number] }) {
  const [copied, setCopied] = useState(false);
  const LinkIcon = link.icon;
  const email = link.hint;

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.emailRow}>
      <a href={link.href} className={`${styles.linkCard} ${styles.emailLink} no-underline`}>
        <div className="icon-well icon-well-md">
          <LinkIcon size={14} className="text-primary" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-foreground">{link.label}</div>
          <div className="mono-sm text-text-dim truncate">{email}</div>
        </div>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? UI_LABELS.contact.emailCopied : UI_LABELS.contact.copyEmail(email)}
        className={styles.copyButton}
      >
        {copied ? (
          <Check size={16} className="text-success" aria-hidden />
        ) : (
          <Copy size={16} className="text-text-dim" aria-hidden />
        )}
      </button>
    </div>
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

export function ContactSidebar() {
  return (
    <aside className={styles.contactAside} aria-labelledby="contact-links-heading">
      <address className="not-italic">
        <h3 id="contact-links-heading" className="mono-label mb-3.5">
          {UI_LABELS.contact.linksHeading}
        </h3>
        <div className="space-y-3">
        <PhoneCard />
        <TelegramCard />
        <CalendlyLink />
        {SOCIAL_LINKS.map((link) => {
          if (link.href.startsWith("mailto:")) {
            return <EmailCard key={link.label} link={link} />;
          }
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
      </address>

      <div className="pt-4 border-t border-border mt-4">
        <h3 className="mono-label mb-2.5">{UI_LABELS.contact.resumeHeading}</h3>
        <ResumeButton />
      </div>
    </aside>
  );
}
