import { createFileRoute } from "@tanstack/react-router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — raw HTML import
import indexHtml from "../../public/index.html?raw";

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