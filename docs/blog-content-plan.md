# Blog content plan and article map

Ten articles were written on 30 October 2026 at `/blog/<slug>`. Each owns **one search intent**, so they support the service pages instead of
competing with them. Search-demand evidence comes from Google Autocomplete (UK and Ireland, 30 Oct 2026). **No search volumes are available
or estimated**; validate with Keyword Planner or Search Console (see keyword-map.md).

> **Before launch:** Staffing Wise should review every article for accuracy and tone (client question 27), and `datePublished` /
> `dateModified` in each `lib/blog/posts/*.ts` should be set to the real go-live date. Articles are attributed to **Staffing Wise** (the
> organisation) because no named author has been supplied; add an author only with the person's approval.

## Article map

| # | Slug | H1 | Primary intent / keyword | Autocomplete evidence | Category | Supports |
|---|---|---|---|---|---|---|
| 1 | `customs-clearance-outsourcing-guide` (featured) | What Is Customs Clearance Outsourcing and How Does It Work? | Definitional: "customs clearance outsourcing" | "customs broker outsourcing", "customs clearance process", "what is customs clearance" | Customs clearance | Customs Clearance Staffing |
| 2 | `dedicated-customs-clearance-staff` | The Benefits of Dedicated Customs Clearance Staff for Freight Forwarders | Benefits, forwarder-specific: "dedicated customs clearance staff" | "customs clearance team", "customs declaration staff" | Customs clearance | Customs |
| 3 | `managing-customs-declaration-volumes` | How to Manage Growing Customs Declaration Volumes | Operational how-to: "customs clearance backlog" | "customs backlog uk", "customs clearance backlog" | Customs clearance | Customs |
| 4 | `outsourcing-vs-in-house-recruitment` | Outsourced Customs Staffing vs. In-House Recruitment | Comparison: "outsourcing vs in-house hiring" | "outsourcing vs in house hiring", "in house vs outsourcing logistics" | Staffing & outsourcing | Customs, Admin |
| 5 | `outsourced-customs-staff-uk-ireland` | How Outsourced Customs Staff Can Support UK and Irish Logistics Businesses | Jurisdiction-specific and agent vs staff: "outsourced customs staff UK Ireland" | "customs agent or customs broker", "indirect customs representative", "customs declaration service uk", "ipaffs" | Customs clearance | Customs |
| 6 | `choosing-customs-clearance-outsourcing-partner` | What to Consider When Choosing a Customs Clearance Outsourcing Partner | Evaluation checklist | "how to choose a customs broker" | Customs clearance | Customs, Contact |
| 7 | `dedicated-offshore-staffing` | How Dedicated Offshore Staffing Can Support Business Operations | Model explainer: "dedicated offshore staffing" | "offshore staffing solutions", "dedicated offshore teams", "onshore vs offshore employees", "offshore staffing meaning" | Staffing & outsourcing | All three services |
| 8 | `when-to-outsource-administrative-support` | When Should a Business Consider Outsourced Administrative Support? | Decision signals: "outsourced administrative support" | "outsourced administrative support", "outsourced admin support", "outsourced administrative services" | Finance & administration | Admin |
| 9 | `outsourced-accounting-finance-staff` | Outsourced Accounting and Finance Staff: Key Considerations for Businesses | Considerations and controls: "outsourced accounting and finance staff" | "outsourced finance team uk", "outsourced bookkeeping services uk", "outsourced accounting staff" | Finance & administration | Finance |
| 10 | `freight-forwarder-operational-capacity` | How Freight Forwarders Can Improve Operational Capacity Through Outsourcing | Whole back office: "outsourcing services for freight forwarders" | "freight forwarding operations" | Staffing & outsourcing | All three services, Industries |

### How overlap is avoided

- **1 vs 6:** 1 explains the models (what and how); 6 is a buying checklist (which provider).
- **2 vs 10:** 2 is the customs role only; 10 covers the whole forwarding back office (documentation, billing, customer service).
- **2 vs 3:** 2 is about the benefits of a staffing model; 3 is an operational playbook in which staffing is only step 5.
- **4 vs 7:** 4 compares two hiring routes for customs roles; 7 explains the offshore model generally.
- **Service pages** keep the commercial "outsourced customs clearance staff" intent; the articles link to them with descriptive anchors.

### Wording change from the brief

Proposed topic 5 was "How Outsourced Customs **Agents** Can Support UK and Irish Logistics Businesses". A customs agent is a legal
representative role, while Staffing Wise supplies **staff** (client question 20). The article is titled "…Outsourced Customs **Staff**…" and
explains the agent/staff difference, which is itself a searched question ("customs agent or customs broker", "indirect customs representative").
Change it if the client confirms Staffing Wise also acts as an agent.

## Content standards used

- A short **"In short"** answer box at the top (2 to 3 sentences answering the question directly, useful for answer engines), then H2/H3 sections.
- Checklists, step lists or comparison tables in every article; no invented statistics, savings, timescales or case studies.
- Customs facts limited to well-established, verifiable points (CDS, AIS/AES, IPAFFS, TRACES/CHEDs, direct and indirect representation,
  Windsor Framework named but not detailed). Regulatory specifics should be checked by the client's customs specialists before publication.
- 3 to 4 internal links per article to service pages and other articles (37 links checked automatically: none broken), plus a contextual CTA
  matched to the article's main service and three related articles.
- Unique `<title>` (at most 65 characters), meta description (at most 160), canonical, Open Graph `article` tags, and `BlogPosting` and `BreadcrumbList` JSON-LD
  matching the visible headline, date and author.

## Adding an article

1. Copy a file in `lib/blog/posts/`, change the slug (kebab-case, descriptive) and the fields. Body uses the Markdown subset described in
   `lib/blog/types.ts`.
2. Add a cover photo with `npm run images:add -- <file> <name>` and reference it in `lib/content/images.ts` (with alt text).
3. Import it in `lib/blog/index.ts`. It then appears in the listing, sitemap, `llms.txt`, related articles and the relevant service pages.
4. Run `npm run check` and `npm run test:site`.

When the listing has more than nine articles, a "Load more articles" button appears automatically.
