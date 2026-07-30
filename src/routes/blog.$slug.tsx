import { createFileRoute } from "@tanstack/react-router";
import hurricaneForecastHtml from "../../public/blog/2025-hurricane-season-forecast.html?raw";
import insurerInsightsHtml from "../../public/blog/5-things-insurance-companies-dont-want-you-to-know.html?raw";
import communicatingHtml from "../../public/blog/communicating-with-insurance-companies.html?raw";
import fireDocumentationHtml from "../../public/blog/documenting-property-damage-after-fire.html?raw";
import essentialDocumentationHtml from "../../public/blog/essential-documentation-for-insurance-claims.html?raw";
import insuranceLawChangesHtml from "../../public/blog/florida-insurance-laws-changes.html?raw";
import waterDamageCostsHtml from "../../public/blog/hidden-costs-water-damage.html?raw";
import appraisalOverviewHtml from "../../public/blog/insurance-appraisal-blog.html?raw";
import appraisalProcessHtml from "../../public/blog/insurance-appraisal-process.html?raw";
import claimProcessHtml from "../../public/blog/insurance-claim-process.html?raw";
import claimTimelineHtml from "../../public/blog/insurance-claim-timeline.html?raw";
import negotiatingHtml from "../../public/blog/negotiating-with-insurance-companies.html?raw";
import floodPolicyHtml from "../../public/blog/understanding-flood-insurance-policy.html?raw";
import roofDenialsHtml from "../../public/blog/why-insurance-carriers-deny-roof-damage-claims.html?raw";
import { htmlNotFound, htmlResponse } from "../lib/static-html-response";

const BLOG_PAGES: Readonly<Record<string, string>> = {
  "2025-hurricane-season-forecast": hurricaneForecastHtml,
  "5-things-insurance-companies-dont-want-you-to-know": insurerInsightsHtml,
  "communicating-with-insurance-companies": communicatingHtml,
  "documenting-property-damage-after-fire": fireDocumentationHtml,
  "essential-documentation-for-insurance-claims": essentialDocumentationHtml,
  "florida-insurance-laws-changes": insuranceLawChangesHtml,
  "hidden-costs-water-damage": waterDamageCostsHtml,
  "insurance-appraisal-blog": appraisalOverviewHtml,
  "insurance-appraisal-process": appraisalProcessHtml,
  "insurance-claim-process": claimProcessHtml,
  "insurance-claim-timeline": claimTimelineHtml,
  "negotiating-with-insurance-companies": negotiatingHtml,
  "understanding-flood-insurance-policy": floodPolicyHtml,
  "why-insurance-carriers-deny-roof-damage-claims": roofDenialsHtml,
};

export const Route = createFileRoute("/blog/$slug")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const slug = new URL(request.url).pathname.split("/").filter(Boolean).at(-1);
        const html = slug ? BLOG_PAGES[slug] : undefined;
        return html ? htmlResponse(html) : htmlNotFound();
      },
    },
  },
});
