"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, ExternalLink, Download } from "lucide-react";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel } from "@/components/ui/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE_EMAIL } from "@/lib/config";
import styles from "@/styles/sections/contact-section.module.css";

export function ContactSection() {
  const { ref, fade } = useFadeIn();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="05" label="Contact" />
        <h2 className="section-heading">{"Let's build something"}</h2>
        <p className="text-[13px] text-muted-foreground mb-10 max-w-[440px] leading-[1.68]">
          Available for contract work globally — EU, US, and remote. If you have a challenging mobile or frontend systems problem, reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={styles.formLabel}>NAME</label>
                <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={styles.inputField} />
              </div>
              <div>
                <label className={styles.formLabel}>EMAIL</label>
                <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={styles.inputField} />
              </div>
            </div>
            <div>
              <label className={styles.formLabel}>MESSAGE</label>
              <textarea required rows={5} placeholder="Tell me about the project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${styles.inputField} resize-none leading-[1.6]`} />
            </div>
            <button
              type="submit"
              className={`flex items-center gap-2 font-semibold ${sent ? "py-3 px-6 rounded-[10px] bg-[rgba(34,197,94,0.1)] text-success border border-[rgba(34,197,94,0.2)] text-sm cursor-pointer" : "btn-primary"}`}
            >
              {sent ? <><CheckCircle size={15} /> Message sent</> : <><Send size={15} /> Send message</>}
            </button>
          </form>

          <div>
            <div className="mono-label mb-3.5">
              {"// System Metadata"}
            </div>

            <div className="space-y-2.5">
              {[
                { label: "GitHub",   hint: "github.com/mykhailo-dzhezhelo",     icon: GithubIcon,   href: "https://github.com" },
                { label: "LinkedIn", hint: "linkedin.com/in/mykhailo-dzhezhelo", icon: LinkedinIcon, href: "https://linkedin.com" },
                { label: "Email",    hint: SITE_EMAIL,               icon: Mail,         href: `mailto:${SITE_EMAIL}` },
              ].map((link) => {
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

            <div className="pt-4 border-t border-border mt-4">
              <div className="mono-label mb-2.5">
                {"// Resume"}
              </div>
              <div className="space-y-2">
                {[
                  { label: "Resume (EU format)", file: "cv-eu-mykhailo-dzhezhelo.pdf" },
                  { label: "Resume (US format)", file: "cv-us-mykhailo-dzhezhelo.pdf" },
                ].map((cv) => (
                  <a key={cv.file} href={`/${cv.file}`} download className={styles.resumeLink}>
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 bg-[rgba(56,189,248,0.12)]">
                      <Download size={13} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-primary">{cv.label}</div>
                      <div className="mono-xs text-text-dim truncate">{cv.file}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
