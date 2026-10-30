# QA and test results

Tested 30 October 2026 on Windows 11, Node 20.20.0, Next.js 16.4.3, Chrome (headless, via Playwright) against local production
builds (`next build` + `next start`). **The site has not been deployed**, so nothing here was measured on the production host or domain.

## Build and static checks

| Check | Result |
|---|---|
| `npm install` | OK, 403 packages |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm run lint` (ESLint, Next core-web-vitals + TypeScript + React Compiler rules) | 0 errors, 0 warnings |
| `npm run typecheck` (strict) | 0 errors |
| `npm run build` | OK; all 11 pages plus sitemap, robots, manifest, icons, OG image and llms.txt prerendered as static |

## Smoke test: `npm run test:site` (production mode, `NEXT_PUBLIC_SITE_ENV=production`)

All 35 checks passed:

- robots.txt allows crawling and references the sitemap; the sitemap lists 11 URLs, all returning 200
- each page has a unique title, a unique description, exactly one H1, a canonical matching its sitemap URL, and JSON-LD that parses
- legacy redirects return 308 to the right pages; an unknown URL returns 404
- private files return 404: `/.env*`, `/package.json`, `/README.md`, `/docs/…`, the client `.docx`, `/next.config.ts`
- CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy and HSTS are present; there is no X-Powered-By header

**Non-production mode** (default build, no `NEXT_PUBLIC_SITE_ENV`): `robots.txt` is `Disallow: /`, every page has
`<meta name="robots" content="noindex, nofollow">` and `X-Robots-Tag: noindex, nofollow`, and all other smoke checks pass.

Also checked: no heading levels skipped on any page; JSON-LD types per page as listed in seo-and-aeo.md; Open Graph image on every page.

## Visual inspection

Full-page screenshots of 12 URLs (11 pages + 404) at **1440px (desktop), 820px (tablet) and 390px (mobile)**, 36 in total, with
reduced motion. Automated per-screenshot checks: **no horizontal overflow, no broken images, exactly one H1, no console errors**
(the only console message is the expected 404 on the 404 page).

Defects found during inspection and fixed: header logo too tight to the top edge, hero H1 wrapping to four lines on desktop,
"Dublin 11" breaking across lines in the footer.

## Accessibility (axe-core 4.10, WCAG 2.0/2.1/2.2 A and AA plus best practices)

- First run: 13 issues. Step numerals had insufficient contrast (orange on white); the contact sidebar `<aside>` was nested in a section; the cookie table's scroll region was not focusable.
- After fixes: **0 violations on all 12 URLs at 1280px and 390px.**
- Lighthouse accessibility: 100 on Home, Customs and Contact.
- Also verified manually: skip link, visible focus ring, keyboard-operable menu, dropdown, accordion and dialogs (Radix), form errors announced and focused.

Automated tools do not catch everything. A manual screen-reader pass (NVDA or VoiceOver) is recommended before launch.

## Enquiry form

Tested with a local mock of the Resend API (`EMAIL_API_URL`):

| Scenario | Result |
|---|---|
| Empty submit | 5 inline errors (name, company, email, description, privacy acknowledgement); focus on the first field |
| `?service=customs` | Service preselected |
| Valid submit, provider accepts | Success message shown; email sent with correct to, from and reply-to; subject includes the service; UTM source and campaign plus landing page included; `<script>` in the message HTML-escaped |
| Double click | Second click blocked (button disabled); duplicate submission ids are not delivered twice |
| Provider returns 500 | Error message with phone and email; **no success shown** |
| No delivery channel configured | Error message with phone and email; **no success shown**; server logs "NOT delivered" |
| Rate limit (5 per 10 minutes per IP) | Submissions 1 to 5 succeeded (each with a double-click attempt), 6th got the rate-limit message. An early version counted blocked double-clicks towards the limit; fixed and re-tested |
| Third-party requests during form use without consent | None |

The spam checks (honeypot, minimum fill time under 3 s) return a silent "success" to bots without delivering, by design.

## Analytics and consent (test Measurement ID `G-QATEST1234`, local build only, not committed)

| Scenario | Result |
|---|---|
| Before any choice | Banner shown; **0** requests to Google |
| Reject non-essential | `sw_consent` cookie set; **0** requests to Google |
| Accept all | gtag.js loaded; dataLayer shows `consent default`, then `consent update`, `service_page_view` and `cta_click (customs-hero)`; GA `page_view` hit sent |
| No IDs configured (shipped default) | No banner, no consent script, no third-party requests |

The `generate_lead` firing path is covered by the form success test (it fires only after the server confirms). Verify in GA4
DebugView with the real property after launch.

## Performance (Lighthouse 12.8, mobile emulation, simulated throttling, local server)

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home (2nd run) | 93 | 100 | n/a* | 100 | 0.9 s | 3.2 s | 80 ms | 0 |
| Customs (2nd run) | 90 | 100 | 100 | 100 | 1.0 s | 3.3 s | 170 ms | 0 |
| Contact | 93 | 100 | 100 | 100 | 0.8 s | 2.3 s | 250 ms | 0 |

\* The first Home run failed with a Lighthouse trace error (NO_NAVSTART) and was repeated.

Scores varied considerably between runs on this machine (Customs performance 74 to 90; script evaluation of the same chunk 0.4 to 1.6 s), so
treat these as indicative only. LCP is just above the 2.5 s "good" threshold under simulated slow 4G; the LCP element is the hero
text or image, CLS is 0 and fonts are small (48 KB + 27 KB). **Re-measure with PageSpeed Insights on the production URL** (CDN,
HTTP/2, real network), and use Search Console Core Web Vitals field data once traffic exists.

## Not tested / outstanding

- Real email delivery (no Resend account or recipient configured): see deployment.md checklist.
- Webhook delivery to a real CRM.
- Production hosting, DNS, HTTPS and redirects on the live domain.
- Schema.org validator and Rich Results Test against the public URL (JSON-LD parses and was reviewed locally).
- Real GA4 / GTM / Ads / LinkedIn accounts.
- Safari/iOS and Firefox (tested in Chromium only).

---

## Enhancement round: images, blog and click-to-call navbar (30 October 2026)

Tested on a local production build (`NEXT_PUBLIC_SITE_ENV=production`), Chrome via Playwright. Not deployed.

| Check | Result |
|---|---|
| `npm run lint` / `npm run typecheck` | 0 errors, 0 warnings |
| `npm run build` | 31 routes prerendered, including `/blog` and all 10 articles (SSG via `generateStaticParams`) |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm run test:site` | All checks passed. The sitemap lists 22 URLs, all 200; titles and descriptions unique and within length; unknown article returns 404; `/post/*` returns 308 to `/blog`; Blog link and labelled `tel:` icon present |
| axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices), 23 URLs × 1280px and 390px | **0 violations** (an empty table-corner header found during the run was fixed) |
| Screenshots, 23 URLs × 1440/820/390px (69) | No horizontal overflow, no broken images, one H1 per page, no console errors (apart from the deliberate 404) |
| Blog SEO, 11 blog URLs | Canonical correct; `og:type=article` and `article:published_time` on articles; no skipped heading levels; BlogPosting headline equals H1 and date equals visible date; author/publisher = Organization |
| Internal links in articles | 37 checked, 0 broken; every article has at least one in-body link pointing to it |

**Navbar and click-to-call**

| Check | Result |
|---|---|
| Phone shown as icon only | No phone number text in the header at any width |
| Link | `href="tel:+35319120250"`, `aria-label="Call Staffing Wise"`, no form or popup |
| Touch target | 48 × 48 px on desktop and mobile |
| Tooltip | "Call Staffing Wise" appears on hover and on keyboard focus (desktop) |
| Keyboard | Reachable by Tab; 3px orange focus ring |
| Fit | No overlap or wrapping at 1024, 1280 and 1440px (CTA shortens to "Enquire Now" below 1280px); mobile icon sits beside the menu button |
| Blog active state | `aria-current="page"` and the active underline on `/blog` and on article pages, in desktop and mobile menus |

Opening the dialler itself was not tested (a headless browser has no calling app). The link uses the standard `tel:` scheme.

**Blog listing behaviour**: topic filter (aria-pressed), search across titles, excerpts, descriptions and keywords (e.g. "IPAFFS" finds
the UK/Ireland article), live result count, empty state with "Clear filters", "Load more" appears only above 9 results (not
currently triggered with 10 articles).

**Regression**: enquiry form still validates (5 errors, focus moved), preselects `?service=customs`, blocks double submission and
delivers to the mock email provider with a success message.

**Fixed during this round**: CTA band buttons wrapping at 1440px; blog search missing keywords such as IPAFFS; empty table-header cells;
eight meta descriptions over 160 characters; possible duplicate related articles.
