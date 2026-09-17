import { createFileRoute } from "@tanstack/react-router";

const RECIPIENTS = [
  "david@messeriadjusting.com",
  "mfabian@fabianmeyerconsulting.com",
];

const FROM = "Messeri & Associates Website <notifications@messeriassociates.com>";

const MAX_FIELD_LENGTH = 5000;
const MAX_FIELDS = 60;

const LABELS: Record<string, string> = {
  contactForm: "Contact Form",
  claimForm: "Claim Submission",
  hurricaneConsultForm: "Hurricane Consultation Request",
  testimonialForm: "Testimonial Submission",
  "newsletter-form": "Newsletter Signup",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function prettyKey(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export const Route = createFileRoute("/api/public/form-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const lovableApiKey = process.env["LOVABLE_API_KEY"];
        const resendApiKey = process.env["RESEND_API_KEY"];
        if (!lovableApiKey || !resendApiKey) {
          console.error("Email credentials are not configured");
          return Response.json(
            { ok: false, error: "Email service is not configured." },
            { status: 500 },
          );
        }

        let entries: Array<[string, string]> = [];
        let formName = "Website Form";
        let pageUrl = "";

        try {
          const contentType = request.headers.get("content-type") ?? "";
          const raw: Record<string, unknown> = {};
          if (contentType.includes("application/json")) {
            const body = (await request.json()) as Record<string, unknown>;
            Object.assign(raw, body);
          } else {
            const form = await request.formData();
            for (const [key, value] of form.entries()) {
              if (typeof value === "string") raw[key] = value;
              else raw[key] = `[file] ${value.name}`;
            }
          }

          if (typeof raw["__formName"] === "string")
            formName = LABELS[raw["__formName"]] ?? prettyKey(raw["__formName"]);
          if (typeof raw["__pageUrl"] === "string") pageUrl = raw["__pageUrl"];

          entries = Object.entries(raw)
            .filter(([key]) => !key.startsWith("__"))
            .slice(0, MAX_FIELDS)
            .map(([key, value]) => [
              key,
              String(value ?? "").slice(0, MAX_FIELD_LENGTH).trim(),
            ])
            .filter(([, value]) => value.length > 0);
        } catch (error) {
          console.error("Failed to parse submission", error);
          return Response.json(
            { ok: false, error: "Invalid submission." },
            { status: 400 },
          );
        }

        if (entries.length === 0) {
          return Response.json(
            { ok: false, error: "Submission was empty." },
            { status: 400 },
          );
        }

        const replyTo = entries.find(
          ([key, value]) =>
            key.toLowerCase().includes("email") && /.+@.+\..+/.test(value),
        )?.[1];

        const rows = entries
          .map(
            ([key, value]) =>
              `<tr><td style="padding:6px 12px;background:#f6f7f9;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(
                prettyKey(key),
              )}</td><td style="padding:6px 12px">${escapeHtml(value).replace(
                /\n/g,
                "<br>",
              )}</td></tr>`,
          )
          .join("");

        const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#111">
<h2 style="margin:0 0 12px">New ${escapeHtml(formName)} submission</h2>
${pageUrl ? `<p style="margin:0 0 12px;color:#555">Page: ${escapeHtml(pageUrl)}</p>` : ""}
<table style="border-collapse:collapse;width:100%;max-width:640px;font-size:14px">${rows}</table>
<p style="margin-top:16px;color:#777;font-size:12px">Sent automatically from messeriassociates.com</p>
</div>`;

        const text = entries
          .map(([key, value]) => `${prettyKey(key)}: ${value}`)
          .join("\n");

        try {
          const response = await fetch(
            "https://connector-gateway.lovable.dev/resend/emails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${lovableApiKey}`,
                "X-Connection-Api-Key": resendApiKey,
              },
              body: JSON.stringify({
                from: FROM,
                to: RECIPIENTS,
                subject: `New ${formName} submission — messeriassociates.com`,
                html,
                text,
                ...(replyTo ? { reply_to: replyTo } : {}),
              }),
            },
          );

          if (!response.ok) {
            const errorBody = await response.text();
            console.error(
              `Resend request failed [${response.status}]: ${errorBody}`,
            );
            return Response.json(
              { ok: false, error: "Could not send the notification email." },
              { status: 502 },
            );
          }
        } catch (error) {
          console.error("Resend request threw", error);
          return Response.json(
            { ok: false, error: "Could not send the notification email." },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
