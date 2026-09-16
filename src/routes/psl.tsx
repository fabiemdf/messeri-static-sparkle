import { createFileRoute } from "@tanstack/react-router";

const DESTINATION =
  "/port-st-lucie-claim-review?utm_source=direct_mail&utm_medium=postcard&utm_campaign=psl_property_damage_2026&utm_content=vanity_url";

export const Route = createFileRoute("/psl")({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 302,
          headers: {
            Location: DESTINATION,
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});
