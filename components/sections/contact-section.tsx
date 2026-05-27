"use client";

import { useEffect, useRef, useState, useActionState, useSyncExternalStore } from "react";
import { useFormStatus } from "react-dom";
import { Send, CheckCircle, Loader2, ExternalLink, Download, Copy, Check } from "lucide-react";
import { useFadeIn } from "@/lib/hooks";
import { validateEmail } from "@/lib/validate-email";
import { SectionLabel } from "@/components/ui/primitives";
import { SOCIAL_LINKS } from "@/lib/data";
import styles from "@/styles/sections/contact-section.module.css";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

type FormState = { success: boolean; error?: string; ts: number };

const INITIAL_STATE: FormState = { success: false, ts: 0 };


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
  try {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    new Notification(title, { body, icon: "/favicon.ico" });
  } catch {
    // Silently fail — iOS Safari, some WebViews, and restricted contexts throw here
  }
}

let lastSubmitAt = 0;
const THROTTLE_MS = 10_000;

function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA not loaded — check your connection"));
      return;
    }
    const timeout = setTimeout(() => reject(new Error("reCAPTCHA timed out")), 10_000);
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "contact_submit" })
        .then((token) => { clearTimeout(timeout); resolve(token); })
        .catch((err) => { clearTimeout(timeout); reject(err); });
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

    let recaptchaToken: string;
    try {
      recaptchaToken = await getRecaptchaToken();
    } catch (captchaErr) {
      console.warn("[contact] reCAPTCHA failed:", captchaErr);
      return { success: false, error: "Security check failed — please reload and try again", ts: Date.now() };
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, message, recaptchaToken }),
    });

    if (!res.ok) {
      let serverError = "Request failed";
      try {
        const body = await res.json();
        serverError = body.error || serverError;
      } catch { /* non-JSON response */ }
      notify("Sending failed", serverError);
      return { success: false, error: serverError, ts: Date.now() };
    }

    notify("Message sent!", "Thanks for reaching out — I'll get back to you soon.");
    return { success: true, ts: Date.now() };
  } catch (err) {
    console.error("[contact] Submit failed:", err);
    const errorMsg = err instanceof Error && err.message.includes("failed to fetch")
      ? "Network error — check your connection"
      : "Failed to send — please try again or email directly";
    notify("Sending failed", errorMsg);
    return { success: false, error: errorMsg, ts: Date.now() };
  }
}

function SubmitButton({ success, error }: { success: boolean; error?: string }) {
  const { pending } = useFormStatus();
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
          ? <><CheckCircle size={15} aria-hidden /> Message sent</>
          : pending
            ? <><Loader2 size={15} className="animate-spin" aria-hidden /> Sending...</>
            : <><Send size={15} aria-hidden /> Send message</>
        }
      </button>
      {error && (
        <p role="alert" className="text-xs text-[#ef4444] mono-sm">{error}</p>
      )}
    </div>
  );
}

function ResumeButton() {
  const cv = useSyncExternalStore(NOOP_SUBSCRIBE, getCvSnapshot, getServerCvSnapshot);

  return (
    <a href={cv.file} download className={styles.resumeLink}>
      <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 bg-[rgba(56,189,248,0.12)]">
        <Download size={13} className="text-primary" aria-hidden />
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

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group w-full">
      <a href={link.href} className={`${styles.linkCard} w-full pr-11 no-underline`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-[rgba(56,189,248,0.1)]">
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
        aria-label={copied ? "Email copied" : `Copy ${email}`}
        className="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 p-1.5 cursor-pointer bg-transparent border-0 rounded-md hover:bg-[rgba(255,255,255,0.04)]"
      >
        {copied
          ? <Check size={13} className="text-success" aria-hidden />
          : <Copy size={11} className="text-text-dim opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden />
        }
      </button>
    </div>
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
  );
}

export function ContactSection() {
  const { ref, fade } = useFadeIn();
  const [state, formAction] = useActionState(sendMessage, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  const success = state.success;
  const error = !state.success ? state.error : undefined;

  useEffect(() => {
    try {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    } catch {
      // Notification API unavailable (iOS Safari, restricted contexts)
    }
  }, []);

  useEffect(() => {
    if (!state.success || state.ts === 0) return;
    formRef.current?.reset();
  }, [state.ts, state.success]);

  return (
    <section id="contact" className="section-surface" aria-labelledby="contact-heading">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="06" label="Contact" />
        <h2 id="contact-heading" className="section-heading">{"Let's build something"}</h2>
        <div className="flex items-center gap-2 mb-3">
          <span className="status-dot-sm animate-pulse" />
          <span className="mono-sm text-success tracking-[0.04em]">Available for contract work</span>
        </div>
        <p className="text-sm text-muted-foreground mb-10 max-w-110 leading-[1.68]">
          Open to remote and onsite opportunities globally — EU, US, and worldwide. If you have a challenging mobile or frontend systems problem, reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          <form ref={formRef} action={formAction} className="space-y-4" aria-labelledby="contact-heading">
            <fieldset className="space-y-4 border-0 p-0 m-0 min-w-0">
              <legend className="sr-only">Contact form</legend>
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
            <SubmitButton success={success} error={error} />
            </fieldset>
          </form>

          <aside aria-labelledby="contact-links-heading">
            <h3 id="contact-links-heading" className="mono-label mb-3.5">Links</h3>
            <SocialLinks />

            <div className="pt-4 border-t border-border mt-4">
              <h3 className="mono-label mb-2.5">Resume</h3>
              <ResumeButton />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
