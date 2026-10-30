# Analytics, consent and conversion tracking

**Status:** implemented and tested with a test ID, but **inactive until the client provides real IDs**. No tracking IDs are hard-coded.
With no IDs set, no cookie banner appears and no third-party request is made.

## Ownership: pick one setup

| Setup | Set | Who owns which tag |
|---|---|---|
| **A. Google Tag Manager (recommended)** | `NEXT_PUBLIC_GTM_ID` | The site loads only the GTM container (after consent). GA4, Google Ads and LinkedIn tags are configured **in GTM**, triggered by the dataLayer events below. The direct GA/Ads/LinkedIn code paths are switched off automatically, so nothing is double counted. |
| **B. Direct tags** | `NEXT_PUBLIC_GA_ID` (+ optional Ads / LinkedIn vars) | The site loads gtag.js and the LinkedIn Insight Tag itself, after consent. |

## Consent

- First-party cookie `sw_consent` (180 days) stores `{analytics, marketing}`.
- Google **Consent Mode v2** defaults are set inline in `<head>` before any tag can load: all four signals `denied`, ads data
  redaction on, URL passthrough off. A stored choice is restored on later visits.
- Banner: **Accept all** and **Reject non-essential** have equal prominence, plus **Manage choices** (granular toggles).
  "Cookie settings" in the footer and on the Cookie Policy reopens it.
- Tags load only after consent: GA (analytics) / Ads and LinkedIn (marketing). With GTM, the container loads after either
  category is granted, and Consent Mode controls each tag. **Configure GTM tags with built-in consent checks** (GA4:
  `analytics_storage`; Ads/LinkedIn: `ad_storage`).
- The banner wording requires legal review before launch (client question 3).

## Events

Pushed by `lib/analytics.ts` only when analytics consent is granted. **No personal data** (names, emails, phone numbers,
message text) is ever sent; outbound URLs are stripped of query strings.

| Event | When | Parameters | Mark as key event (conversion)? |
|---|---|---|---|
| `page_view` | Every page, automatic (GA4 enhanced measurement handles client-side navigation) | standard | No |
| `service_page_view` | A service page is viewed | `service_name` | No |
| `cta_click` | Any element with `data-cta` (header, heroes, CTA bands, cards, footer) | `cta_label`, `cta_location`, `link_url` | No |
| `form_start` | First focus in the enquiry form | `form_name`, `service_of_interest` | No (funnel) |
| `generate_lead` | **Only after the server confirms the enquiry was delivered** | `form_name`, `service_of_interest`, `lead_source_page` | **Yes, the primary conversion** |
| `form_error` | Validation, delivery or rate-limit failure | `form_name`, `error_type` | No |
| `phone_click` | Any `tel:` link | `link_location` | Yes (secondary) |
| `email_click` | Any `mailto:` link | `link_location` | Yes (secondary) |
| `outbound_click` | Link to another domain | `link_url` (origin + path), `link_domain` | No |
| `faq_open` | An FAQ is expanded | `faq_question`, `faq_location` | No |

All events also carry `page_path`.

**GA4 setup:** register `service_of_interest`, `cta_location`, `service_name` and `lead_source_page` as event-scoped custom
dimensions. Mark `generate_lead` as a key event (and optionally `phone_click`, `email_click`).

**GTM setup (option A):** one GA4 Configuration (Google tag) with the Measurement ID; one GA4 Event tag per event above using
a Custom Event trigger matching the event name, with Data Layer Variables for the parameters. Google Ads Conversion and LinkedIn
conversion tags fire on the `generate_lead` custom event only.

## Advertising conversions (option B)

When marketing consent is granted and the IDs are set, a confirmed enquiry also sends:

- Google Ads: `conversion` to `NEXT_PUBLIC_GOOGLE_ADS_ID/NEXT_PUBLIC_GOOGLE_ADS_ENQUIRY_LABEL`
- LinkedIn: `lintrk('track', { conversion_id })` with `NEXT_PUBLIC_LINKEDIN_ENQUIRY_CONVERSION_ID`

Keep the conversion definition the same on every platform: **one confirmed enquiry = one conversion**.

## Campaign attribution

UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`), whether a `gclid` was present and the
landing page are kept in `sessionStorage` for the current tab, and **sent only inside an enquiry the visitor submits**. They
appear in the enquiry email and webhook payload so the team can see which campaign produced the lead. Nothing personal is put
into URLs. Use consistent UTMs, for example `utm_source=linkedin&utm_medium=paid_social&utm_campaign=customs-staffing-q1`.

## How it was verified

See qa-report.md. With a test Measurement ID in a local build: zero Google requests before consent or after rejecting; gtag.js loaded
after "Accept all"; `consent default` then `consent update`, `service_page_view` and `cta_click` reached the dataLayer, and GA
`page_view` hits were sent. Repeat in GA4 **DebugView** with the real ID after launch.
