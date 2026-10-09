# Hurricane Isaias campaign kit (October 2026)

Landing page: `https://messeriassociates.com/hurricane-isaias-claim-help`
Campaign ID (form + GTM `dataLayer`): `hurricane_isaias_2026`

> The storm's official name is **Isaias** (pronounced "ees-ah-EE-ahs"). People search for "Hurricane Isaias", so use that spelling in all ads, posts, and listings, not "Isaiah".

## 1. Website audit: what was found and fixed

| Gap | Fix in this change |
| --- | --- |
| No page mentioned "Isaias", so the site could not rank for storm searches | New page `/hurricane-isaias-claim-help` (title, H1, FAQ, and schema all target the storm name) |
| The storm page covered only Pensacola, but the Hurricane Warning runs to the Bay/Gulf county line | New page covers Escambia, Santa Rosa, Okaloosa, Walton, and Bay counties (Pensacola to Panama City) |
| Homepage did not link to any storm page (weak crawl priority) | Isaias alert in the EN and FR homepage hero |
| French Pensacola page did not link to storm help | Added an "Ouragan Isaias" link |
| No FAQ schema on storm pages (FAQ schema helps Google and AI answer engines quote the page) | `FAQPage` schema on both storm pages, plus `Service` and `WebPage` schema on the Isaias page |
| No `llms.txt` for AI assistants (ChatGPT, Perplexity, Claude, Gemini) | `public/llms.txt` with firm facts, licenses, and the storm page |
| Sitemap had no freshness signal | `lastmod` added to both storm URLs |

Still open (not done here):
- **No French-language storm page.** The FR homepage links to the English page. A `/fr/...` Isaias page would capture French-language searches.
- **Blog posts have no `Article` schema**, and the newest hurricane post is the 2025 forecast. A post-storm article (for example, "Hurricane Isaias insurance claim checklist") would add a second ranking page.
- **Location pages for Destin and Panama City** don't exist. Per `AGENTS.md`, evergreen city pages stay separate from storm campaigns, so build these only if the firm wants a lasting Panhandle presence.

## 2. Do right after deploy

1. **Google Search Console:** use URL Inspection on `/hurricane-isaias-claim-help` and click **Request indexing**. Do the same for `/` and `/locations/pensacola`. Resubmit `sitemap.xml`.
2. **Bing Webmaster Tools:** submit the URL. Bing powers ChatGPT search and Copilot results.
3. **Real form test:** submit one test lead and confirm the email arrives with `campaign = hurricane_isaias_2026`.
4. **GTM:** the existing storm triggers keep working. Events now carry `campaign: hurricane_isaias_2026`: `campaign_landing_view`, `campaign_phone_click`, `campaign_form_cta_click`, `campaign_form_start`, `campaign_form_submit_attempt`. Add a filter or variable on `campaign` if you want Isaias reported separately from Pensacola.
5. **Google Business Profile:** publish the posts in section 5 and confirm the service area includes Escambia, Santa Rosa, Okaloosa, Walton, and Bay counties.

## 3. Compliance check before running ads (have David or counsel confirm)

These are flags to verify, not legal advice:
- **48-hour rule:** Florida law (s. 626.854, F.S.) restricts public adjusters from initiating contact or soliciting for a set period after a loss event unless the insured initiates contact. Confirm how this applies to paid ads, texts, and calls before launch. The landing page itself is insured-initiated (the visitor fills out the form).
- **Solicitation hours and methods:** Florida restricts the days and times public adjusters may solicit. Inbound calls and form leads are fine. Confirm the rules before any outbound follow-up.
- **Required disclosure:** the "This is a solicitation for business…" notice is on the page. Keep it on any printed or mailed material.
- **Fees:** Florida caps public adjuster fees, with lower caps for claims tied to a declared state of emergency. Do not advertise a fee percentage without confirming the current cap.
- **No guarantees:** ads must not promise payouts or results ("get more money" claims). The copy below avoids that.

## 4. Google Ads (Search)

**Geo-target:** Escambia, Santa Rosa, Okaloosa, Walton, and Bay counties, FL ("Presence" targeting, so only people physically there).
**Final URL:** `https://messeriassociates.com/hurricane-isaias-claim-help?utm_source=google&utm_medium=cpc&utm_campaign=hurricane_isaias_2026`

Keywords (phrase match):
- "hurricane isaias insurance claim"
- "hurricane isaias public adjuster"
- "hurricane isaias damage"
- "public adjuster pensacola"
- "public adjuster destin" / "public adjuster panama city" / "public adjuster fort walton beach"
- "hurricane damage insurance claim"
- "roof damage insurance claim florida"
- "storm damage claim help"
- "hurricane claim denied"

Negative keywords: `jobs`, `career`, `salary`, `license course`, `exam`, `how to become`, `fema` (unless you also want FEMA questions), `2020` (Hurricane Isaias in 2020 was a different storm).

Responsive Search Ad headlines (each ≤ 30 characters):
1. Hurricane Isaias Claim Help
2. Licensed Public Adjusters
3. Free Initial Claim Review
4. We Represent Policyholders
5. Wind, Roof & Flood Claims
6. Pensacola to Panama City
7. Call (305) 494-5820
8. Nous Parlons Français
9. Claim Denied or Underpaid?
10. Florida Licensed #G187726

Descriptions (each ≤ 90 characters):
1. Hurricane Isaias damage? Get a free, no-obligation review from licensed public adjusters.
2. We document your loss and negotiate with your insurer. Serving the Florida Panhandle.
3. Wind, roof, water, or flood damage? Talk to a policyholder advocate. We speak French.

## 5. Google Business Profile posts

**Post 1 (now):**
> Hurricane Isaias update: Stay safe and follow local officials. When it's safe to return, photograph damage before cleanup and keep every receipt. Our licensed public adjusters offer free initial claim reviews across the Florida Panhandle. Nous parlons français.
> Button: **Learn more** → landing page with `?utm_source=gbp&utm_medium=organic&utm_campaign=hurricane_isaias_2026`

**Post 2 (2–3 days after landfall):**
> Wind and flood damage are often covered by different policies. If Hurricane Isaias damaged your roof and flooded your home, you may have two claims. We can help you sort out what applies. Free initial review.

**Post 3 (1–2 weeks after):**
> Already got an offer from your insurer for Hurricane Isaias damage? Before you sign, get a second set of eyes. We review your estimate and policy at no cost.

## 6. Social posts (Facebook, Nextdoor, LinkedIn)

UTM: `?utm_source=facebook&utm_medium=social&utm_campaign=hurricane_isaias_2026` (swap the source per channel).

> 🌀 Hurricane Isaias: your safety comes first. When officials say it's safe:
> 1️⃣ Photograph and video damage before cleanup
> 2️⃣ Make temporary repairs and keep receipts
> 3️⃣ Report the loss to your insurer promptly
> Questions about your claim? Free review from licensed Florida public adjusters → [link]
> Nous parlons français. 📞 (305) 494-5820

French version:
> 🌀 Ouragan Isaias : votre sécurité d'abord. Quand les autorités le permettent, photographiez les dommages avant le nettoyage, gardez vos reçus et déclarez le sinistre à votre assureur. Questions sur votre réclamation ? Évaluation gratuite en français : 📞 (305) 494-5820

## 7. AI search (ChatGPT, Perplexity, Google AI Overviews)

What was done: `llms.txt`, FAQ schema in plain question-and-answer form, and consistent firm facts (licenses, phone, address) across pages.

Ongoing:
- Keep the **name, address, and phone identical** everywhere: website, Google Business Profile, Bing Places, Apple Business Connect, Yelp, and the BBB. AI tools cross-check these listings.
- **Claim a Bing Places listing** if you haven't. ChatGPT search draws on Bing's index.
- **Earn local mentions:** a quote in a Pensacola News Journal or local TV recovery-resources story, or a listing on a Chamber of Commerce recovery page, is what makes AI assistants recommend a firm by name.
- **Update the page as facts settle:** once FEMA declarations or a state of emergency are confirmed, add them to the page and bump `dateModified` in the schema and `lastmod` in the sitemap.

## 8. When the campaign ends

Keep the page live (it will keep ranking for "Hurricane Isaias claim" searches for months, since claims run long). Remove the homepage hero alert after about 60–90 days by deleting the `storm-alert` paragraph in `src/home.html` and `src/fr-home.html`. The CSS rule only applies while that element exists.
