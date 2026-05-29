"use client";

import { CheckCircle, Loader2, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export function ContactSubmitButton({ success, error }: { success: boolean; error?: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending || success}
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
      {error && (
        <p role="alert" aria-live="polite" className="text-xs text-error mono-sm">
          {error}
        </p>
      )}
    </>
  );
}
