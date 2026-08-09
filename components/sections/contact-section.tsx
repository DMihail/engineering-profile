import { ContactForm } from "@/components/contact/contact-form";
import { ContactNoScriptFallback } from "@/components/contact/contact-noscript-fallback";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { AppToaster } from "@/components/ui/app-toaster";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-section.module.css";

export function ContactSection() {
  const headingId = sectionHeadingId("contact");

  return (
    <section id="contact" className="section-surface section-cv-auto" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionHeader sectionId="contact" commentClassName="mb-6" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="status-dot-sm animate-pulse" aria-hidden />
            <span className="mono-sm text-success tracking-[0.04em]">
              {UI_LABELS.contact.availability}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] gap-8 lg:gap-12 lg:items-start">
          <div>
            <ContactNoScriptFallback />
            <div className={styles.contactJsOnly}>
              <ContactForm headingId={headingId} />
              <AppToaster />
            </div>
          </div>
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
