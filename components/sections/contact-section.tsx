"use client";

import { useCallback, useEffect, useMemo, useRef, useActionState, useState } from "react";
import { ensureRecaptchaLoaded } from "@/lib/recaptcha-client";
import {
  CONTACT_FORM_INITIAL_STATE,
  contactFormFeedbackMessage,
  contactFormFeedbackVariant,
  submitContactForm,
  type ContactFormFeedbackVariant,
} from "@/lib/contact-form";
import { toast } from "react-toastify/unstyled";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { ContactSubmitButton } from "@/components/contact/contact-submit-button";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import {
  CONTACT_FIELD_DOM_IDS,
  CONTACT_FIELD_ERROR_IDS,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MIN_LENGTH,
  type ContactFormField,
  type ContactFieldValidationFailure,
  applyContactFieldFailure,
  clearContactFieldValidity,
  focusContactField,
  getContactFormFailure,
} from "@/lib/contact-form-rules";
import { PRIVACY_CONSENT_FIELD } from "@/lib/privacy-consent";
import styles from "@/styles/sections/contact-section.module.css";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="sr-only">
      {message}
    </p>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, CONTACT_FORM_INITIAL_STATE);
  const [clientFieldError, setClientFieldError] = useState<ContactFieldValidationFailure | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<FormData | null>(null);
  const recaptchaPrimed = useRef(false);
  const lastHandledTs = useRef(0);

  if (state.success && clientFieldError) {
    setClientFieldError(null);
  }

  const fieldError = useMemo(
    () =>
      clientFieldError
      ?? (!state.success && state.field && state.error
        ? { field: state.field, error: state.error }
        : null),
    [clientFieldError, state.success, state.field, state.error],
  );

  const primeRecaptcha = () => {
    if (recaptchaPrimed.current) return;
    recaptchaPrimed.current = true;
    void ensureRecaptchaLoaded().catch(() => {});
  };

  const success = state.success;
  const headingId = sectionHeadingId("contact");

  const fieldMessage = useCallback(
    (field: ContactFormField) => (fieldError?.field === field ? fieldError.error : undefined),
    [fieldError],
  );

  const clearFieldError = useCallback((field: ContactFormField) => {
    setClientFieldError((current) => (current?.field === field ? null : current));
  }, []);

  const handleFieldInput = useCallback(
    (field: ContactFormField) =>
      (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        clearContactFieldValidity(event);
        clearFieldError(field);
      },
    [clearFieldError],
  );

  function showFormErrorToast(message: string) {
    toast.error(message);
  }

  function showFormFeedbackToast(variant: ContactFormFeedbackVariant, message: string) {
    switch (variant) {
      case "success":
        toast.success(message, { role: "status" });
        break;
      case "warning":
        toast.warning(message);
        break;
      case "error":
        toast.error(message);
        break;
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
      showFormFeedbackToast(variant, message);
    }

    if (state.success) {
      formRef.current?.reset();
      draftRef.current = null;
      return;
    }

    if (state.error) {
      restoreDraftFields();
      if (state.field) {
        focusContactField(state.field);
      }
    }
  }, [state]);

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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] gap-8 lg:gap-12 lg:items-start">
          <form
            ref={formRef}
            action={formAction}
            noValidate
            onSubmit={(event) => {
              draftRef.current = new FormData(event.currentTarget);

              const failure = getContactFormFailure(event.currentTarget);
              if (failure) {
                event.preventDefault();
                applyContactFieldFailure(event.currentTarget, failure);
                setClientFieldError(failure);
                showFormErrorToast(failure.error);
              } else {
                setClientFieldError(null);
              }
            }}
            onFocusCapture={primeRecaptcha}
            className={`panel ${styles.formPanel} min-w-0`}
            aria-labelledby={headingId}
          >
            <fieldset className={`${styles.formGrid} border-0 p-0 m-0 min-w-0`}>
              <legend className="sr-only">Contact form</legend>
              <div className={styles.formField}>
                <label htmlFor={CONTACT_FIELD_DOM_IDS.name} className={styles.formLabel}>
                  Name
                </label>
                <FieldError id={CONTACT_FIELD_ERROR_IDS.name} message={fieldMessage("name")} />
                <input
                  id={CONTACT_FIELD_DOM_IDS.name}
                  type="text"
                  name="name"
                  required
                  minLength={CONTACT_NAME_MIN_LENGTH}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  disabled={success}
                  aria-invalid={fieldMessage("name") ? true : undefined}
                  aria-describedby={fieldMessage("name") ? CONTACT_FIELD_ERROR_IDS.name : undefined}
                  onInput={handleFieldInput("name")}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor={CONTACT_FIELD_DOM_IDS.email} className={styles.formLabel}>
                  Email
                </label>
                <FieldError id={CONTACT_FIELD_ERROR_IDS.email} message={fieldMessage("email")} />
                <input
                  id={CONTACT_FIELD_DOM_IDS.email}
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@company.com"
                  disabled={success}
                  aria-invalid={fieldMessage("email") ? true : undefined}
                  aria-describedby={fieldMessage("email") ? CONTACT_FIELD_ERROR_IDS.email : undefined}
                  onInput={handleFieldInput("email")}
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
                <label htmlFor={CONTACT_FIELD_DOM_IDS.message} className={styles.formLabel}>
                  Message
                </label>
                <FieldError id={CONTACT_FIELD_ERROR_IDS.message} message={fieldMessage("message")} />
                <textarea
                  id={CONTACT_FIELD_DOM_IDS.message}
                  name="message"
                  required
                  minLength={CONTACT_MESSAGE_MIN_LENGTH}
                  maxLength={2000}
                  rows={5}
                  spellCheck
                  autoComplete="off"
                  placeholder="e.g. Senior RN role, Expo stack, remote EU, start Q3…"
                  disabled={success}
                  aria-invalid={fieldMessage("message") ? true : undefined}
                  aria-describedby={fieldMessage("message") ? CONTACT_FIELD_ERROR_IDS.message : undefined}
                  onInput={handleFieldInput("message")}
                  className={`${styles.inputField} ${styles.messageField}`}
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldConsent}`}>
                <FieldError id={CONTACT_FIELD_ERROR_IDS.consent} message={fieldMessage("consent")} />
                <PrivacyConsentField
                  id={CONTACT_FIELD_DOM_IDS.consent}
                  disabled={success}
                  errorMessage={fieldMessage("consent")}
                  errorId={CONTACT_FIELD_ERROR_IDS.consent}
                  onClearError={() => clearFieldError("consent")}
                />
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
