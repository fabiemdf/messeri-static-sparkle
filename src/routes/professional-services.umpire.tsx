import { createFileRoute } from "@tanstack/react-router";
import { renderProfessionalPage } from "../lib/professional-page";

export const Route = createFileRoute("/professional-services/umpire")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          renderProfessionalPage({
            slug: "umpire",
            eyebrow: "Neutral dispute resolution",
            title: "Insurance Appraisal Umpire Services",
            summary:
              "Independent, organized umpire administration for Florida residential and commercial property appraisal matters.",
            overviewTitle: "Neutral administration when appraisers cannot agree",
            overview: [
              "An appraisal umpire is selected under the policy's appraisal process when the two appraisers cannot resolve disputed amount-of-loss issues. The umpire's role is distinct from policyholder advocacy and must be performed with independence, procedural consistency, and appropriate disclosure.",
              "David Messeri accepts umpire assignments only after a conflict review. Communications, submissions, inspections, fees, and scheduling expectations are established at the outset so both sides understand how the matter will proceed.",
            ],
            services: [
              {
                title: "Conflict disclosures",
                description:
                  "Review the parties, representatives, property, claim, and prior professional relationships before accepting an appointment.",
              },
              {
                title: "Scheduling and procedure",
                description:
                  "Set written expectations for submissions, communications, inspections, deposits, and administrative milestones.",
              },
              {
                title: "Technical issue review",
                description:
                  "Evaluate the competing scopes, estimates, photographs, reports, and positions presented by the appraisal panel.",
              },
              {
                title: "Clear award process",
                description:
                  "Work with the panel toward a documented resolution of the amount-of-loss issues properly submitted.",
              },
            ],
            process: [
              {
                title: "Nomination review",
                description:
                  "Receive the appointment request and identify all parties, appraisers, counsel, and known interests.",
              },
              {
                title: "Conflict check",
                description:
                  "Disclose relevant relationships and confirm availability before the assignment is accepted.",
              },
              {
                title: "Case administration",
                description:
                  "Issue written procedures, collect materials, schedule activity, and keep panel communications organized.",
              },
              {
                title: "Evaluation and resolution",
                description:
                  "Review the submitted dispute and work toward an impartial, well-documented decision.",
              },
            ],
            audience: [
              "Policyholder and carrier appraisers",
              "Attorneys and appraisal counsel",
              "Residential appraisal panels",
              "Commercial and association appraisal panels",
            ],
            ctaLabel: "Request an Umpire Conflict Check",
          }),
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        ),
    },
  },
});
