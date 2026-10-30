# Staffing Wise website

Marketing website for **Staffing Wise**: dedicated, trained overseas staff for freight forwarders, customs agents, hauliers and
logistics companies in Ireland and the UK, with customs-clearance staffing as the flagship service.

This is an independent project. It follows the architecture and quality bar of the Customs Wise website, but has its own branding,
content, configuration, SEO and analytics. It does not import from, or change, the Customs Wise codebase.

**Stack:** Next.js 16.4 (App Router, Turbopack) · React 19.2 · TypeScript (strict) · Tailwind CSS 4 · Radix UI primitives
(shadcn-style `cva` components) · lucide-react · react-hook-form + Zod · Server Actions. No database, no CMS.

## Quick start

```bash
npm install
cp .env.example .env.local     # optional for local work; see "Environment variables"
npm run dev                    # http://localhost:3000
```

Requires Node.js 20.9 or later.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve the build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run check` | lint + typecheck + build |
| `npm run images:add -- <file> <name>` | Optimise a high-resolution photo into `public/images/` and refresh the image manifest |
| `npm run images:manifest` | Rebuild dimensions and blur placeholders for every photo |
| `npm run test:site -- --url http://localhost:3000` | Smoke test against a running site: every sitemap URL returns 200, unique titles, canonicals, valid JSON-LD, robots, redirects, security headers |

## Environment variables

All optional locally. Every analytics/marketing ID is format-checked; an empty or malformed value simply disables that tool.
Full list with comments: [`.env.example`](.env.example). Production requirements: [`docs/deployment.md`](docs/deployment.md).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (default `https://www.staffingwise.ie`) |
| `NEXT_PUBLIC_SITE_ENV` | `production` makes the site indexable. Anything else: `noindex`, `X-Robots-Tag` and `robots.txt Disallow: /` |
| `EMAIL_API_KEY`, `EMAIL_FROM`, `ENQUIRY_TO_EMAIL` | Enquiry email via Resend (server only) |
| `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | Optional CRM/automation webhook copy of each enquiry (server only) |
| `NEXT_PUBLIC_GTM_ID` **or** `NEXT_PUBLIC_GA_ID` | Google Tag Manager container, or GA4 directly (never both active) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ENQUIRY_LABEL` | Google Ads enquiry conversion (marketing consent only) |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `NEXT_PUBLIC_LINKEDIN_ENQUIRY_CONVERSION_ID` | LinkedIn Insight Tag and conversion (marketing consent only) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Search Console / Bing Webmaster meta-tag verification |

**Enquiry delivery is not live until an email or webhook channel is configured.** Without one, the form validates normally but
tells the visitor it could not send and gives the phone number and email address. It never shows a false success.

## Editing content

There is no CMS: content lives in typed modules and is deployed with the code.

| What | Where |
|---|---|
| Company facts, phone, email, offices, navigation, services | [`lib/site.ts`](lib/site.ts) |
| FAQs (also used for FAQPage JSON-LD and `llms.txt`) | [`lib/content/faqs.ts`](lib/content/faqs.ts) |
| Process steps, "who does what" lists | [`lib/content/process.ts`](lib/content/process.ts) |
| Photography (alt text, focal points) | [`lib/content/images.ts`](lib/content/images.ts); files in `public/images/`; generated sizes/placeholders in `lib/content/image-manifest.json` |
| Blog articles | One file per article in [`lib/blog/posts/`](lib/blog/posts/), registered in [`lib/blog/index.ts`](lib/blog/index.ts); see [`docs/blog-content-plan.md`](docs/blog-content-plan.md) |
| Page copy, titles and meta descriptions | `app/<route>/page.tsx` |
| Sitemap and `llms.txt` page list | [`lib/routes.ts`](lib/routes.ts) |

The copy source of record is the client document, converted in [`docs/source-content.md`](docs/source-content.md).
If the client needs to edit content themselves regularly, see the CMS options in [`docs/growth-plan.md`](docs/growth-plan.md).

## Project map

```
app/                    routes (all statically prerendered), sitemap.ts, robots.ts, manifest.ts, llms.txt, icons, OG image
components/layout/      header, footer, breadcrumbs, scroll reveal
components/sections/    page hero, section heading, steps, FAQ accordion, CTA band, split feature, service + legal templates
components/blog/        blog card, listing explorer (search, topics, load more), "From the blog" strip
components/forms/       enquiry form (client)
components/consent/     cookie banner + settings
components/analytics/   consent-gated tag loader, click/CTA listener, service-page view event
lib/enquiry/            server action, delivery (Resend email + webhook), rate limit and duplicate guards
lib/validation/         shared Zod schema (client + server)
lib/blog/               articles, Markdown-subset renderer, listing helpers
lib/seo, lib/structured-data   metadata and JSON-LD builders
docs/                   keyword map, SEO/AEO, analytics, deployment, design system, client questions, growth plan, QA report
scripts/check-site.mjs  smoke test
scripts/images.mjs      photo optimisation and manifest
```

## Documentation

- [Keyword research and page mapping](docs/keyword-map.md)
- [Blog content plan and article map](docs/blog-content-plan.md)
- [Technical SEO, structured data, AEO/GEO](docs/seo-and-aeo.md)
- [Analytics, consent and conversion tracking](docs/analytics-and-tracking.md)
- [Deployment and rollback](docs/deployment.md)
- [Design system](docs/design-system.md)
- [Questions and approvals needed from the client](docs/client-questions.md)
- [Content roadmap, reporting and 30/60/90-day plan](docs/growth-plan.md)
- [QA and test results](docs/qa-report.md)
- [Image credits](docs/image-credits.md)
