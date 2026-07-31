import { createFileRoute } from "@tanstack/react-router";
import {
  architecturalPrinciples,
  phaseZeroArchitectureGate,
} from "../lib/portal-architecture";

export const Route = createFileRoute("/api/portal/architecture")({
  server: {
    handlers: {
      GET: () =>
        Response.json(
          {
            principles: architecturalPrinciples,
            phaseGate: phaseZeroArchitectureGate,
            capabilities: {
              eventDriven: true,
              appendOnlyAudit: true,
              relationshipGraphReady: true,
              aiHumanApprovalRequired: true,
              providerAbstractionsRequired: true,
              disasterRecoveryRequired: true,
            },
          },
          {
            headers: {
              "Cache-Control": "no-store",
              "X-Content-Type-Options": "nosniff",
            },
          },
        ),
    },
  },
});
