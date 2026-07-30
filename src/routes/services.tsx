import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/services.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/services")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
