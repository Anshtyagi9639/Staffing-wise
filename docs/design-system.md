# Design system

Staffing Wise is visually related to the upgraded Customs Wise site (same colour family, the same component patterns and quality
bar) but has its own identity, taken from the existing Staffing Wise logo.

| | Customs Wise | Staffing Wise |
|---|---|---|
| Primary colour | Ship / Overnight navy | Logo navy `#09333f` |
| Accent | Cargo yellow CTAs, uppercase Oswald headings in Atlantic blue | Yellow CTAs plus the **orange "people" accent** (`#f7931e`) for labels, icons and frames |
| Headings | UPPERCASE, blue | Sentence case, navy, Oswald medium |
| Body font | Open Sans | Inter |
| Header | Transparent, hides on scroll | Solid navy, always visible |

## Tokens (`app/globals.css`, `@theme`)

Tailwind's default palette is disabled; only these colours exist.

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#041a21` | Footer, deepest surfaces |
| `navy-900` | `#09333f` | Brand navy: header, heroes, secondary buttons, headings |
| `navy-800` / `navy-700` | `#0e4352` / `#175a6c` | Hover states, link text |
| `slate` | `#4f6b76` | Muted labels |
| `sun` / `sun-deep` | `#f5ee31` / `#e4dc14` | Primary CTA background / hover (navy text, 13.6:1) |
| `ember` | `#f7931e` | Decorative accent: eyebrow bars, icons, frames (not for text on white) |
| `ember-text` | `#a35406` | Orange text on white (4.9:1, AA) |
| `ink` / `ink-soft` | `#0b1f26` / `#3c525a` | Body text (ink-soft on white 8.1:1) |
| `on-dark` | `#c9d8dd` | Body text on navy (9.6:1) |
| `mist` / `cloud` / `line` | `#f2f6f7` / `#e5edf0` / `#d3dee2` | Alternate section background, image placeholders, borders |
| `error` / `success` | `#b42318` / `#1d7a3e` | Form states |

Radius `8px` (`rounded-brand`), container `76rem` with a 16px (mobile) / 24px gutter, one card shadow (`shadow-card`).

## Typography

- Display: **Oswald** variable (SIL OFL), echoing the condensed "WISE" in the logo. H1 `clamp(2.25rem, 4.6vw, 3.6rem)`, H2
  `clamp(1.85rem, 3.2vw, 2.6rem)`, `text-wrap: balance`.
- Body: **Inter** variable (SIL OFL), 16px base, line-height 1.65, measure about 60 to 70 characters.
- `.eyebrow`: small uppercase orange label with a short bar, above section headings.

## Components

| Component | File | Notes |
|---|---|---|
| Button | `components/ui/button.tsx` | `primary` (yellow), `secondary` (navy), `outline`, `ghost` (on dark); sizes `md` (48px min height), `sm` |
| Header / mobile menu | `components/layout/header.tsx` | Radix NavigationMenu (Services dropdown), Radix Dialog full-screen mobile menu, phone link, CTA |
| Footer | `components/layout/footer.tsx` | Services, company, contact, legal |
| PageHero | `components/sections/page-hero.tsx` | Navy band, breadcrumb, eyebrow, H1, intro, CTA, framed photo |
| SectionHeading | `components/sections/section-heading.tsx` | Eyebrow + H2 + intro |
| SplitFeature | `components/sections/split-feature.tsx` | Photo beside text, optional reverse |
| Steps | `components/sections/steps.tsx` | Numbered ordered list of cards |
| CheckList | `components/sections/check-list.tsx` | Orange check icons |
| FaqList | `components/sections/faq-list.tsx` | Radix Accordion; answers stay in the HTML |
| CtaBand | `components/sections/cta-band.tsx` | Closing CTA with phone |
| SupportServicePage / LegalPage | `components/sections/*` | Page templates |
| EnquiryForm | `components/forms/enquiry-form.tsx` | See README and analytics docs |

## Accessibility

Skip link; visible 3px orange focus ring; all interactive targets at least 40px (most 48px); semantic landmarks and one H1 per
page; breadcrumbs with `aria-current`; form labels, `aria-invalid` + `aria-describedby` errors, focus moved to the first error and
to the success message; colour pairs above meet WCAG AA; `prefers-reduced-motion` disables all animation; content is fully
visible without JavaScript (scroll-reveal only applies when JS has run).

## Imagery

Professional stock photos of teams, office work, logistics and ports (see image-credits.md). Avoid images that imply services
Staffing Wise does not provide (for example customs officers, branded vehicles or uniforms). Replace with real team photos when
available.
