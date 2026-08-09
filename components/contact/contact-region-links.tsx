"use client";

import { useSyncExternalStore } from "react";
import { Download, Phone } from "lucide-react";
import {
  getContactRegionFromClient,
  getServerContactRegion,
  phoneForRegion,
} from "@/lib/contact-region";
import { getClientCvLink, getServerCvLink } from "@/lib/contact-cv";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-aside.module.css";

const NOOP_SUBSCRIBE = () => () => {};

function useContactRegion() {
  return useSyncExternalStore(NOOP_SUBSCRIBE, getContactRegionFromClient, getServerContactRegion);
}

function useCvLink() {
  return useSyncExternalStore(NOOP_SUBSCRIBE, getClientCvLink, getServerCvLink);
}

export function ContactPhoneCard() {
  const region = useContactRegion();
  const phone = phoneForRegion(region);

  return (
    <a href={`tel:${phone.e164}`} className={`${styles.linkCard} no-underline`}>
      <div className="icon-well icon-well-md">
        <Phone size={14} className="text-primary" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{UI_LABELS.contact.phone}</div>
        <div className="mono-sm text-text-dim">{phone.display}</div>
      </div>
    </a>
  );
}

export function ContactResumeButton() {
  const cv = useCvLink();

  return (
    <a href={cv.file} download className={`${styles.linkCard} w-full no-underline`}>
      <div className="icon-well icon-well-md">
        <Download size={14} className="text-primary" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">{cv.label}</div>
        <div className="mono-sm text-text-dim">{UI_LABELS.contact.pdfDownload}</div>
      </div>
    </a>
  );
}
