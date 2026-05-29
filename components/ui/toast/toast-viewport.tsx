"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import { useEffect } from "react";
import styles from "@/styles/ui/toast.module.css";
import { useToastContext, type ToastItem, type ToastVariant } from "./toast-context";

function ToastIcon({ variant }: { variant: ToastVariant }) {
  switch (variant) {
    case "success":
      return <CheckCircle2 size={16} aria-hidden />;
    case "warning":
      return <AlertTriangle size={16} aria-hidden />;
    case "error":
      return <AlertCircle size={16} aria-hidden />;
  }
}

function ToastCard({
  toast,
  onStartExit,
  onRemove,
}: {
  toast: ToastItem;
  onStartExit: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    if (toast.phase !== "exiting") return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    onRemove(toast.id);
  }, [onRemove, toast.id, toast.phase]);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target || toast.phase !== "exiting") return;
    onRemove(toast.id);
  };

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      data-phase={toast.phase}
      onAnimationEnd={handleAnimationEnd}
      className={`${styles.toast} ${styles[toast.variant]}`}
    >
      <span className={styles.iconWrap}>
        <ToastIcon variant={toast.variant} />
      </span>
      <div className={styles.content}>
        {toast.title ? <p className={styles.title}>{toast.title}</p> : null}
        <p className={styles.message}>{toast.message}</p>
      </div>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss notification"
        onClick={() => onStartExit(toast.id)}
      >
        <X size={14} aria-hidden />
      </button>
    </div>
  );
}

export function ToastViewport() {
  const { toast, startExit, removeToast } = useToastContext();

  return (
    <div className={styles.viewport} aria-label="Notifications">
      {toast ? (
        <ToastCard toast={toast} onStartExit={startExit} onRemove={removeToast} />
      ) : null}
    </div>
  );
}
