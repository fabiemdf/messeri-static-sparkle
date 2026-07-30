import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/contact.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/contact")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
