import "server-only";
import { headers } from "next/headers";

/*
 * Per-instance, in-memory guards. Adequate for a single Node server. On serverless or multi-instance hosting each
 * instance keeps its own counters, so also enable the host's firewall / rate-limit rules for POST requests
 * (see docs/deployment.md), or swap these maps for a shared store such as Redis.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_REQUESTS;
  if (!limited) recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return limited;
}

type SubmissionState = "in-flight" | "delivered" | "failed";
const submissions = new Map<string, { state: SubmissionState; at: number }>();

/**
 * Without a state: registers the id and returns its previous state (undefined if new; a failed attempt may retry).
 * With a state: records the outcome.
 */
export function rememberSubmission(id: string, state?: SubmissionState): SubmissionState | undefined {
  const now = Date.now();
  for (const [k, v] of submissions) if (now - v.at > WINDOW_MS) submissions.delete(k);
  const previous = submissions.get(id)?.state;
  if (state) submissions.set(id, { state, at: now });
  else if (previous !== "delivered" && previous !== "in-flight") submissions.set(id, { state: "in-flight", at: now });
  return previous === "failed" ? undefined : previous;
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
