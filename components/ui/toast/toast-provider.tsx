"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "@/styles/ui/toast.module.css";

export type ToastVariant = "success" | "error" | "warning";

type ToastItem = {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  exiting?: boolean;
};

type ToastInput = {
  title?: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastContextValue = {
  show: (input: ToastInput) => string;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 5200;
const EXIT_ANIMATION_MS = 340;

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
    if (!toast.exiting) return;

    const timer = window.setTimeout(() => onRemove(toast.id), EXIT_ANIMATION_MS + 40);
    return () => window.clearTimeout(timer);
  }, [toast.exiting, toast.id, onRemove]);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target || !toast.exiting) return;
    onRemove(toast.id);
  };

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      onAnimationEnd={handleAnimationEnd}
      className={`${styles.toast} ${styles[toast.variant]} ${toast.exiting ? styles.toastExiting : styles.toastEnter}`}
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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    clearTimer(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, [clearTimer]);

  const startExit = useCallback((id: string) => {
    clearTimer(id);
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id && !toast.exiting ? { ...toast, exiting: true } : toast,
      ),
    );
  }, [clearTimer]);

  const dismiss = useCallback((id: string) => {
    startExit(id);
  }, [startExit]);

  const show = useCallback(
    ({ title, message, variant = "error", durationMs = DEFAULT_DURATION_MS }: ToastInput) => {
      const id = crypto.randomUUID();

      setToasts((current) => {
        for (const toast of current) {
          clearTimer(toast.id);
        }
        return [{ id, title, message, variant }];
      });

      const timer = window.setTimeout(() => startExit(id), durationMs);
      timersRef.current.set(id, timer);
      return id;
    },
    [clearTimer, startExit],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (message, title) => show({ message, title, variant: "success" }),
      error: (message, title) => show({ message, title, variant: "error" }),
      warning: (message, title) => show({ message, title, variant: "warning" }),
      dismiss,
    }),
    [dismiss, show],
  );

  useEffect(
    () => () => {
      for (const timer of timersRef.current.values()) {
        window.clearTimeout(timer);
      }
      timersRef.current.clear();
    },
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} aria-label="Notifications">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onStartExit={startExit}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
