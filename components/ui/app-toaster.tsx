"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/ui/react-toastify.css";
import { UI_LABELS } from "@/lib/content/ui-labels";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/** Toast host for the contact form — CSS loads only with this island (homepage contact). */
export function AppToaster() {
  const isClient = useIsClient();
  if (!isClient) return null;

  return createPortal(
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
  );
}
