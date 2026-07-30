import { createFileRoute } from "@tanstack/react-router";
import { renderProfessionalPage } from "../lib/professional-page";

export const Route = createFileRoute("/professional-services/expert-witness")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          renderProfessionalPage({
            slug: "expert-witness",
            eyebrow: "Technical claim consulting",
            title: "Expert Witness & Claim Consulting",
            summary:
              "Structured property-claim analysis, estimating review, and litigation support for attorneys and insurance professionals.",
            overviewTitle: "Technical analysis that is organized, supportable, and clear",
            overview: [
              "Complex property disputes often require a careful comparison of estimates, photographs, inspections, reports, policy communications, and claim-handling records. A useful consultant identifies the disputed technical issues and explains them without overstating the available evidence.",
              "David Messeri provides claim-file review, estimating analysis, appraisal consulting, and expert support subject to the requested role, qualifications required, conflict review, and a written engagement.",
            ],
            services: [
              {
                title: "Claim-file review",
                description:
                  "Organize and evaluate estimates, photographs, reports, correspondence, timelines, and disputed scope components.",
              },
              {
                title: "Estimate comparison",
                description:
                  "Identify material differences in quantities, pricing, repair methodology, code items, and documented damage.",
              },
              {
                title: "Written analysis",
                description:
                  "Develop clear schedules, demonstratives, or reports tailored to the assignment and supported by the reviewed materials.",
              },
              {
                title: "Consultation and testimony",
                description:
                  "Support counsel in technical preparation and, when appropriate, provide deposition or trial testimony within the defined engagement.",
              },
            ],
            process: [
              {
                title: "Assignment definition",
                description:
                  "Clarify the requested opinions, deliverables, deadlines, jurisdictions, and materials available for review.",
              },
              {
                title: "Conflict and qualification review",
                description:
                  "Confirm independence, availability, relevant experience, and fit for the requested subject matter.",
              },
              {
                title: "Analysis",
                description:
                  "Review the record, identify assumptions or missing information, and document the basis for conclusions.",
              },
              {
                title: "Delivery and support",
                description:
                  "Provide the agreed work product and remain available for authorized follow-up, preparation, or testimony.",
              },
            ],
            audience: [
              "Policyholder and insurance counsel",
              "Appraisal professionals",
              "Property owners and associations",
              "Construction and claim professionals",
            ],
            ctaLabel: "Discuss a Consulting Matter",
          }),
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        ),
    },
  },
});
