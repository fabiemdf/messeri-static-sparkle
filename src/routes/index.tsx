import { createFileRoute } from "@tanstack/react-router";
import indexHtml from "../home.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Florida Public Adjuster for Complex Property Claims | Messeri & Associates" },
      { name: "description", content: "David Messeri represents Florida homeowners, commercial property owners, and associations with denied, underpaid, and complex property insurance claims." },
      { property: "og:title", content: "Florida Public Adjuster for Complex Property Claims | Messeri & Associates" },
      { property: "og:description", content: "Policyholder representation and professional appraisal, umpire, and claim consulting services led by David Messeri." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  server: {
    handlers: {
      GET: () =>
        new Response(indexHtml as unknown as string, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});