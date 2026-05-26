"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, ExternalLink, Download } from "lucide-react";
import { T } from "@/lib/tokens";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel } from "@/components/ui/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function ContactSection() {
  const { ref, fade } = useFadeIn();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%", background: T.card, borderRadius: "10px",
    border: `1px solid ${focus === name ? "rgba(56,189,248,0.35)" : "rgba(255,255,255,0.08)"}`,
    color: T.p, fontSize: "14px", outline: "none",
    transition: "border-color 200ms", padding: "10px 16px", fontFamily: T.sans,
  });

  return (
    <section id="contact" style={{ background: T.surf, padding: "80px 0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="05" label="Contact" />
        <h2 style={{ fontFamily: T.sans, fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.025em", color: T.p, marginBottom: "6px" }}>
          {"Let's build something"}
        </h2>
        <p style={{ fontSize: "13px", color: T.m, marginBottom: "40px", maxWidth: "440px", lineHeight: "1.68" }}>
          Available for contract work globally — EU, US, and remote. If you have a challenging mobile or frontend systems problem, reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ fontFamily: T.mono, fontSize: "10px", letterSpacing: "0.1em", color: T.d, textTransform: "uppercase" as const, display: "block", marginBottom: "8px" }}>NAME</label>
                <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocus("name")} onBlur={() => setFocus(null)} style={inputStyle("name")} />
              </div>
              <div>
                <label style={{ fontFamily: T.mono, fontSize: "10px", letterSpacing: "0.1em", color: T.d, textTransform: "uppercase" as const, display: "block", marginBottom: "8px" }}>EMAIL</label>
                <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocus("email")} onBlur={() => setFocus(null)} style={inputStyle("email")} />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: T.mono, fontSize: "10px", letterSpacing: "0.1em", color: T.d, textTransform: "uppercase" as const, display: "block", marginBottom: "8px" }}>MESSAGE</label>
              <textarea required rows={5} placeholder="Tell me about the project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocus("message")} onBlur={() => setFocus(null)} style={{ ...inputStyle("message"), resize: "none", lineHeight: "1.6" }} />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 font-semibold"
              style={sent
                ? { padding: "12px 24px", borderRadius: "10px", background: "rgba(34,197,94,0.1)", color: T.green, border: "1px solid rgba(34,197,94,0.2)", fontSize: "14px", cursor: "pointer" }
                : { padding: "12px 24px", borderRadius: "10px", background: T.blue, color: T.bg, border: "none", fontSize: "14px", cursor: "pointer", transition: "background 200ms" }
              }
              onMouseEnter={(e) => { if (!sent) (e.currentTarget as HTMLElement).style.background = "#7DD3FC"; }}
              onMouseLeave={(e) => { if (!sent) (e.currentTarget as HTMLElement).style.background = T.blue; }}
            >
              {sent ? <><CheckCircle size={15} /> Message sent</> : <><Send size={15} /> Send message</>}
            </button>
          </form>

          <div>
            <div style={{ fontFamily: T.mono, fontSize: "9px", letterSpacing: "0.12em", color: T.d, textTransform: "uppercase" as const, marginBottom: "14px" }}>
              {"// System Metadata"}
            </div>

            <div className="space-y-2.5">
              {[
                { label: "GitHub",   hint: "github.com/mykhailo-dzhezhelo",     icon: GithubIcon,   href: "https://github.com"         },
                { label: "LinkedIn", hint: "linkedin.com/in/mykhailo-dzhezhelo", icon: LinkedinIcon, href: "https://linkedin.com"       },
                { label: "Email",    hint: "hello@dzhezhelo.dev",               icon: Mail,     href: "mailto:hello@dzhezhelo.dev" },
              ].map((link) => {
                const LinkIcon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 group"
                    style={{ padding: "12px 14px", borderRadius: "10px", background: T.card, border: `1px solid ${T.bd}`, textDecoration: "none", transition: "border-color 200ms, box-shadow 200ms" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.bdH; el.style.boxShadow = "0 0 20px rgba(56,189,248,0.06)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.bd; el.style.boxShadow = "none"; }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(56,189,248,0.1)" }}>
                      <LinkIcon size={14} style={{ color: T.blue }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: "12px", fontWeight: 600, color: T.p }}>{link.label}</div>
                      <div style={{ fontFamily: T.mono, fontSize: "10px", color: T.d, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{link.hint}</div>
                    </div>
                    <ExternalLink size={11} style={{ color: T.d, flexShrink: 0 }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>

            <div style={{ paddingTop: "16px", borderTop: `1px solid ${T.bd}`, marginTop: "16px" }}>
              <div style={{ fontFamily: T.mono, fontSize: "9px", letterSpacing: "0.12em", color: T.d, textTransform: "uppercase" as const, marginBottom: "10px" }}>
                {"// Resume"}
              </div>
              <div className="space-y-2">
                {[
                  { label: "Resume (EU format)", file: "cv-eu-mykhailo-dzhezhelo.pdf" },
                  { label: "Resume (US format)", file: "cv-us-mykhailo-dzhezhelo.pdf" },
                ].map((cv) => (
                  <a
                    key={cv.file}
                    href={`/${cv.file}`}
                    download
                    className="flex items-center gap-3"
                    style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.14)", textDecoration: "none", transition: "background 200ms, border-color 200ms" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(56,189,248,0.1)"; el.style.borderColor = "rgba(56,189,248,0.3)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(56,189,248,0.06)"; el.style.borderColor = "rgba(56,189,248,0.14)"; }}
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0" style={{ background: "rgba(56,189,248,0.12)" }}>
                      <Download size={13} style={{ color: T.blue }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: "12px", fontWeight: 600, color: T.blue }}>{cv.label}</div>
                      <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{cv.file}</div>
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
