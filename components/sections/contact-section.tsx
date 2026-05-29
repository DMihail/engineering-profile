"use client";

import { useEffect, useRef, useActionState } from "react";
import { ensureRecaptchaLoaded } from "@/lib/recaptcha-client";
import {
  CONTACT_FORM_INITIAL_STATE,
  submitContactForm,
} from "@/lib/contact-form";
import {
  contactFormFeedbackMessage,
  contactFormFeedbackTitle,
  contactFormFeedbackVariant,
} from "@/lib/contact-form-feedback";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { ContactSubmitButton } from "@/components/contact/contact-submit-button";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import { useToast } from "@/components/ui/toast/toast-provider";
import { resolveContactFieldErrors } from "@/lib/contact-form-field-errors";
import {
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MIN_LENGTH,
  focusContactField,
} from "@/lib/contact-form-validation";
import {
  clearContactFieldValidity,
  enforceExtendedContactRules,
  setContactFieldCustomMessage,
} from "@/lib/contact-form-html-validation";
import { PRIVACY_CONSENT_ERROR, PRIVACY_CONSENT_FIELD } from "@/lib/privacy-consent";
import { SITE_WORK_AUTHORIZATION } from "@/lib/config";
import styles from "@/styles/sections/contact-section.module.css";

export function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, CONTACT_FORM_INITIAL_STATE);
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<FormData | null>(null);
  const recaptchaPrimed = useRef(false);
  const lastHandledTs = useRef(0);

  const primeRecaptcha = () => {
    if (recaptchaPrimed.current) return;
    recaptchaPrimed.current = true;
    void ensureRecaptchaLoaded().catch(() => {});
  };

  const success = state.success;
  const error = !state.success ? state.error : undefined;
  const { firstField } = resolveContactFieldErrors(error);
  const headingId = sectionHeadingId("contact");

  function showFormErrorToast(message: string) {
    toast.error(message, contactFormFeedbackTitle("error"));
  }

  function handleFormInvalidCapture(event: React.InvalidEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    if (target.name === "name") {
      setContactFieldCustomMessage(target, "name");
      showFormErrorToast(target.validationMessage);
      return;
    }

    if (target.name === "email") {
      setContactFieldCustomMessage(target, "email");
      showFormErrorToast(target.validationMessage);
      return;
    }

    if (target.name === "message") {
      setContactFieldCustomMessage(target, "message");
      showFormErrorToast(target.validationMessage);
      return;
    }

    if (target.name === PRIVACY_CONSENT_FIELD) {
      target.setCustomValidity(PRIVACY_CONSENT_ERROR);
      showFormErrorToast(target.validationMessage);
    }
  }

  function restoreDraftFields() {
    const form = formRef.current;
    const draft = draftRef.current;
    if (!form || !draft) return;

    for (const name of ["name", "email", "company", "message"]) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.value = String(draft.get(name) ?? "");
      }
    }

    const consent = form.elements.namedItem(PRIVACY_CONSENT_FIELD);
    if (consent instanceof HTMLInputElement && consent.type === "checkbox") {
      consent.checked = draft.get(PRIVACY_CONSENT_FIELD) === "yes";
    }
  }

  useEffect(() => {
    if (state.ts === 0 || state.ts === lastHandledTs.current) return;
    lastHandledTs.current = state.ts;

    const variant = contactFormFeedbackVariant(state);
    const message = contactFormFeedbackMessage(state);

    if (variant && message) {
      const title = contactFormFeedbackTitle(variant);
      toast.show({ variant, title, message });
    }

    if (state.success) {
      formRef.current?.reset();
      draftRef.current = null;
      return;
    }

    if (state.error) {
      restoreDraftFields();
      if (firstField) {
        focusContactField(firstField);
      }
    }
  }, [firstField, state, toast]);

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
            onSubmit={(event) => {
              draftRef.current = new FormData(event.currentTarget);

              const extended = enforceExtendedContactRules(event.currentTarget);
              if (!extended.ok) {
                event.preventDefault();
                showFormErrorToast(extended.error);
              }
            }}
            onInvalidCapture={handleFormInvalidCapture}
            onFocusCapture={primeRecaptcha}
            className={`panel ${styles.formPanel} min-w-0`}
            aria-labelledby={headingId}
          >
            <fieldset className={`${styles.formGrid} border-0 p-0 m-0 min-w-0`}>
              <legend className="sr-only">Contact form</legend>
              <div className={styles.formField}>
                <label htmlFor="contact-name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  minLength={CONTACT_NAME_MIN_LENGTH}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  disabled={success}
                  onInput={clearContactFieldValidity}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="contact-email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@company.com"
                  disabled={success}
                  onInput={clearContactFieldValidity}
                  className={styles.inputField}
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldCompany}`}>
                <label htmlFor="contact-company" className={styles.formLabel}>
                  Company <span className={styles.formLabelOptional}>(optional)</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  maxLength={120}
                  autoComplete="organization"
                  placeholder="Company or agency"
                  disabled={success}
                  className={styles.inputField}
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldMessage}`}>
                <label htmlFor="contact-message" className={styles.formLabel}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={CONTACT_MESSAGE_MIN_LENGTH}
                  maxLength={2000}
                  rows={5}
                  spellCheck
                  autoComplete="off"
                  placeholder="e.g. Senior RN role, Expo stack, remote EU, start Q3…"
                  disabled={success}
                  onInput={clearContactFieldValidity}
                  className={`${styles.inputField} ${styles.messageField}`}
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldConsent}`}>
                <PrivacyConsentField id="contact-privacy-consent" disabled={success} />
              </div>
              <div className={styles.formActions}>
                <ContactSubmitButton success={success} />
              </div>
            </fieldset>
          </form>

          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
