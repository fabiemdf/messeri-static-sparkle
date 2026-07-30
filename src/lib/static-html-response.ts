const HTML_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "public, max-age=300",
} as const;

export function htmlResponse(html: string): Response {
  return new Response(html, { headers: HTML_HEADERS });
}

export function htmlNotFound(): Response {
  return new Response("Page not found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=60",
    },
  });
}
