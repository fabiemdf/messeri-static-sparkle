import { createFileRoute } from "@tanstack/react-router";
import hurricaneSeasonHtml from "../../public/blog/category/hurricane-season.html?raw";
import insuranceClaimsHtml from "../../public/blog/category/insurance-claims.html?raw";
import insuranceLawsHtml from "../../public/blog/category/insurance-laws.html?raw";
import propertyDamageHtml from "../../public/blog/category/property-damage.html?raw";
import waterDamageHtml from "../../public/blog/category/water-damage.html?raw";
import { htmlNotFound, htmlResponse } from "../lib/static-html-response";

const CATEGORY_PAGES: Readonly<Record<string, string>> = {
  "hurricane-season": hurricaneSeasonHtml,
  "insurance-claims": insuranceClaimsHtml,
  "insurance-laws": insuranceLawsHtml,
  "property-damage": propertyDamageHtml,
  "water-damage": waterDamageHtml,
};

export const Route = createFileRoute("/blog/category/$category")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const category = new URL(request.url).pathname.split("/").filter(Boolean).at(-1);
        const html = category ? CATEGORY_PAGES[category] : undefined;
        return html ? htmlResponse(html) : htmlNotFound();
      },
    },
  },
});
