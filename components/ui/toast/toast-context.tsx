"use client";

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

export type ToastVariant = "success" | "error" | "warning";

export type ToastItem = {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  phase: "visible" | "exiting";
};

type ToastInput = {
  title?: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

export type ToastApi = {
  show: (input: ToastInput) => string;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  dismiss: (id: string) => void;
};

type ToastContextValue = ToastApi & {
  toast: ToastItem | null;
  startExit: (id: string) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 5200;

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const dismissTimerRef = useRef<number | null>(null);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current !== null) {
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      clearDismissTimer();
      setToast((current) => (current?.id === id ? null : current));
    },
    [clearDismissTimer],
  );

  const startExit = useCallback(
    (id: string) => {
      clearDismissTimer();
      setToast((current) => {
        if (!current || current.id !== id || current.phase === "exiting") return current;
        return { ...current, phase: "exiting" };
      });
    },
    [clearDismissTimer],
  );

  const dismiss = useCallback(
    (id: string) => {
      startExit(id);
    },
    [startExit],
  );

  const show = useCallback(
    ({ title, message, variant = "error", durationMs = DEFAULT_DURATION_MS }: ToastInput) => {
      const id = crypto.randomUUID();
      clearDismissTimer();
      setToast({ id, title, message, variant, phase: "visible" });

      dismissTimerRef.current = window.setTimeout(() => startExit(id), durationMs);
      return id;
    },
    [clearDismissTimer, startExit],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (message, title) => show({ message, title, variant: "success" }),
      error: (message, title) => show({ message, title, variant: "error" }),
      warning: (message, title) => show({ message, title, variant: "warning" }),
      dismiss,
    }),
    [dismiss, show],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      ...api,
      toast,
      startExit,
      removeToast,
    }),
    [api, removeToast, startExit, toast],
  );

  useEffect(() => () => clearDismissTimer(), [clearDismissTimer]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  const { show, success, error, warning, dismiss } = context;
  return useMemo(
    () => ({ show, success, error, warning, dismiss }),
    [dismiss, error, show, success, warning],
  );
}

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
}
