import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/professional-services/")({
  server: {
    handlers: {
      GET: ({ request }) =>
        Response.redirect(new URL("/professional-services/appraisal", request.url), 301),
    },
  },
});
