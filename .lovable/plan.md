## Quick Wins Bundle

Four high-impact fixes to the existing static site. No redesign, no route migration — just targeted edits to the current HTML and a schema/SEO pass.

### 1. Fix broken hero CTA
- On `src/home.html` the hero "Get Started" button links to `#contact`, which doesn't exist on the page. Repoint it to `contact.html`.
- Audit other pages in `/public` for the same dead `#contact` anchor and fix.

### 2. Click-to-call header + sticky mobile CTA
- Add a tappable phone number `(305) 494-5820` to the top-right of the header on every page (`src/home.html` + all `public/*.html`).
- On mobile (<768px), add a fixed bottom bar with two buttons: "Call Now" (tel:) and "Free Claim Review" (→ contact.html). Styled via existing `styles.css`.

### 3. LocalBusiness JSON-LD schema
- Inject a `<script type="application/ld+json">` block into the `<head>` of the home, contact, about, and services pages with:
  - name, url, telephone, email
  - address: 2660 NE 192nd Terr, Miami, FL 33180
  - geo coordinates (looked up for that address)
  - license number W602412, WIND Certified Appraiser
  - areaServed: Florida
  - sameAs: LinkedIn URL

### 4. FAQ section + case-result cards on home page
- Add an FAQ section to `src/home.html` (after Process, before Testimonials) with 6 questions: fees, timeline, switching adjusters, denied claims, free consultation, what we handle. Wrap in FAQPage JSON-LD for rich results.
- Add a "Recent Results" section with 3–4 case cards: claim type, carrier outcome (e.g., "Initial offer: $12K → Settled: $78K"), short narrative. Use placeholder numbers you'll confirm with David before publishing.

### Technical notes
- All edits are in `src/home.html` and `public/*.html` — no React/route changes.
- Mobile sticky bar uses pure CSS; no JS framework changes.
- JSON-LD validated against schema.org LocalBusiness + FAQPage types.
- After edits, verify with `rg` that the dead `#contact` anchor is gone and the new phone/address render on every page.

### Open question before I build
The case-result numbers need to be real to be credible. Want me to use clearly-marked placeholders (e.g., "Sample Case") that David fills in later, or skip the case cards in this pass?
