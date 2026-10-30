import "server-only";
import type { EnquiryInput } from "@/lib/validation/enquiry";
import { serviceLabel } from "@/lib/validation/enquiry";
import { sendEnquiryEmail, type EnquiryContext } from "./email";

export type DeliveryOutcome = { sent: true; channel: "email" | "webhook" } | { sent: false; reason: "not-configured" | "failed" };

/**
 * Delivers an enquiry through the configured channels:
 *  - Email (Resend API) when EMAIL_API_KEY, EMAIL_FROM and ENQUIRY_TO_EMAIL are set.
 *  - Webhook (CRM, Zapier, Make, Power Automate…) when ENQUIRY_WEBHOOK_URL is set.
 * The visitor sees success if at least one configured channel accepted the enquiry. With neither configured, nothing is
 * stored and the visitor is told honestly to use email or phone instead.
 */
export async function deliverEnquiry(enquiry: EnquiryInput, context: EnquiryContext): Promise<DeliveryOutcome> {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  const [email, webhook] = await Promise.all([
    sendEnquiryEmail(enquiry, context),
    webhookUrl ? postToWebhook(webhookUrl, process.env.ENQUIRY_WEBHOOK_SECRET, enquiry, context) : Promise.resolve(null),
  ]);

  if (email.sent) return { sent: true, channel: "email" };
  if (webhook === true) return { sent: true, channel: "webhook" };
  if (email.reason === "not-configured" && webhook === null) {
    console.error("[enquiry] No delivery channel is configured (set the email or webhook variables). The enquiry was NOT delivered.");
    return { sent: false, reason: "not-configured" };
  }
  return { sent: false, reason: "failed" };
}

async function postToWebhook(url: string, secret: string | undefined, enquiry: EnquiryInput, context: EnquiryContext): Promise<boolean> {
  const { website: _honeypot, consent, ...fields } = enquiry;
  void _honeypot;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
      body: JSON.stringify({
        type: "staffing_wise_website_enquiry",
        receivedAt: new Date().toISOString(),
        enquiry: { ...fields, serviceLabel: serviceLabel(enquiry.service), privacyNoticeAcknowledged: consent },
        source: { pagePath: context.pagePath, ...context.attribution },
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) console.error(`[enquiry-webhook] Endpoint responded ${res.status}.`);
    return res.ok;
  } catch (error) {
    console.error("[enquiry-webhook] Request failed", error instanceof Error ? error.message : "unknown error");
    return false;
  }
}
