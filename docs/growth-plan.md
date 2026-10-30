# Content roadmap, reporting framework and 30/60/90-day plan

Everything here is a **recommendation**. No traffic, ranking, search-volume or conversion figures exist yet. The first real
numbers will come from Search Console and GA4 after launch.

## 1. Content roadmap (Insights)

Publish only articles that answer a real buyer question, link to one service page and Contact, and have been reviewed by
Staffing Wise. Two well-researched articles a month is a sustainable pace. Each article should open with a 2 to 3 sentence
direct answer (useful for AI search), then go into detail.

| # | Working title (brief §10) | Target query | Intent | Audience | Links to | When |
|---|---|---|---|---|---|---|
| 1 | When does it make sense to outsource customs declaration processing? | customs declaration processing support | Commercial investigation | Customs agents, forwarders (owners/ops directors) | Customs Clearance Staffing, Contact | Month 2 |
| 2 | How dedicated customs staff help freight forwarders manage workload peaks | customs clearance staff / customs clearance team | Commercial investigation | Freight forwarders | Customs Clearance Staffing, How It Works | Month 2 |
| 3 | What to consider when building a customs-clearance team | customs clearance staffing | Informational | Customs agents | Customs Clearance Staffing, FAQs | Month 3 |
| 4 | Outsourced staff vs traditional recruitment: what should businesses compare? | outsourced staff vs recruitment agency; offshore staffing meaning | Informational → commercial | All | How It Works, Contact | Month 3 |
| 5 | How to onboard a dedicated remote team member | onboarding remote team member | Informational | Existing and new clients | How It Works, Admin support | Month 4 |
| 6 | Which tasks can outsourced finance or administration staff support? | outsourced accounting staff; outsourced administrative support | Commercial investigation | SMEs | Finance, Admin pages | Month 4 |

Candidates for migration from the old Wix blog (client question 21), if the content is still accurate: "Benefits of outsourcing",
"Debunking common misconceptions surrounding offshoring", "How to help a remote worker settle into a new role".

**Status:** the blog is built at `/blog` with 10 articles covering the topics below and more (article map: blog-content-plan.md). They need client review before launch (client question 27).

**Workflow without a CMS:** a developer adds a file in `lib/blog/posts/` (Markdown-subset body) and registers it in `lib/blog/index.ts`; the listing, sitemap, related articles and service-page links update automatically. **If the client wants to publish independently**, the
recommended options are (a) a Markdown/MDX folder edited through GitHub's web editor, with automatic deploys, or (b) a hosted
headless CMS (for example Sanity or Contentful) on the free tier. Avoid building a custom CMS for a few posts a month.

## 2. Reporting framework (monthly, from month 1)

| Area | Metric | Source | Measured or estimate |
|---|---|---|---|
| Visibility | Impressions, clicks, CTR, average position: total and per page | Search Console | Measured |
| Queries | Top queries per page; new customs-staffing queries | Search Console | Measured |
| Indexing | Indexed vs excluded pages, and reasons | Search Console → Pages | Measured |
| Engagement | Organic landing-page sessions and engagement rate | GA4 (consented users only) | Measured (partial, consent-dependent) |
| Leads | `generate_lead` count by channel, landing page and service | GA4 + enquiry emails | Measured |
| Lead quality | Qualified vs unqualified enquiries (manual tag in the inbox or CRM) | Staffing Wise team | Measured manually |
| Conversion rate | Leads ÷ sessions by channel and landing page | GA4 | Measured (consented users) |
| Event health | Are `generate_lead`, `cta_click` and `phone_click` firing? Compare enquiries received with GA4 leads | GA4 DebugView / inbox | Measured |
| Core Web Vitals | LCP, INP, CLS (field data once there is enough traffic) | Search Console CWV, PageSpeed Insights | Measured |
| Technical issues | Crawl errors, 404s, redirect chains | Search Console, `npm run test:site` | Measured |
| AI search | Referral sessions from chatgpt.com, perplexity.ai, copilot, gemini; manual spot checks of how assistants describe Staffing Wise | GA4 referrals; manual | Observed, not comprehensive |

Note: GA4 numbers cover only visitors who accept analytics cookies. Enquiry emails are the source of truth for lead counts.

## 3. 30 / 60 / 90-day plan after launch

### Days 1 to 30: foundations
- Search Console (Domain property) and Bing Webmaster set up; sitemap submitted; key pages inspected.
- GA4 key event `generate_lead` verified in DebugView against a real test enquiry; custom dimensions registered.
- Google Business Profile: decide with the client whether the Dublin office qualifies; if so, create it with consistent name, phone and URL.
- Update the LinkedIn company page with the new URL, positioning and services (consistent entity facts help search and AI).
- Monitor indexing and 404s from old Wix URLs weekly; add redirects if new ones appear.
- Answer the open client questions; publish approved trust content (company background, data-security summary) on About.
- Run Keyword Planner for the keyword map; record real volumes.

### Days 31 to 60: content and authority
- Publish articles 1 and 2 (customs-focused) with internal links to the Customs page.
- Migrate or retire the old blog posts (client decision).
- Seek genuine, relevant mentions: Staffing Wise listing on chambers of commerce / Freight Transport Association Ireland /
  British International Freight Association member directories where eligible; Customs Wise site linking to Staffing Wise if
  the brand relationship is approved.
- First monthly report (template in section 2). Review which pages get impressions and for which queries.

### Days 61 to 90: optimise
- Use Search Console queries to refine titles and descriptions of pages with impressions but a low CTR.
- Decide on separate pages only if queries show distinct demand (for example "customs declaration staff Ireland").
- If paid campaigns are planned: LinkedIn Ads targeted at freight forwarding and customs brokerage companies in IE/UK, sending
  traffic to `/customs-clearance-staffing` with UTMs; Google Ads on exact-match customs-staffing terms with a small budget.
  Conversion = confirmed enquiry only.
- Add approved case studies or testimonials, if available. These are the strongest trust signal still missing.
- Quarter review: leads, lead quality, cost per lead (if ads), next quarter's content.
