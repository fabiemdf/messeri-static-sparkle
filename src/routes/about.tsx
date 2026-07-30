import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/about.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/about")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
