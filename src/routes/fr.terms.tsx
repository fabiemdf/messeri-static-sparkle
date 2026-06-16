import { createFileRoute } from "@tanstack/react-router";
import html from "../fr-terms.html?raw";

export const Route = createFileRoute("/fr/terms")({
  server: {
    handlers: {
      GET: () =>
        new Response(html as unknown as string, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});
