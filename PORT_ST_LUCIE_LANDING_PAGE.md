# Port St. Lucie direct-mail landing page

## URLs

- Landing page: `/port-st-lucie-claim-review`
- Short printed URL: `/psl`
- QR destination:
  `https://messeriassociates.com/port-st-lucie-claim-review?utm_source=direct_mail&utm_medium=postcard&utm_campaign=psl_property_damage_2026&utm_content=qr`

The `/psl` route redirects to the landing page with the postcard campaign attribution attached.

## Lead delivery

Set the deployment secret `PSL_LEAD_WEBHOOK_URL` to the CRM, CallRail, Zapier, Make, or other
HTTPS webhook that should receive new leads. The endpoint sends a JSON payload containing contact
information, property details, consent, and campaign attribution.

If the secret is missing or the webhook fails, the form does not claim success. It asks the visitor
to call `(305) 494-5820` instead.

## Google Tag Manager events

The page loads the existing `GTM-NZL35G7B` container and pushes these events to `dataLayer`:

- `campaign_landing_view`
- `campaign_phone_click`
- `campaign_form_cta_click`
- `campaign_form_start`
- `campaign_form_submit_attempt`
- `campaign_form_submit`
- `campaign_form_error`

Create GTM/GA4 custom-event tags or triggers for these names if the current container does not
already forward custom `dataLayer` events.
