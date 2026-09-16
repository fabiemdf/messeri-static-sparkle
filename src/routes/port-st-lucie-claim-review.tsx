import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/port-st-lucie-claim-review.html?raw";
import { htmlResponse } from "../lib/static-html-response";

export const Route = createFileRoute("/port-st-lucie-claim-review")({
  server: {
    handlers: {
      GET: () => htmlResponse(html),
    },
  },
});
