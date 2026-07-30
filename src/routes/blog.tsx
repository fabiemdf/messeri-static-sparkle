import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/blog.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/blog")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
