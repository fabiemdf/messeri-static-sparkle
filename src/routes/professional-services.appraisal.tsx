import { createFileRoute } from "@tanstack/react-router";
import { renderProfessionalPage } from "../lib/professional-page";

export const Route = createFileRoute("/professional-services/appraisal")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          renderProfessionalPage({
            slug: "appraisal",
            eyebrow: "Insurance appraisal",
            title: "Insured-Side Appraisal Services",
            summary:
              "Technical, well-documented appraisal representation for Florida residential and commercial property-loss disputes.",
            overviewTitle: "A focused path for disputes about the amount of loss",
            overview: [
              "When coverage has been acknowledged but the parties disagree about the amount of a covered loss, the policy's appraisal provision may offer a structured alternative to litigation. The exact scope and effect of appraisal depend on the policy and applicable law.",
              "David Messeri serves as an insured-side appraiser with a disciplined approach to scope review, estimating, documentation, panel communication, and award analysis. Each engagement begins with a review of the policy provision, known disputes, deadlines, and potential conflicts.",
            ],
            services: [
              {
                title: "File and estimate review",
                description:
                  "Review the policy appraisal provision, competing estimates, photographs, reports, and prior carrier communications.",
              },
              {
                title: "Scope development",
                description:
                  "Identify disputed damage components and organize the evidence supporting the claimed amount of loss.",
              },
              {
                title: "Panel participation",
                description:
                  "Communicate with the opposing appraiser, evaluate proposed umpires, attend inspections, and work toward a supported resolution.",
              },
              {
                title: "Award documentation",
                description:
                  "Prepare clear schedules and supporting materials so the issues presented to the panel are organized and traceable.",
              },
            ],
            process: [
              {
                title: "Conflict and document review",
                description:
                  "Confirm parties, requested role, policy language, deadlines, and available records.",
              },
              {
                title: "Engagement and scope",
                description:
                  "Define fees, retainer requirements, deliverables, communications, and inspection needs in writing.",
              },
              {
                title: "Technical evaluation",
                description:
                  "Analyze the loss, estimates, photographs, reports, and disputed line items.",
              },
              {
                title: "Panel administration",
                description:
                  "Participate in the appraisal process and document the resolution or remaining disagreement.",
              },
            ],
            audience: [
              "Policyholders and their counsel",
              "Residential and commercial property owners",
              "Condominium and community associations",
              "Professionals seeking an experienced insured-side appraiser",
            ],
            ctaLabel: "Request Appraisal Availability",
          }),
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        ),
    },
  },
});
