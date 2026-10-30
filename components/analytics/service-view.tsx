"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";
import { track } from "@/lib/analytics";

/** Sends service_page_view once per visit to a service page (or once consent is given while on the page). */
export function ServiceView({ name }: { name: string }) {
  useEffect(() => {
    let sent = false;
    const send = () => {
      if (sent || !readConsent()?.analytics) return;
      track("service_page_view", { service_name: name });
      sent = true;
    };
    // Let the analytics tag initialise first, so the event follows the page_view.
    const timer = window.setTimeout(send, 1200);
    window.addEventListener(CONSENT_EVENT, send);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, send);
    };
  }, [name]);
  return null;
}
