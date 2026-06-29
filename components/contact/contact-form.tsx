"use client";

import { useCallback, useEffect, useMemo, useRef, useActionState, useState } from "react";
import { ToastContainer } from "react-toastify/unstyled";
import { ensureRecaptchaLoaded } from "@/lib/recaptcha-client";
import {
  CONTACT_FORM_INITIAL_STATE,
  contactFormFeedbackMessage,
  contactFormFeedbackVariant,
  submitContactForm,
  type ContactFormFeedbackVariant,
} from "@/lib/contact-form";
import { toast } from "react-toastify/unstyled";
import { ContactSubmitButton } from "@/components/contact/contact-submit-button";
import { FieldHint } from "@/components/contact/field-hint";
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
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-section.module.css";

interface ContactFormProps {
  headingId: string;
}

export function ContactForm({ headingId }: ContactFormProps) {
  const [state, formAction] = useActionState(submitContactForm, CONTACT_FORM_INITIAL_STATE);
  const [clientFieldError, setClientFieldError] = useState<ContactFieldValidationFailure | null>(null);
  const [dismissedStatusTs, setDismissedStatusTs] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<FormData | null>(null);
  const recaptchaPrimed = useRef(false);
  const lastHandledTs = useRef(0);

  const fieldError = useMemo(() => {
    if (state.success) return null;

    return (
      clientFieldError
      ?? (state.field && state.error ? { field: state.field, error: state.error } : null)
    );
  }, [clientFieldError, state.success, state.field, state.error]);

  const formStatus = useMemo(() => {
    if (state.ts === 0 || state.ts === dismissedStatusTs) return "";

    const message = contactFormFeedbackMessage(state);
    if (!message) return "";
    if (!state.success && state.field) return "";

    return message;
  }, [state, dismissedStatusTs]);

  const primeRecaptcha = () => {
    if (recaptchaPrimed.current) return;
    recaptchaPrimed.current = true;
    void ensureRecaptchaLoaded().catch(() => {});
  };

  const success = state.success;

  const fieldMessage = useCallback(
    (field: ContactFormField) => (fieldError?.field === field ? fieldError.error : undefined),
    [fieldError],
  );

  const clearFieldError = useCallback((field: ContactFormField) => {
    setClientFieldError((current) => (current?.field === field ? null : current));
  }, []);

  const dismissFormStatus = useCallback(() => {
    setDismissedStatusTs(state.ts);
  }, [state.ts]);

  const handleFieldInput = useCallback(
    (field: ContactFormField) =>
      (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        clearContactFieldValidity(event);
        clearFieldError(field);
        dismissFormStatus();
      },
    [clearFieldError, dismissFormStatus],
  );

  function showFormFeedbackToast(variant: ContactFormFeedbackVariant, message: string) {
    switch (variant) {
      case "success":
        toast.success(message);
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

    if (variant === "success" && message) {
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

  const formStatusClassName = success
    ? `${styles.formStatus} ${styles.formStatusSuccess}`
    : styles.formStatus;

  const formStatusRole = formStatus ? (success ? "status" : "alert") : undefined;

  return (
    <>
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
            dismissFormStatus();
          } else {
            setClientFieldError(null);
          }
        }}
        onFocusCapture={primeRecaptcha}
        className={`panel ${styles.formPanel} min-w-0`}
        aria-labelledby={headingId}
      >
        <output
          htmlFor={`${CONTACT_FIELD_DOM_IDS.name} ${CONTACT_FIELD_DOM_IDS.email} ${CONTACT_FIELD_DOM_IDS.message} ${CONTACT_FIELD_DOM_IDS.consent}`}
          role={formStatusRole}
          aria-live="polite"
          aria-atomic="true"
          className={formStatusClassName}
        >
          {formStatus}
        </output>

        <fieldset className={`${styles.formGrid} border-0 p-0 m-0 min-w-0`}>
          <legend className="sr-only">{UI_LABELS.contact.formLegend}</legend>
          <div className={styles.formField}>
            <label htmlFor={CONTACT_FIELD_DOM_IDS.name} className={styles.formLabel}>
              {UI_LABELS.contact.name}
            </label>
            <input
              id={CONTACT_FIELD_DOM_IDS.name}
              type="text"
              name="name"
              required
              minLength={CONTACT_NAME_MIN_LENGTH}
              maxLength={100}
              autoComplete="name"
              enterKeyHint="next"
              placeholder={UI_LABELS.contact.namePlaceholder}
              disabled={success}
              aria-invalid={fieldMessage("name") ? true : undefined}
              aria-describedby={fieldMessage("name") ? CONTACT_FIELD_ERROR_IDS.name : undefined}
              onInput={handleFieldInput("name")}
              className={styles.inputField}
            />
            <FieldHint id={CONTACT_FIELD_ERROR_IDS.name} message={fieldMessage("name")} />
          </div>
          <div className={styles.formField}>
            <label htmlFor={CONTACT_FIELD_DOM_IDS.email} className={styles.formLabel}>
              {UI_LABELS.contact.email}
            </label>
            <input
              id={CONTACT_FIELD_DOM_IDS.email}
              type="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
              enterKeyHint="next"
              inputMode="email"
              spellCheck={false}
              placeholder={UI_LABELS.contact.emailPlaceholder}
              disabled={success}
              aria-invalid={fieldMessage("email") ? true : undefined}
              aria-describedby={fieldMessage("email") ? CONTACT_FIELD_ERROR_IDS.email : undefined}
              onInput={handleFieldInput("email")}
              className={styles.inputField}
            />
            <FieldHint id={CONTACT_FIELD_ERROR_IDS.email} message={fieldMessage("email")} />
          </div>
          <div className={`${styles.formField} ${styles.formFieldCompany}`}>
            <label htmlFor="contact-company" className={styles.formLabel}>
              {UI_LABELS.contact.company}{" "}
              <span className={styles.formLabelOptional}>{UI_LABELS.contact.companyOptional}</span>
            </label>
            <input
              id="contact-company"
              type="text"
              name="company"
              maxLength={120}
              autoComplete="organization"
              enterKeyHint="next"
              placeholder={UI_LABELS.contact.companyPlaceholder}
              disabled={success}
              className={styles.inputField}
            />
          </div>
          <div className={`${styles.formField} ${styles.formFieldMessage}`}>
            <label htmlFor={CONTACT_FIELD_DOM_IDS.message} className={styles.formLabel}>
              {UI_LABELS.contact.message}
            </label>
            <textarea
              id={CONTACT_FIELD_DOM_IDS.message}
              name="message"
              required
              minLength={CONTACT_MESSAGE_MIN_LENGTH}
              maxLength={2000}
              rows={5}
              spellCheck
              autoComplete="off"
              enterKeyHint="send"
              placeholder={UI_LABELS.contact.messagePlaceholder}
              disabled={success}
              aria-invalid={fieldMessage("message") ? true : undefined}
              aria-describedby={fieldMessage("message") ? CONTACT_FIELD_ERROR_IDS.message : undefined}
              onInput={handleFieldInput("message")}
              className={`${styles.inputField} ${styles.messageField}`}
            />
            <FieldHint id={CONTACT_FIELD_ERROR_IDS.message} message={fieldMessage("message")} />
          </div>
          <div className={`${styles.formField} ${styles.formFieldConsent}`}>
            <PrivacyConsentField
              id={CONTACT_FIELD_DOM_IDS.consent}
              disabled={success}
              errorMessage={fieldMessage("consent")}
              errorId={CONTACT_FIELD_ERROR_IDS.consent}
              onClearError={() => clearFieldError("consent")}
            />
            <FieldHint id={CONTACT_FIELD_ERROR_IDS.consent} message={fieldMessage("consent")} />
          </div>
          <div className={styles.formActions}>
            <ContactSubmitButton success={success} />
          </div>
        </fieldset>
      </form>

      <ToastContainer theme="dark" position="bottom-right" aria-label={UI_LABELS.contact.toastRegion} />
    </>
  );
}
