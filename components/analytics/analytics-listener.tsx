"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

/**
 * One delegated click listener for CTA, phone, email and outbound link tracking, so pages stay server components.
 * Mark CTAs with data-cta="<location>" (for example data-cta="home-hero").
 */
export function AnalyticsListener() {
  useEffect(() => {
    captureAttribution();

    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      const cta = target?.closest("[data-cta]") as HTMLElement | null;
      const location_ = cta?.dataset.cta ?? link?.closest("[data-area]")?.getAttribute("data-area") ?? "body";

      if (cta) {
        track("cta_click", {
          cta_label: (cta.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
          cta_location: location_,
          link_url: link?.getAttribute("href") ?? undefined,
        });
      }
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) return track("phone_click", { link_location: location_ });
      if (href.startsWith("mailto:")) return track("email_click", { link_location: location_ });
      try {
        const url = new URL(link.href, location.href);
        if ((url.protocol === "http:" || url.protocol === "https:") && url.host !== location.host) {
          // Origin and path only: query strings can carry identifiers.
          track("outbound_click", { link_url: `${url.origin}${url.pathname}`, link_domain: url.hostname });
        }
      } catch {
        /* ignore invalid URLs */
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
