"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  useActionState,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify/unstyled";
import { ensureRecaptchaLoaded } from "@/lib/recaptcha-client";
import {
  CONTACT_FORM_INITIAL_STATE,
  contactFormFeedbackMessage,
  contactFormFeedbackVariant,
  submitContactForm,
  type ContactFormState,
} from "@/lib/contact-form";
import { ContactSubmitButton } from "@/components/contact/contact-submit-button";
import { ContactTextAreaField, ContactTextField } from "@/components/contact/contact-form-field";
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
import { SITE_EMAIL } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-form.module.css";

interface ContactFormProps {
  headingId: string;
}

function deriveFieldError(
  state: ContactFormState,
  clientFieldError: ContactFieldValidationFailure | null,
): ContactFieldValidationFailure | null {
  if (state.success) return null;
  return (
    clientFieldError
    ?? (state.field && state.error ? { field: state.field, error: state.error } : null)
  );
}

function deriveFormStatus(state: ContactFormState, dismissedStatusTs: number): string {
  if (state.ts === 0 || state.ts === dismissedStatusTs) return "";
  // Success uses a dedicated SR live region + toast — keep <output> for form-level errors.
  if (state.success) return "";

  const message = contactFormFeedbackMessage(state);
  if (!message) return "";
  if (state.field) return "";

  return message;
}

function deriveSuccessAnnouncement(state: ContactFormState): string {
  if (!state.success) return "";
  return contactFormFeedbackMessage(state) ?? "";
}

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function ContactForm({ headingId }: ContactFormProps) {
  const [state, formAction] = useActionState(submitContactForm, CONTACT_FORM_INITIAL_STATE);
  const [clientFieldError, setClientFieldError] = useState<ContactFieldValidationFailure | null>(null);
  const [dismissedStatusTs, setDismissedStatusTs] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<FormData | null>(null);
  const recaptchaPrimed = useRef(false);
  const lastHandledTs = useRef(0);

  // Pure derived state — no useMemo (React Compiler + cheap computation).
  const fieldError = deriveFieldError(state, clientFieldError);
  const formStatus = deriveFormStatus(state, dismissedStatusTs);
  const successAnnouncement = deriveSuccessAnnouncement(state);
  const success = state.success;

  const onSubmitResult = useEffectEvent((next: ContactFormState) => {
    const message = contactFormFeedbackMessage(next);
    if (contactFormFeedbackVariant(next) === "success" && message) {
      toast.success(message, { toastId: `contact-success-${next.ts}` });
    }

    if (next.success) {
      formRef.current?.reset();
      draftRef.current = null;
      return;
    }

    if (!next.error) return;

    const form = formRef.current;
    const draft = draftRef.current;
    if (form && draft) {
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

    if (next.field) {
      focusContactField(next.field);
    }
  });

  useEffect(() => {
    if (state.ts === 0 || state.ts === lastHandledTs.current) return;
    lastHandledTs.current = state.ts;
    onSubmitResult(state);
  }, [state]);

  const fieldMessage = (field: ContactFormField) =>
    fieldError?.field === field ? fieldError.error : undefined;

  const clearFieldError = (field: ContactFormField) => {
    setClientFieldError((current) => (current?.field === field ? null : current));
  };

  const dismissFormStatus = () => {
    setDismissedStatusTs(state.ts);
  };

  const handleFieldInput =
    (field: ContactFormField) =>
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearContactFieldValidity(event);
      clearFieldError(field);
      dismissFormStatus();
    };

  const primeRecaptcha = () => {
    if (recaptchaPrimed.current) return;
    recaptchaPrimed.current = true;
    void ensureRecaptchaLoaded().catch(() => {});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    draftRef.current = new FormData(event.currentTarget);

    const failure = getContactFormFailure(event.currentTarget);
    if (failure) {
      event.preventDefault();
      applyContactFieldFailure(event.currentTarget, failure);
      setClientFieldError(failure);
      dismissFormStatus();
      return;
    }

    setClientFieldError(null);
  };

  const isClient = useIsClient();
  const formStatusClassName = styles.formStatus;
  const formStatusRole = formStatus ? "alert" : undefined;

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        noValidate
        onSubmit={handleSubmit}
        onFocusCapture={primeRecaptcha}
        className={`panel ${styles.formPanel} min-w-0`}
        aria-labelledby={headingId}
      >
      {successAnnouncement ? (
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {successAnnouncement}
        </p>
      ) : null}

      {formStatus ? (
        <output
          htmlFor={`${CONTACT_FIELD_DOM_IDS.name} ${CONTACT_FIELD_DOM_IDS.email} ${CONTACT_FIELD_DOM_IDS.message} ${CONTACT_FIELD_DOM_IDS.consent}`}
          role={formStatusRole}
          aria-live="polite"
          aria-atomic="true"
          className={formStatusClassName}
        >
          {formStatus}
        </output>
      ) : null}

      <fieldset className={`${styles.formGrid} border-0 p-0 m-0 min-w-0`} disabled={success}>
        <legend className="sr-only">{UI_LABELS.contact.formLegend}</legend>

        <ContactTextField
          id={CONTACT_FIELD_DOM_IDS.name}
          name="name"
          label={UI_LABELS.contact.name}
          errorId={CONTACT_FIELD_ERROR_IDS.name}
          errorMessage={fieldMessage("name")}
          type="text"
          required
          minLength={CONTACT_NAME_MIN_LENGTH}
          maxLength={100}
          autoComplete="name"
          enterKeyHint="next"
          placeholder={UI_LABELS.contact.namePlaceholder}
          onInput={handleFieldInput("name")}
        />

        <ContactTextField
          id={CONTACT_FIELD_DOM_IDS.email}
          name="email"
          label={UI_LABELS.contact.email}
          errorId={CONTACT_FIELD_ERROR_IDS.email}
          errorMessage={fieldMessage("email")}
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          enterKeyHint="next"
          inputMode="email"
          spellCheck={false}
          placeholder={UI_LABELS.contact.emailPlaceholder}
          onInput={handleFieldInput("email")}
        />

        <ContactTextField
          id="contact-company"
          name="company"
          className={styles.formFieldCompany}
          label={
            <>
              {UI_LABELS.contact.company}{" "}
              <span className={styles.formLabelOptional}>{UI_LABELS.contact.companyOptional}</span>
            </>
          }
          errorId="contact-company-hint"
          type="text"
          maxLength={120}
          autoComplete="organization"
          enterKeyHint="next"
          placeholder={UI_LABELS.contact.companyPlaceholder}
        />

        <ContactTextAreaField
          id={CONTACT_FIELD_DOM_IDS.message}
          name="message"
          className={styles.formFieldMessage}
          label={UI_LABELS.contact.message}
          errorId={CONTACT_FIELD_ERROR_IDS.message}
          errorMessage={fieldMessage("message")}
          required
          minLength={CONTACT_MESSAGE_MIN_LENGTH}
          maxLength={2000}
          rows={5}
          spellCheck
          autoComplete="off"
          enterKeyHint="send"
          placeholder={UI_LABELS.contact.messagePlaceholder}
          onInput={handleFieldInput("message")}
        />

        <div className={`${styles.formField} ${styles.formFieldConsent}`}>
          <PrivacyConsentField
            id={CONTACT_FIELD_DOM_IDS.consent}
            errorMessage={fieldMessage("consent")}
            errorId={CONTACT_FIELD_ERROR_IDS.consent}
            onClearError={() => clearFieldError("consent")}
          />
          <FieldHint id={CONTACT_FIELD_ERROR_IDS.consent} message={fieldMessage("consent")} />
        </div>

        <div className={styles.formActions}>
          <ContactSubmitButton success={success} />
        </div>

        <p className={styles.formAlt}>
          {UI_LABELS.contact.emailAlternative}{" "}
          <a
            href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(UI_LABELS.contact.noScriptMailSubject)}`}
            className={styles.formAltLink}
          >
            {SITE_EMAIL}
          </a>
        </p>
      </fieldset>
      </form>

      {isClient
        ? createPortal(
            <ToastContainer
              theme="dark"
              position="bottom-right"
              autoClose={5000}
              newestOnTop
              closeOnClick
              pauseOnHover
              limit={3}
              aria-label={UI_LABELS.contact.toastRegion}
            />,
            document.body,
          )
        : null}
    </>
  );
}
