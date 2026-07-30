import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/blog-page-2.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/blog/page/2")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
