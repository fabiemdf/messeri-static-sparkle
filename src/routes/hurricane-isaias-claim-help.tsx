import { createFileRoute } from "@tanstack/react-router";
import html from "../hurricane-isaias.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/hurricane-isaias-claim-help")({
  head: () => ({
    meta: [
      { title: "Hurricane Isaias Insurance Claim Help | Florida Panhandle Public Adjuster" },
      {
        name: "description",
        content:
          "Hurricane Isaias damage in the Florida Panhandle? Free initial claim review for wind, roof, water, and flood losses from Pensacola to Panama City. We speak French.",
      },
      {
        property: "og:title",
        content: "Hurricane Isaias Insurance Claim Help | Messeri & Associates",
      },
      {
        property: "og:description",
        content:
          "Licensed Florida public adjusters helping Panhandle property owners document Hurricane Isaias damage and navigate their insurance claims.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://messeriassociates.com/img/hurricane-damage.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://messeriassociates.com/img/hurricane-damage.jpg" },
    ],
  }),
  server: { handlers: { GET: () => htmlResponse(html) } },
});
