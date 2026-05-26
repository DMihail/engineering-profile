"use client";

import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useFormStatus } from "react-dom";
import { Send, CheckCircle, Loader2, ExternalLink, Download, Copy, Check } from "lucide-react";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel } from "@/components/ui/primitives";
import { SOCIAL_LINKS } from "@/lib/data";
import styles from "@/styles/sections/contact-section.module.css";

type FormState = { success: boolean; ts: number };

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

async function sendMessage(_prev: FormState, _data: FormData): Promise<FormState> {
  void _prev; void _data;
  await new Promise((r) => setTimeout(r, 1200));
  return { success: true, ts: Date.now() };
}

function SubmitButton({ success }: { success: boolean }) {
  const { pending } = useFormStatus();

  return (
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
  const [state, formAction] = useActionState(sendMessage, INITIAL_STATE);
  const [hiddenTs, setHiddenTs] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const success = state.success && state.ts > hiddenTs;

  useEffect(() => {
    if (!state.success || state.ts === 0) return;
    formRef.current?.reset();
    const t = setTimeout(() => setHiddenTs(state.ts), 4000);
    return () => clearTimeout(t);
  }, [state.ts, state.success]);

  return (
    <section id="contact" className="section-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="05" label="Contact" />
        <h2 className="section-heading">{"Let's build something"}</h2>
        <p className="text-[13px] text-muted-foreground mb-10 max-w-[440px] leading-[1.68]">
          Available for contract work globally — EU, US, and remote. If you have a challenging mobile or frontend systems problem, reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className={styles.formLabel}>NAME</label>
                <input id="contact-name" type="text" name="name" required placeholder="Your name" className={styles.inputField} />
              </div>
              <div>
                <label htmlFor="contact-email" className={styles.formLabel}>EMAIL</label>
                <input id="contact-email" type="email" name="email" required placeholder="you@example.com" className={styles.inputField} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className={styles.formLabel}>MESSAGE</label>
              <textarea id="contact-message" name="message" required rows={5} placeholder="Tell me about the project..." className={`${styles.inputField} resize-none leading-[1.6]`} />
            </div>
            <SubmitButton success={success} />
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
