import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const repositoryRoot = new URL("../", import.meta.url);
const siteOrigin = "https://messeriassociates.com";
const errors = [];

async function readRepositoryFile(pathname) {
  return readFile(new URL(pathname, repositoryRoot), "utf8");
}

async function findHtmlFiles(directory) {
  const root = new URL(`${directory}/`, repositoryRoot);
  const files = [];

  async function walk(current, relativeDirectory = "") {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const relativePath = join(relativeDirectory, entry.name);
      const absolutePath = new URL(entry.name, current);

      if (entry.isDirectory()) {
        await walk(new URL(`${entry.name}/`, current), relativePath);
      } else if (extname(entry.name) === ".html") {
        files.push({
          absolutePath,
          displayPath: join(directory, relativePath),
        });
      }
    }
  }

  await walk(root);
  return files;
}

const sitemap = await readRepositoryFile("public/sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapSet = new Set(sitemapUrls);
const normalizedSitemapUrls = new Set([...sitemapSet].map((url) => url.replace(/\/$/, "")));

if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  errors.push("public/sitemap.xml must begin with a UTF-8 XML declaration.");
}

if (sitemapSet.size !== sitemapUrls.length) {
  errors.push("public/sitemap.xml contains duplicate <loc> entries.");
}

for (const url of sitemapUrls) {
  if (!url.startsWith(`${siteOrigin}/`) && url !== siteOrigin) {
    errors.push(`Sitemap URL is outside the production origin: ${url}`);
  }

  if (url.endsWith(".html")) {
    errors.push(`Sitemap URL is not canonical: ${url}`);
  }
}

const robots = await readRepositoryFile("public/robots.txt");
if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
  errors.push("public/robots.txt does not advertise the production sitemap.");
}

const redirects = await readRepositoryFile("public/_redirects");
const redirectSources = new Set();

for (const [index, rawLine] of redirects.split(/\r?\n/).entries()) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;

  const [source, destination, status, ...extra] = line.split(/\s+/);
  if (!source || !destination || status !== "301" || extra.length > 0) {
    errors.push(`Invalid redirect rule on line ${index + 1}: ${rawLine}`);
    continue;
  }

  if (redirectSources.has(source)) {
    errors.push(`Duplicate redirect source: ${source}`);
  }
  redirectSources.add(source);

  const canonicalDestination = destination.split("#", 1)[0];
  const absoluteDestination = new URL(canonicalDestination, siteOrigin).href.replace(/\/$/, "");
  if (!normalizedSitemapUrls.has(absoluteDestination)) {
    errors.push(`Redirect destination is missing from the sitemap: ${destination}`);
  }
}

for (const directory of ["public", "src"]) {
  for (const htmlFile of await findHtmlFiles(directory)) {
    const html = await readFile(htmlFile.absolutePath, "utf8");
    const legacyLinks = [...html.matchAll(/href="([^"#?]*\.html(?:[#?][^"]*)?)"/g)];
    for (const match of legacyLinks) {
      errors.push(`${htmlFile.displayPath} links to legacy URL ${match[1]}`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `SEO validation passed: ${sitemapUrls.length} canonical URLs, ${redirectSources.size} permanent redirects, and no internal .html links.`,
  );
}
