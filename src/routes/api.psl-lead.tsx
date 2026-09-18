import process from "node:process";
import { createFileRoute } from "@tanstack/react-router";

const MAX_BODY_BYTES = 20_000;
const CAMPAIGN_ID = "psl_property_damage_2026";

function text(value: unknown, maxLength = 500): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function readSubmission(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const parsed: unknown = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const Route = createFileRoute("/api/psl-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length") ?? "0");
        if (contentLength > MAX_BODY_BYTES) {
          return json({ ok: false, message: "Submission is too large." }, 413);
        }

        let data: Record<string, unknown>;
        try {
          data = await readSubmission(request);
        } catch {
          return json({ ok: false, message: "We could not read your submission." }, 400);
        }

        // A hidden field catches automated submissions without exposing the filter.
        if (text(data.company, 100)) {
          return json({ ok: true });
        }

        const firstName = text(data.firstName, 80);
        const lastName = text(data.lastName, 80);
        const phone = text(data.phone, 40);
        const email = text(data.email, 160);
        const zipCode = text(data.zipCode, 10);
        const damageType = text(data.damageType, 80);

        if (!firstName || !lastName || !phone || !zipCode || !damageType) {
          return json({ ok: false, message: "Please complete all required fields." }, 400);
        }

        const webhookUrl = process.env.PSL_LEAD_WEBHOOK_URL;
        if (!webhookUrl) {
          console.error("PSL_LEAD_WEBHOOK_URL is not configured");
          return json(
            {
              ok: false,
              message: "Online requests are temporarily unavailable. Please call (305) 494-5820.",
            },
            503,
          );
        }

        const lead = {
          type: "campaign_lead",
          campaignId: CAMPAIGN_ID,
          submittedAt: new Date().toISOString(),
          contact: {
            firstName,
            lastName,
            phone,
            email,
          },
          property: {
            zipCode,
            damageType,
            claimStatus: text(data.claimStatus, 80),
            message: text(data.message, 2_000),
          },
          attribution: {
            source: text(data.utmSource, 100) || "direct_mail",
            medium: text(data.utmMedium, 100) || "postcard",
            campaign: text(data.utmCampaign, 160) || CAMPAIGN_ID,
            content: text(data.utmContent, 160),
            landingPage: text(data.landingPage, 250) || "/port-st-lucie-claim-review",
          },
          consent: {
            contact:
              data.contactConsent === true ||
              data.contactConsent === "true" ||
              data.contactConsent === "on",
          },
        };

        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
            signal: AbortSignal.timeout(8_000),
          });

          if (!response.ok) {
            console.error(`PSL lead webhook returned ${response.status}`);
            return json(
              {
                ok: false,
                message: "We could not send your request. Please call (305) 494-5820.",
              },
              502,
            );
          }
        } catch (error) {
          console.error("PSL lead webhook failed", error);
          return json(
            {
              ok: false,
              message: "We could not send your request. Please call (305) 494-5820.",
            },
            502,
          );
        }

        return json({ ok: true });
      },
    },
  },
});
