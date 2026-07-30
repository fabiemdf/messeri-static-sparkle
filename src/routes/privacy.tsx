import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/privacy.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/privacy")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
