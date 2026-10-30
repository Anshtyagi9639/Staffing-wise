# Deployment

The site is fully static except the enquiry Server Action, so it runs on any Node.js 20.9+ host. **Vercel is recommended**
(zero-config Next.js, previews per branch, instant rollback, built-in firewall).

> Not deployed yet. The hosting platform, domain/DNS access and production credentials have not been provided (client
> questions 2, 4 and 5). Do not describe the site as live until the checks below pass on the production URL.

## Environments

| Environment | `NEXT_PUBLIC_SITE_ENV` | Indexing | Enquiry delivery |
|---|---|---|---|
| Local | unset | noindex | optional (unset = honest failure message) |
| Preview / staging | unset or `staging` | noindex, `X-Robots-Tag`, `robots.txt Disallow: /` | use a test inbox |
| Production | `production` | indexable | **required** |

## Netlify setup (current)

The repository root is the app. `netlify.toml` sets `npm run build`, publish `.next`, Node 22 and the Next.js Runtime
(`@netlify/plugin-nextjs` 5.16.4, pinned in devDependencies). In Netlify → Site configuration → Environment variables, set the same
variables as listed for Vercel below (production scope only for `NEXT_PUBLIC_SITE_ENV=production`), then trigger a redeploy. The
in-app rate limiter is per function instance; add a Netlify rate-limit rule for POST requests if available on the plan.

## Vercel setup (alternative)

1. Push this folder to a private Git repository (it is self-contained; `.gitignore` excludes `.env*`, the client `.docx`, builds).
2. Vercel → New Project → import the repo. Framework: Next.js. Root directory: the repository root. Build: `npm run build`.
   Install: `npm ci`. Node 20 or 22.
3. Environment variables (Production scope):
   - `NEXT_PUBLIC_SITE_ENV=production`
   - `NEXT_PUBLIC_SITE_URL=https://www.staffingwise.ie`
   - `EMAIL_API_KEY`, `EMAIL_FROM`, `ENQUIRY_TO_EMAIL` (Resend; verify the `staffingwise.ie` sending domain in Resend: SPF, DKIM, DMARC DNS records) and/or `ENQUIRY_WEBHOOK_URL` + `ENQUIRY_WEBHOOK_SECRET`
   - Tracking IDs when available (see analytics-and-tracking.md). `NEXT_PUBLIC_*` values are baked in at build time: **redeploy after changing them**.
   - Preview scope: the same but **without** `NEXT_PUBLIC_SITE_ENV=production`, and a test inbox.
4. Domains: add `www.staffingwise.ie` (primary) and `staffingwise.ie` (redirect to www). Update DNS at the registrar (currently
   pointing to Wix): `CNAME www → cname.vercel-dns.com` and the apex `A` record Vercel gives. HTTPS is automatic.
5. Firewall: add a rate-limit rule for `POST` requests to `/contact-us` (for example 10 per minute per IP). The in-app limiter
   (`lib/enquiry/guards.ts`) is per server instance, so on serverless it is a second line of defence only.

Other hosts (Netlify, Render, a VPS with `npm run build && npm start` behind Nginx) work the same way. Set the same variables,
run Node 20+, and terminate TLS at the proxy.

## Pre-launch checklist

- [ ] Client questions 1 to 5 answered; Privacy Notice and Cookie Policy placeholders replaced and legally approved.
- [ ] `npm run check` passes (lint, typecheck, build).
- [ ] Production env vars set; redeployed.
- [ ] Send a real test enquiry on production; confirm it arrives at `ENQUIRY_TO_EMAIL` with the reply-to set to the visitor.
- [ ] Temporarily break the email key in a preview deployment and confirm the form shows the failure message (no false success).
- [ ] `npm run test:site -- --url https://www.staffingwise.ie`: all checks pass (robots allows, sitemap URLs 200, JSON-LD valid, redirects 308, HSTS present).
- [ ] Check that private files cannot be requested: `/.env`, `/.env.local`, `/package.json`, `/README.md`, `/docs/client-questions.md`, `/Staffing_Wise_Website_Content.docx` must all return 404 (only `public/` is served).
- [ ] Old URLs redirect: `/about`, `/services`, `/contact`, `/blog`, `/post/why-we-chose-india`.
- [ ] Search Console and Bing set up, sitemap submitted (seo-and-aeo.md).
- [ ] GA4 DebugView shows `page_view`, `cta_click`, `generate_lead` with consent granted, and nothing without it.
- [ ] Lighthouse (mobile) on Home, Customs and Contact; record the scores in qa-report.md.

## Rollback

- **Vercel:** Deployments → choose the last good deployment → *Instant Rollback* (seconds, no rebuild). Or `vercel rollback`.
- **Git:** revert the offending commit and push; the host redeploys.
- **DNS fallback (launch day only):** keep the Wix site published until the new site is verified. Pointing DNS back restores it
  (TTL permitting; lower the TTL to 300 s a day before launch).

## Security notes

- Secrets are server-only (no `NEXT_PUBLIC_` prefix) and never sent to the browser; `.env*` is git-ignored.
- Enquiries: Zod validation on the server, honeypot, minimum fill time, per-IP rate limit, duplicate-submission guard, HTML-escaped
  email content, CR/LF stripped from header-bound values, visitor address used only as `reply_to`. Server Actions only accept
  POST and check the Origin header.
- Errors shown to visitors are generic; provider details stay in server logs, which never contain the enquiry content.
- Headers: CSP (`frame-ancestors 'none'`, `object-src 'none'`, `base-uri`, `form-action`), `X-Frame-Options: DENY`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, COOP, HSTS (production). `script-src` is not restricted because GTM can inject tags.
  Tighten it once the final tag list is fixed.
- No production browser source maps. `npm audit --omit=dev` reported 0 vulnerabilities on 30 Oct 2026 (Next.js 16.4.3).
