"use client";

import { useEffect, useRef, useState, useTransition, useSyncExternalStore } from "react";
import { Send, CheckCircle, Loader2, ExternalLink, Download, Copy, Check } from "lucide-react";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel } from "@/components/ui/primitives";
import { SOCIAL_LINKS } from "@/lib/data";
import styles from "@/styles/sections/contact-section.module.css";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

type FormState = { success: boolean; error?: string; ts: number };

const INITIAL_STATE: FormState = { success: false, ts: 0 };

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.de", "tempmail.com",
  "throwaway.email", "temp-mail.org", "fakeinbox.com", "sharklasers.com",
  "guerrillamailblock.com", "grr.la", "dispostable.com", "yopmail.com",
  "trashmail.com", "trashmail.me", "trashmail.net", "mailnesia.com",
  "maildrop.cc", "discard.email", "mailcatch.com", "tempail.com",
  "tempr.email", "10minutemail.com", "minutemail.com", "emailondeck.com",
  "mohmal.com", "burnermail.io", "inboxkitten.com", "getnada.com",
  "mailsac.com", "harakirimail.com", "tmail.ws", "temp-mail.io",
  "crazymailing.com", "mailtemp.net", "tmpmail.net", "tmpmail.org",
  "bupmail.com", "classicmail.co", "flurred.com", "jetable.org",
  "mytemp.email", "throwam.com", "trashmail.org", "20minutemail.com",
]);

function validateEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Please enter a valid email address";
  }

  const domain = trimmed.split("@")[1];

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return "Disposable email addresses are not accepted. Please use a real email.";
  }

  const parts = domain.split(".");
  const tld = parts[parts.length - 1];
  if (tld.length < 2 || /^\d+$/.test(tld)) {
    return "Please enter a valid email address";
  }

  if (domain.length < 4) {
    return "Please enter a valid email address";
  }

  return null;
}

const CV_UA   = { file: "/Mykhailo_Dzhezhelo_CV_UK.pdf",      label: "Resume (UA)" };
const CV_INTL = { file: "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",  label: "Resume" };

const NOOP_SUBSCRIBE = () => () => {};

function getCvSnapshot() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language?.toLowerCase() ?? "";
    if (tz === "Europe/Kyiv" || tz === "Europe/Kiev" || lang.startsWith("uk")) return CV_UA;
  } catch { /* fallback */ }
  return CV_INTL;
}

function getServerCvSnapshot() {
  return CV_INTL;
}

function notify(title: string, body: string) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification(title, { body, icon: "/favicon.ico" });
}

let lastSubmitAt = 0;
const THROTTLE_MS = 10_000;

function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "contact_submit" })
        .then(resolve)
        .catch(reject);
    });
  });
}

async function sendMessage(_prev: FormState, data: FormData): Promise<FormState> {
  void _prev;

  const now = Date.now();
  if (now - lastSubmitAt < THROTTLE_MS) {
    return { success: false, error: "Please wait before sending again", ts: now };
  }

  const email = (data.get("email") as string)?.trim().toLowerCase() ?? "";
  const emailError = validateEmail(email);
  if (emailError) {
    return { success: false, error: emailError, ts: now };
  }

  const name = (data.get("name") as string)?.trim() ?? "";
  if (name.length < 2) {
    return { success: false, error: "Please enter your name", ts: now };
  }

  const message = (data.get("message") as string)?.trim() ?? "";
  if (message.length < 10) {
    return { success: false, error: "Message is too short — please describe your project", ts: now };
  }

  const company = (data.get("company") as string)?.trim() || null;

  try {
    lastSubmitAt = now;

    const recaptchaToken = await getRecaptchaToken();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, message, recaptchaToken }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Request failed");
    }

    notify("Message sent!", "Thanks for reaching out — I'll get back to you soon.");
    return { success: true, ts: Date.now() };
  } catch (err) {
    console.error("[contact] Submit failed:", err);
    const errorMsg = "Failed to send — please try again or email directly";
    notify("Sending failed", errorMsg);
    return { success: false, error: errorMsg, ts: Date.now() };
  }
}

function SubmitButton({ success, pending, error }: { success: boolean; pending: boolean; error?: string }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        type="submit"
        disabled={pending || success}
        className={`flex items-center gap-2 font-semibold ${
          success
            ? "py-3 px-6 rounded-[10px] bg-[rgba(34,197,94,0.1)] text-success border border-[rgba(34,197,94,0.2)] text-sm"
            : "btn-primary disabled:opacity-60"
        }`}
      >
        {success
          ? <><CheckCircle size={15} /> Message sent</>
          : pending
            ? <><Loader2 size={15} className="animate-spin" /> Sending...</>
            : <><Send size={15} /> Send message</>
        }
      </button>
      {error && (
        <p className="text-xs text-[#ef4444] mono-sm">{error}</p>
      )}
    </div>
  );
}

function ResumeButton() {
  const cv = useSyncExternalStore(NOOP_SUBSCRIBE, getCvSnapshot, getServerCvSnapshot);

  return (
    <a href={cv.file} download className={styles.resumeLink}>
      <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 bg-[rgba(56,189,248,0.12)]">
        <Download size={13} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-primary">{cv.label}</div>
        <div className="mono-xs text-text-dim truncate">{cv.file.split("/").pop()}</div>
      </div>
    </a>
  );
}

function EmailCard({ link }: { link: typeof SOCIAL_LINKS[number] }) {
  const [copied, setCopied] = useState(false);
  const LinkIcon = link.icon;
  const email = link.hint;

  const handleClick = () => {
    window.location.href = link.href;
    setTimeout(() => {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, 300);
  };

  return (
    <button type="button" onClick={handleClick} className={`${styles.linkCard} group w-full text-left`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-[rgba(56,189,248,0.1)]">
        <LinkIcon size={14} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{link.label}</div>
        <div className="mono-sm text-text-dim truncate">{email}</div>
      </div>
      {copied
        ? <Check size={13} className="text-success shrink-0" />
        : <Copy size={11} className="text-text-dim shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    </button>
  );
}

function SocialLinks() {
  return (
    <div className="space-y-2.5">
      {SOCIAL_LINKS.map((link) => {
        if (link.href.startsWith("mailto:")) {
          return <EmailCard key={link.label} link={link} />;
        }
        const LinkIcon = link.icon;
        return (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={`${styles.linkCard} group`}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-[rgba(56,189,248,0.1)]">
              <LinkIcon size={14} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-foreground">{link.label}</div>
              <div className="mono-sm text-text-dim truncate">{link.hint}</div>
            </div>
            <ExternalLink size={11} className="text-text-dim shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        );
      })}
    </div>
  );
}

export function ContactSection() {
  const { ref, fade } = useFadeIn();
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const success = state.success;
  const error = !state.success ? state.error : undefined;

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!state.success || state.ts === 0) return;
    formRef.current?.reset();
    const t = setTimeout(() => setState(INITIAL_STATE), 4000);
    return () => clearTimeout(t);
  }, [state.ts, state.success]);

  useEffect(() => {
    if (!state.error || state.ts === 0) return;
    const t = setTimeout(() => setState((s) => ({ ...s, error: undefined })), 4000);
    return () => clearTimeout(t);
  }, [state.error, state.ts]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await sendMessage(state, data);
      setState(result);
    });
  };

  return (
    <section id="contact" className="section-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="05" label="Contact" />
        <h2 className="section-heading">{"Let's build something"}</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-[440px] leading-[1.68]">
          Available for contract work globally — EU, US, and remote. If you have a challenging mobile or frontend systems problem, reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="contact-name" className={styles.formLabel}>NAME</label>
                <input id="contact-name" type="text" name="name" required maxLength={100} placeholder="Your name" className={styles.inputField} />
              </div>
              <div>
                <label htmlFor="contact-email" className={styles.formLabel}>EMAIL</label>
                <input id="contact-email" type="email" name="email" required maxLength={254} placeholder="you@example.com" className={styles.inputField} />
              </div>
              <div>
                <label htmlFor="contact-company" className={styles.formLabel}>COMPANY <span className="opacity-50">(optional)</span></label>
                <input id="contact-company" type="text" name="company" maxLength={120} placeholder="Your company" className={styles.inputField} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className={styles.formLabel}>MESSAGE</label>
              <textarea id="contact-message" name="message" required maxLength={2000} rows={5} placeholder="Tell me about the project..." className={`${styles.inputField} resize-none leading-[1.6]`} />
            </div>
            <SubmitButton success={success} pending={isPending} error={error} />
          </form>

          <div>
            <div className="mono-label mb-3.5">{"// System Metadata"}</div>
            <SocialLinks />

            <div className="pt-4 border-t border-border mt-4">
              <div className="mono-label mb-2.5">{"// Resume"}</div>
              <ResumeButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
