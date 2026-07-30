import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/terms.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/terms")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
