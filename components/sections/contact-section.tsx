"use client";

import { useEffect, useRef, useActionState } from "react";
import { ensureRecaptchaLoaded } from "@/lib/recaptcha-client";
import {
  CONTACT_FORM_INITIAL_STATE,
  submitContactForm,
} from "@/lib/contact-form";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { ContactSubmitButton } from "@/components/contact/contact-submit-button";
import { SITE_WORK_AUTHORIZATION } from "@/lib/config";
import styles from "@/styles/sections/contact-section.module.css";

export function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, CONTACT_FORM_INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaPrimed = useRef(false);

  const primeRecaptcha = () => {
    if (recaptchaPrimed.current) return;
    recaptchaPrimed.current = true;
    void ensureRecaptchaLoaded().catch(() => {});
  };

  const success = state.success;
  const error = !state.success ? state.error : undefined;
  const headingId = sectionHeadingId("contact");

  useEffect(() => {
    if (!state.success || state.ts === 0) return;
    formRef.current?.reset();
  }, [state.ts, state.success]);

  return (
    <section id="contact" className="section-surface section-cv-auto" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionHeader sectionId="contact" commentClassName="mb-6" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="status-dot-sm animate-pulse" aria-hidden />
            <span className="mono-sm text-success tracking-[0.04em]">
              Open to full-time, contract, and freelance
            </span>
          </div>
          <span className="text-xs text-text-dim">{SITE_WORK_AUTHORIZATION}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] gap-8 lg:gap-12 lg:items-start">
          <form
            ref={formRef}
            action={formAction}
            onFocusCapture={primeRecaptcha}
            className={`panel ${styles.formPanel} min-w-0`}
            aria-labelledby={headingId}
            aria-describedby={error ? "contact-form-error" : undefined}
          >
            <fieldset className={`${styles.formGrid} border-0 p-0 m-0 min-w-0`}>
              <legend className="sr-only">Contact form</legend>
              <div className={styles.formField}>
                <label htmlFor="contact-name" className={styles.formLabel}>
                  NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="contact-email" className={styles.formLabel}>
                  EMAIL
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={styles.inputField}
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldCompany}`}>
                <label htmlFor="contact-company" className={styles.formLabel}>
                  COMPANY <span className={styles.formLabelOptional}>(optional)</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  maxLength={120}
                  autoComplete="organization"
                  placeholder="Company or agency"
                  className={styles.inputField}
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldMessage}`}>
                <label htmlFor="contact-message" className={styles.formLabel}>
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  spellCheck
                  autoComplete="off"
                  placeholder="e.g. Senior RN role, Expo stack, remote EU, start Q3…"
                  className={`${styles.inputField} ${styles.messageField}`}
                />
              </div>
              <div className={styles.formActions}>
                <ContactSubmitButton success={success} error={error} />
              </div>
            </fieldset>
          </form>

          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
