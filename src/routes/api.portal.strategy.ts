import { createFileRoute } from "@tanstack/react-router";
import { getStrategySnapshot } from "../lib/management-strategy";

export const Route = createFileRoute("/api/portal/strategy")({
  server: {
    handlers: {
      GET: () =>
        Response.json(getStrategySnapshot(), {
          headers: {
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
          },
        }),
    },
  },
});
