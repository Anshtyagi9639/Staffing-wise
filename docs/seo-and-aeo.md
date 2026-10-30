# Technical SEO, structured data, AEO and GEO

## What is implemented

| Area | Implementation |
|---|---|
| Titles and descriptions | Unique per page, written for search intent (`buildMetadata` in `lib/seo/metadata.ts`; values in each `app/*/page.tsx`). Titles at most 66 characters; descriptions at most 160. |
| Canonicals | Absolute, from `NEXT_PUBLIC_SITE_URL` via `metadataBase` + `alternates.canonical`. No query strings (for example `?service=customs` canonicalises to `/contact-us`). |
| Headings | One H1 per page; no skipped levels (checked automatically, see qa-report.md). |
| Rendering | Every page is statically prerendered HTML. Navigation, FAQ answers and links are in the HTML (FAQ answers stay in the DOM while collapsed). |
| Sitemap | `app/sitemap.ts` from `lib/routes.ts` plus every blog article (with `lastModified`): only live, canonical, 200-status pages. No redirects, 404s or private routes. Unknown `/blog/<slug>` URLs return a real 404 (`dynamicParams = false`). |
| robots.txt | Production: allow all, disallow `/api/`, sitemap reference. Any other environment: `Disallow: /`. |
| Staging protection | When `NEXT_PUBLIC_SITE_ENV` ≠ `production`: `<meta name="robots" content="noindex,nofollow">`, `X-Robots-Tag: noindex, nofollow` header on every response and `Disallow: /`. |
| Redirects | 308 permanent redirects from the old Wix URLs (`/about`, `/services`, `/contact`, `/privacy-policy`, and `/post/*` → `/blog`) in `next.config.ts`. `/blog` is now a live page. |
| 404 | Branded `not-found.tsx` with `noindex` and links to key pages; real 404 status. |
| Breadcrumbs | Visible on every inner page plus `BreadcrumbList` JSON-LD from the same trail. |
| Images | `next/image` (AVIF/WebP, responsive `srcset`, lazy below the fold, priority for the hero), descriptive alt text, decorative images `alt=""`. |
| Social | Open Graph and Twitter cards on every page; 1200×630 branded default image (`app/opengraph-image.png`); service pages use their hero photo. |
| Performance | Self-hosted variable fonts (`next/font/local`, `display: swap`), no third-party scripts before consent, static pages, long-cache headers for images. |

## Structured data (JSON-LD)

Built in `lib/structured-data/schemas.ts`, only from facts visible on the page.

| Type | Where | Notes |
|---|---|---|
| `Organization` | Every page | Name, logo, description, phone, email, Dublin address, `ContactPoint`, `areaServed` IE/GB, LinkedIn `sameAs`. **No** ratings, reviews, founding date or prices (none confirmed). |
| `WebSite` | Every page | Publisher → Organization. |
| `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` | Each page | Linked to WebSite and Organization by `@id`. |
| `BreadcrumbList` | Inner pages | Matches the visible breadcrumb. |
| `Service` | The three service pages | Provider → Organization, `areaServed`, `BusinessAudience`. |
| `FAQPage` | `/faqs`, `/customs-clearance-staffing` | Generated from the same records as the visible FAQs. Google currently shows FAQ rich results only for well-known government and health sites, so **no rich result is expected**. The markup stays because it describes the content accurately for other consumers. |
| `HowTo` | `/how-it-works` | Google no longer shows HowTo rich results; kept for machine readability only. |
| `Blog` | `/blog` | Lists every article (headline, URL, date); publisher → Organization. |
| `BlogPosting` | `/blog/<slug>` | Headline = visible H1, description, cover image with dimensions, `datePublished`/`dateModified` = visible dates, author and publisher = Organization (no individual author supplied), `articleSection`, `keywords`, `wordCount`. Open Graph `article:published_time`, `article:section` and `article:tag` are set too. |

`LocalBusiness` is not used: it requires a premises that serves customers in person, which is not confirmed (client question 9).

**Validate after deploy:** run each URL through https://validator.schema.org and the Rich Results Test
(https://search.google.com/test/rich-results). Locally, `npm run test:site` checks that every JSON-LD block parses.

## AEO / GEO (AI search visibility)

What helps AI assistants and AI search describe Staffing Wise accurately:

- **Consistent entity facts:** the same name, description, phone, email, markets and audience everywhere (`lib/site.ts` is the
  single source for pages, footer, JSON-LD and llms.txt).
- **Direct answers:** 21 FAQs in question-and-answer form, plus explicit statements of who the service is for, where (Ireland
  and the UK) and how it works (four steps, who does what).
- **Clear differentiation:** "dedicated staff vs recruitment agency vs shared outsourced service" is stated in plain words on the
  homepage and in the FAQs.
- **`/llms.txt`:** a short Markdown summary of the company, services, pages and FAQs, generated from the same data. It is a
  convenience for tools that read it; it does not guarantee citations.
- **Crawler access:** production robots.txt allows all crawlers, including AI search crawlers (OAI-SearchBot, PerplexityBot,
  ClaudeBot, Google-Extended and others). To keep AI *search* visibility but opt out of model *training*, add a rule in
  `app/robots.ts` such as `{ userAgent: ["GPTBot", "CCBot", "Google-Extended"], disallow: "/" }`. This is a business decision for the client.
- **Restraint:** no keyword-stuffed location pages, no repetitive FAQs, no unverifiable claims. No ranking or AI citation is
  promised.

## Search Console and Bing setup

1. Create a **Domain property** for `staffingwise.ie` in Google Search Console (DNS TXT record verification; needs DNS access).
   Alternatively a URL-prefix property verified by `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (meta tag, already supported).
2. Submit `https://www.staffingwise.ie/sitemap.xml`.
3. Inspect the homepage and `/customs-clearance-staffing` with URL Inspection and request indexing.
4. Bing Webmaster Tools: import from Search Console, or use `NEXT_PUBLIC_BING_SITE_VERIFICATION`. Submit the sitemap.
5. Link Search Console to GA4 (Admin → Product links).
6. Watch "Pages" (indexing) and "Page experience" weekly for the first month.

Access needed from the client: DNS for staffingwise.ie, a Google account to own the property, and the GA4 property.
