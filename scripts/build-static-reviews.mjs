import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const SITE_BASE_URL = "https://holmesmike1994-commits.github.io/ai-creator-hub/";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const dataSource = await readFile(path.join(root, "assets/js/reviews-data.js"), "utf8");
const engineSource = await readFile(path.join(root, "assets/js/review-engine.js"), "utf8");
const browserWindow = {};
const context = vm.createContext({ window: browserWindow, URL, Date, console });

vm.runInContext(dataSource, context, { filename: "reviews-data.js" });
vm.runInContext(engineSource, context, { filename: "review-engine.js" });

const reviews = browserWindow.AICHReviews || [];
const engine = browserWindow.AICHReviewEngine;

if (!reviews.length || !engine) {
  throw new Error("Review data or the shared review engine could not be loaded.");
}

const absoluteUrl = (value, base = SITE_BASE_URL) => {
  try {
    return new URL(value || "", base).href;
  } catch {
    return base;
  }
};

const schemaMarkup = (review) =>
  engine.schemaScripts(review).map((schema) =>
    `  <script type="application/ld+json" data-engine-schema="true">\n${JSON.stringify(schema, null, 2)}\n  </script>`
  ).join("\n");

const reviewPage = (source) => {
  const review = engine.normalizeReview(source, reviews);
  const canonical = absoluteUrl(review.seo.canonicalPath || `reviews/${review.slug}.html`);
  const ogImage = review.seo.openGraph.image
    ? absoluteUrl(review.seo.openGraph.image, canonical)
    : "";
  const twitterImage = review.seo.twitterCard.image
    ? absoluteUrl(review.seo.twitterCard.image, canonical)
    : ogImage;
  const body = engine.renderReview(review, { allReviews: reviews, fromNested: true });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(review.seo.title)}</title>
  <meta name="description" content="${escapeHtml(review.seo.metaDescription)}">
  <meta name="keywords" content="${escapeHtml(review.seo.keywords.join(", "))}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(review.seo.openGraph.title)}">
  <meta property="og:description" content="${escapeHtml(review.seo.openGraph.description)}">
  <meta property="og:type" content="${escapeHtml(review.seo.openGraph.type || "article")}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ""}
  <meta name="twitter:card" content="${escapeHtml(review.seo.twitterCard.card || "summary_large_image")}">
  <meta name="twitter:title" content="${escapeHtml(review.seo.twitterCard.title)}">
  <meta name="twitter:description" content="${escapeHtml(review.seo.twitterCard.description)}">
  ${twitterImage ? `<meta name="twitter:image" content="${escapeHtml(twitterImage)}">` : ""}
${schemaMarkup(review)}
  <link rel="icon" href="../assets/img/favicon-aih.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body data-active="reviews" data-review-slug="${escapeHtml(review.slug)}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="nav" aria-label="Primary navigation">
      <a class="brand" href="../index.html" aria-label="AI Creator Hub home"><span class="brand__mark" aria-hidden="true">AIH</span><span>AI Creator Hub</span></a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-controls="primary-navigation" aria-expanded="false"><span></span></button>
      <nav class="nav__links" id="primary-navigation">
        <a href="../index.html" data-nav="home">Home</a>
        <a href="../reviews.html" data-nav="reviews">Reviews</a>
        <a href="../comparisons.html" data-nav="comparisons">Compare</a>
        <a href="../categories.html" data-nav="categories">Categories</a>
        <a href="../about.html" data-nav="about">About</a>
        <a href="../contact.html" data-nav="contact">Contact</a>
      </nav>
    </div>
  </header>
  <main class="main" id="main" data-review-detail data-review-slug="${escapeHtml(review.slug)}" data-static-review="true">
${body}
  </main>
  <footer class="site-footer"></footer>
  <script src="../assets/js/reviews-data.js" defer></script>
  <script src="../assets/js/review-engine.js" defer></script>
  <script src="../assets/js/main.js" defer></script>
</body>
</html>
`;
};

const scoreText = (score) =>
  typeof score === "number" ? `${score.toFixed(1)} / 10` : "Pending";

const directoryCard = (review) => {
  const scores = review.scores || {};
  return `
      <article class="review-card reveal" data-category="${escapeHtml(review.category.toLowerCase())}">
        <div class="review-card__top">
          <span class="tool-chip">${escapeHtml(review.category)}</span>
          <div class="review-card__score"><span class="rating">${scoreText(scores.aiCreatorHubScore?.score)}</span><small>AI Creator Hub Score</small></div>
        </div>
        <h3>${escapeHtml(review.name)}</h3>
        <span class="review-card__badge">${escapeHtml(review.badge || scores.aiCreatorHubScore?.label || "Evaluated")}</span>
        <p>${escapeHtml(review.summary)}</p>
        <div class="public-score-strip">
          <span><strong>Community</strong>${scoreText(scores.communityScore?.score)}</span>
          <span><strong>Confidence</strong>${escapeHtml(scores.confidence || "Limited")}</span>
        </div>
        <div class="review-card__lists">
          <div><strong>Pros</strong><ul>${(review.pros || []).slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          <div><strong>Cons</strong><ul>${(review.cons || []).slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
        </div>
        <a class="button button--ghost" href="${escapeHtml(review.url)}" aria-label="Read ${escapeHtml(review.name)} review">Read Review</a>
      </article>`;
};

for (const review of reviews) {
  const target = path.join(root, "reviews", `${review.slug}.html`);
  await writeFile(target, reviewPage(review).replace(/[ \t]+$/gm, ""), "utf8");
}

const reviewsPagePath = path.join(root, "reviews.html");
let reviewsPage = await readFile(reviewsPagePath, "utf8");
const staticDirectory = [...reviews]
  .sort((a, b) => new Date(b.published) - new Date(a.published))
  .map(directoryCard)
  .join("");
const directoryBlock = `<!-- STATIC_REVIEWS_START -->${staticDirectory}\n      <!-- STATIC_REVIEWS_END -->`;

if (reviewsPage.includes("<!-- STATIC_REVIEWS_START -->")) {
  reviewsPage = reviewsPage.replace(
    /<!-- STATIC_REVIEWS_START -->[\s\S]*?<!-- STATIC_REVIEWS_END -->/,
    directoryBlock
  );
} else {
  reviewsPage = reviewsPage.replace(
    '<div class="grid review-grid" data-review-grid="latest"></div>',
    `<div class="grid review-grid" data-review-grid="latest">${directoryBlock}</div>`
  );
}

await writeFile(reviewsPagePath, reviewsPage, "utf8");
console.log(`Pre-rendered ${reviews.length} review pages and the reviews directory.`);
