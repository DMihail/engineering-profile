"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { UI_LABELS } from "@/lib/content/ui-labels";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function useResolvedToastTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const read = () => {
      const scheme = document.documentElement.getAttribute("data-color-scheme");
      if (scheme === "light" || scheme === "dark") {
        setTheme(scheme);
        return;
      }
      if (typeof window.matchMedia !== "function") {
        setTheme("dark");
        return;
      }
      setTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-color-scheme", "data-theme"],
    });
    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-color-scheme: light)")
        : null;
    mq?.addEventListener("change", read);
    return () => {
      observer.disconnect();
      mq?.removeEventListener("change", read);
    };
  }, []);

  return theme;
}

const ToastHost = dynamic(
  () =>
    import("@/components/ui/toast-host").then((mod) => mod.ToastHost),
  { ssr: false },
);

/** Toast host for the contact form — CSS + toastify load only with this island. */
export function AppToaster() {
  const isClient = useIsClient();
  const theme = useResolvedToastTheme();
  if (!isClient) return null;

  return createPortal(
    <ToastHost theme={theme} ariaLabel={UI_LABELS.contact.toastRegion} />,
    document.body,
  );
}
