import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://holmesmike1994-commits.github.io/ai-creator-hub/";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const fullPath = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(fullPath) : [fullPath];
});

const htmlFiles = walk(root).filter((file) =>
  file.endsWith(".html") && path.basename(file) !== "googlef701e767f79954e7.html"
);
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]?.trim();

  if (!title) failures.push(`${relative}: missing title`);
  if (!description) failures.push(`${relative}: missing meta description`);
  if (title) {
    if (titles.has(title)) failures.push(`${relative}: duplicate title with ${titles.get(title)}`);
    titles.set(title, relative);
  }
  if (description) {
    if (descriptions.has(description)) failures.push(`${relative}: duplicate description with ${descriptions.get(description)}`);
    descriptions.set(description, relative);
  }

  for (const match of html.matchAll(/\bhref="([^"]+)"/gi)) {
    const href = match[1].split("#")[0].split("?")[0];
    if (!href || /^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    const target = path.resolve(path.dirname(file), href);
    if (!existsSync(target)) failures.push(`${relative}: broken local link ${match[1]}`);
  }

  const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [index, match] of schemas.entries()) {
    try {
      const schema = JSON.parse(match[1]);
      if (schema["@type"] === "BreadcrumbList") {
        for (const crumb of schema.itemListElement || []) {
          const item = crumb.item;
          if (!item || typeof item !== "object") failures.push(`${relative}: breadcrumb ${crumb.position} item is not an object`);
          if (!item?.["@id"]?.startsWith("https://")) failures.push(`${relative}: breadcrumb ${crumb.position} @id is not absolute HTTPS`);
          if (!item?.url?.startsWith("https://")) failures.push(`${relative}: breadcrumb ${crumb.position} url is not absolute HTTPS`);
        }
      }
    } catch (error) {
      failures.push(`${relative}: JSON-LD ${index + 1} does not parse: ${error.message}`);
    }
  }

  if (relative.startsWith("reviews/")) {
    const main = html.match(/<main[^>]*data-static-review="true"[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
    if (main.length < 5000) failures.push(`${relative}: review body is not statically rendered`);
    if (schemas.length < 3) failures.push(`${relative}: expected Review, FAQ, and Breadcrumb schema`);
  }

  if (/^(alternatives|guides)\//.test(relative) || relative === "comparisons/instadoodle-vs-videoscribe.html") {
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&\w+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.split(" ").filter(Boolean).length < 650) failures.push(`${relative}: content is too thin`);
  }
}

const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push("sitemap.xml contains duplicate URLs");

for (const url of sitemapUrls) {
  if (!url.startsWith(SITE)) failures.push(`sitemap.xml contains an off-site URL: ${url}`);
  const localPath = url.slice(SITE.length) || "index.html";
  if (!existsSync(path.join(root, localPath))) failures.push(`sitemap.xml points to a missing file: ${url}`);
}

for (const relative of [
  "alternatives/instadoodle-alternatives.html",
  "alternatives/doodly-alternatives.html",
  "comparisons/instadoodle-vs-videoscribe.html",
  "guides/whiteboard-animation-software-for-teachers.html",
  "guides/whiteboard-animation-software-for-youtube.html"
]) {
  if (!sitemap.includes(`<loc>${SITE}${relative}</loc>`)) failures.push(`sitemap.xml is missing ${relative}`);
}

const publicHtml = htmlFiles.map((file) => readFileSync(file, "utf8")).join("\n");
for (const forbidden of [
  "Affiliate Placeholder",
  "VERIFY BEFORE PUBLISHING",
  "Research Evaluation",
  "Hands-On Evaluation",
  "Expert Evaluation",
  "★★★★★",
  "5-star"
]) {
  if (publicHtml.includes(forbidden)) failures.push(`public HTML contains forbidden text: ${forbidden}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} public HTML pages and ${sitemapUrls.length} sitemap URLs.`);
