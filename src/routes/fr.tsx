import { createFileRoute } from "@tanstack/react-router";
import frHtml from "../fr-home.html?raw";

export const Route = createFileRoute("/fr")({
  server: {
    handlers: {
      GET: () =>
        new Response(frHtml as unknown as string, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});