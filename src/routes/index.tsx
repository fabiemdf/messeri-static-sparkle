import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error raw HTML import
import indexHtml from "../home.html?raw";

export const Route = createFileRoute("/")({
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