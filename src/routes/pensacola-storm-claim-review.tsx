import { createFileRoute } from "@tanstack/react-router";
import html from "../pensacola-storm.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/pensacola-storm-claim-review")({
  head: () => ({
    meta: [
      { title: "Pensacola Storm Damage Claim Review | Messeri & Associates" },
      { name: "description", content: "Free initial storm damage claim review for Pensacola property owners. Wind, roof, water, and flood claim guidance. We speak French." },
      { property: "og:title", content: "Pensacola Storm Damage Claim Review | Messeri & Associates" },
      { property: "og:description", content: "Before and after the storm: property claim guidance for Pensacola and surrounding communities." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://messeriassociates.com/img/hurricane-damage.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://messeriassociates.com/img/hurricane-damage.jpg" },
    ],
  }),
  server: { handlers: { GET: () => htmlResponse(html) } },
});