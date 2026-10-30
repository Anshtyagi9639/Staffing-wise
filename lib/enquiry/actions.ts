"use server";

import { enquiryMetaSchema, enquirySchema, type EnquiryInput, type EnquiryResult } from "@/lib/validation/enquiry";
import { site } from "@/lib/site";
import { deliverEnquiry } from "./deliver";
import { clientIp, isRateLimited, rememberSubmission } from "./guards";

const SEND_FAILED = `We couldn't send your enquiry just now. Please try again, or email ${site.email} or call ${site.phone.display}.`;
/** Humans take longer than this to complete the form; most bots do not. */
const MIN_FILL_MS = 3000;

/**
 * Server-side enquiry handler. Server Actions are POST-only and Next.js checks the Origin header, which protects
 * against cross-site submission. Success is reported only when the configured delivery channel accepts the enquiry.
 */
export async function submitEnquiry(input: unknown, meta: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof EnquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, reason: "validation", message: "Some details need attention.", fieldErrors };
  }
  const metaParsed = enquiryMetaSchema.safeParse(meta);
  if (!metaParsed.success) return { ok: false, reason: "validation", message: "Please reload the page and try again." };
  const { startedAt, submissionId, pagePath, attribution } = metaParsed.data;

  // Honeypot filled or impossibly fast: report success so bots learn nothing, but deliver nothing.
  if (parsed.data.website || Date.now() - startedAt < MIN_FILL_MS) {
    console.warn("[enquiry] Discarded a submission that failed the spam checks.");
    return { ok: true };
  }

  // A repeated submission of the same form (double click, retry after a slow network) is not delivered twice,
  // and is checked first so it does not count towards the rate limit.
  const seen = rememberSubmission(submissionId);
  if (seen === "delivered") return { ok: true };
  if (seen === "in-flight") return { ok: false, reason: "delivery", message: "Your enquiry is still being sent. Please wait a moment." };

  if (isRateLimited(`enquiry:${await clientIp()}`)) {
    rememberSubmission(submissionId, "failed");
    return { ok: false, reason: "rate_limited", message: "Several enquiries have been sent from this connection. Please wait a few minutes, or contact us by email or phone." };
  }

  const outcome = await deliverEnquiry(parsed.data, { pagePath, attribution: attribution ?? {} });
  rememberSubmission(submissionId, outcome.sent ? "delivered" : "failed");
  return outcome.sent ? { ok: true } : { ok: false, reason: "delivery", message: SEND_FAILED };
}
