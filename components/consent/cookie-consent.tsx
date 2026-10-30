"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OPEN_COOKIE_SETTINGS_EVENT, readConsent, writeConsent } from "@/lib/consent";

function Toggle({ id, label, description, checked, disabled, onChange }: { id: string; label: string; description: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-brand border border-line p-4">
      <div>
        <label htmlFor={id} className="font-semibold text-navy-900">
          {label}
        </label>
        <p className="mt-1 text-[0.9rem] text-ink-soft">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-navy-900"
      />
    </div>
  );
}

/**
 * Cookie banner with equal-weight accept and reject, plus granular settings. Nothing non-essential runs until the visitor
 * opts in; the choice is kept in a first-party cookie for 180 days. Shown only when an analytics or marketing tool is
 * configured. Wording requires legal review before launch (docs/client-questions.md).
 */
export function CookieConsent({ hasAnalytics, hasMarketing }: { hasAnalytics: boolean; hasMarketing: boolean }) {
  const [showBanner, setShowBanner] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    // The cookie can only be read after hydration, to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowBanner(!existing);
    const open = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setManageOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const save = (choice: { analytics: boolean; marketing: boolean }) => {
    writeConsent({ analytics: hasAnalytics && choice.analytics, marketing: hasMarketing && choice.marketing });
    setShowBanner(false);
    setManageOpen(false);
  };

  const purposes = [hasAnalytics && "analytics cookies to understand how the site is used", hasMarketing && "marketing cookies to measure our advertising"].filter(Boolean).join(", and ");

  return (
    <>
      {showBanner ? (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-brand border border-line bg-white p-5 shadow-card sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <Cookie aria-hidden className="mt-0.5 size-5 shrink-0 text-ember-text" />
            <div>
              <h2 className="font-sans text-base font-bold text-navy-900">Cookies on this website</h2>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">
                We use essential cookies to make this site work. With your permission we would also like to use {purposes}. You can change your choice at
                any time. See our{" "}
                <Link href="/cookie-policy" className="link-inline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" size="sm" onClick={() => setManageOpen(true)}>
              Manage choices
            </Button>
            <Button variant="secondary" size="sm" onClick={() => save({ analytics: false, marketing: false })}>
              Reject non-essential
            </Button>
            <Button variant="secondary" size="sm" onClick={() => save({ analytics: true, marketing: true })}>
              Accept all
            </Button>
          </div>
        </section>
      ) : null}

      <Dialog.Root open={manageOpen} onOpenChange={setManageOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-navy-950/55" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[60] max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-brand bg-white p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="font-display text-2xl text-navy-900">Cookie settings</Dialog.Title>
              <Dialog.Close className="inline-flex size-10 items-center justify-center rounded-full hover:bg-mist" aria-label="Close cookie settings">
                <X aria-hidden className="size-5" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-2 text-[0.92rem] text-ink-soft">Choose which optional cookies we may use. Essential cookies are always on.</Dialog.Description>
            <div className="mt-5 space-y-3">
              <Toggle id="cookie-essential" label="Essential" description="Needed for the website and enquiry form to work, and to remember your cookie choice." checked disabled />
              {hasAnalytics ? (
                <Toggle id="cookie-analytics" label="Analytics" description="Google Analytics, to measure visits, enquiries and which pages are useful." checked={analytics} onChange={setAnalytics} />
              ) : null}
              {hasMarketing ? (
                <Toggle id="cookie-marketing" label="Marketing" description="Advertising measurement (such as Google Ads or LinkedIn), to see which campaigns lead to enquiries." checked={marketing} onChange={setMarketing} />
              ) : null}
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" size="sm" onClick={() => save({ analytics: false, marketing: false })}>
                Reject non-essential
              </Button>
              <Button variant="secondary" size="sm" onClick={() => save({ analytics, marketing })}>
                Save choices
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
