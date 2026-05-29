"use client";

import { CheckCircle, Loader2, Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import type { RefObject } from "react";

interface ContactSubmitButtonProps {
  success: boolean;
  error?: string;
  statusRef: RefObject<HTMLDivElement | null>;
}

export function ContactSubmitButton({ success, error, statusRef }: ContactSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending || success}
        aria-busy={pending || undefined}
        aria-disabled={pending || success || undefined}
        className={`flex items-center gap-2 font-semibold ${
          success ? "form-success-banner" : "btn-primary disabled:opacity-60"
        }`}
      >
        {success ? (
          <>
            <CheckCircle size={15} aria-hidden /> Message sent
          </>
        ) : pending ? (
          <>
            <Loader2 size={15} className="animate-spin" aria-hidden /> Sending...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden /> Send message
          </>
        )}
      </button>

      <div
        id="contact-form-status"
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
        className={error || success ? undefined : "sr-only"}
      >
        {success ? (
          <p className="text-xs text-success mono-sm m-0">Message sent successfully.</p>
        ) : null}
        {error ? (
          <p role="alert" className="text-xs text-error mono-sm m-0">
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
