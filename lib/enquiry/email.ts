import "server-only";
import type { EnquiryInput } from "@/lib/validation/enquiry";
import { serviceLabel } from "@/lib/validation/enquiry";

/**
 * Sends the enquiry notification through Resend (https://resend.com) using its REST API. Server-side only.
 *
 * Required:  EMAIL_API_KEY (Resend key), EMAIL_FROM (verified sender, e.g. "Staffing Wise Website <website@staffingwise.ie>"),
 *            ENQUIRY_TO_EMAIL (comma-separated recipients).
 * Optional:  EMAIL_API_URL (override the endpoint, used for testing).
 */
export type EmailOutcome = { sent: true; id?: string } | { sent: false; reason: "not-configured" | "failed" };
export type EnquiryContext = { pagePath: string; attribution: Record<string, string> };

const SUBJECT_PREFIX = "New Staffing Wise website enquiry";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Strips control characters (including CR/LF) from single-line values to prevent header injection. */
function singleLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}

function multiLine(value: string): string {
  return value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export function buildEnquiryEmail(enquiry: EnquiryInput, context: EnquiryContext, submittedAt = new Date()) {
  const service = serviceLabel(enquiry.service);
  const fields: [string, string][] = [
    ["Name", singleLine(enquiry.name)],
    ["Company", singleLine(enquiry.company)],
    ["Work email", singleLine(enquiry.email)],
    ["Phone", singleLine(enquiry.phone) || "Not provided"],
    ["Service of interest", service],
    ["Staff required", enquiry.staffCount || "Not provided"],
    ["Working hours / time zone", singleLine(enquiry.hours) || "Not provided"],
    ["Systems / software", singleLine(enquiry.systems) || "Not provided"],
  ];
  const source: [string, string][] = [
    ["Submitted from page", singleLine(context.pagePath)],
    ...Object.entries(context.attribution).map(([k, v]) => [k.replace(/_/g, " "), singleLine(v)] as [string, string]),
  ];
  const message = multiLine(enquiry.message);
  const when = `${new Intl.DateTimeFormat("en-IE", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Dublin" }).format(submittedAt)} (Irish time)`;

  const text = [
    "New website enquiry",
    "",
    ...fields.map(([k, v]) => `${k}: ${v}`),
    "",
    "Role or tasks:",
    message,
    "",
    ...source.map(([k, v]) => `${k}: ${v}`),
    `Submitted at: ${when}`,
    "Privacy notice acknowledged: yes",
  ].join("\n");

  const row = (k: string, v: string) =>
    `<tr><th align="left" valign="top" style="padding:7px 16px 7px 0;color:#4f6b76;font-weight:600;white-space:nowrap">${escapeHtml(k)}</th><td style="padding:7px 0;color:#0b1f26">${escapeHtml(v)}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f2f6f7;font-family:Arial,sans-serif;font-size:15px;line-height:1.5">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden">
<tr><td style="background:#09333f;padding:20px 24px;color:#ffffff;font-size:20px;font-weight:700">New website enquiry <span style="color:#f5ee31">&middot; Staffing Wise</span></td></tr>
<tr><td style="padding:20px 24px">
<table role="presentation" style="border-collapse:collapse">${fields.map(([k, v]) => row(k, v)).join("")}</table>
<p style="margin:16px 0 6px;color:#4f6b76;font-weight:600">Role or tasks</p>
<div style="white-space:pre-wrap;padding:12px 14px;background:#f2f6f7;border-left:4px solid #f7931e;border-radius:0 4px 4px 0;color:#0b1f26">${escapeHtml(message)}</div>
<table role="presentation" style="border-collapse:collapse;margin-top:16px;font-size:13px">${source.map(([k, v]) => row(k, v)).join("")}</table>
<p style="margin:16px 0 0;color:#4f6b76;font-size:13px">Submitted at ${escapeHtml(when)}. Privacy notice acknowledged. Reply to this email to respond to ${escapeHtml(fields[0][1])} directly.</p>
</td></tr></table></body></html>`;

  return { subject: `${SUBJECT_PREFIX}: ${service}`, text, html, replyTo: singleLine(enquiry.email) };
}

export async function sendEnquiryEmail(enquiry: EnquiryInput, context: EnquiryContext): Promise<EmailOutcome> {
  const apiKey = process.env.EMAIL_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !to || !from) return { sent: false, reason: "not-configured" };

  const email = buildEnquiryEmail(enquiry, context);
  try {
    const res = await fetch(process.env.EMAIL_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: email.replyTo, // the visitor's address is only ever used as reply-to, never as the sender
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      // Provider detail stays in server logs; never includes the enquiry content.
      console.error(`[enquiry-email] Provider rejected the email: ${res.status} ${(await res.text().catch(() => "")).slice(0, 300)}`);
      return { sent: false, reason: "failed" };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    console.info(`[enquiry-email] Accepted by provider${data.id ? ` (id ${data.id})` : ""}.`);
    return { sent: true, id: data.id };
  } catch (error) {
    console.error("[enquiry-email] Request to provider failed", error instanceof Error ? error.message : "unknown error");
    return { sent: false, reason: "failed" };
  }
}
