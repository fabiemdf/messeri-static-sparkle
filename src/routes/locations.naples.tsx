import { createFileRoute } from "@tanstack/react-router";
import html from "../locations/naples-en.html?raw";

export const Route = createFileRoute("/locations/naples")({
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
