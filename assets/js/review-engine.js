(function () {
  const BRAND = "AI Creator Hub";
  const TAGLINE = "Discover. Compare. Choose Better AI.";
  const SITE_BASE_URL = "https://holmesmike1994-commits.github.io/ai-creator-hub/";
  const SOURCE_CHECKLIST = [
    "Official product website",
    "Official documentation",
    "Pricing pages",
    "Release notes",
    "Public feature lists",
    "Well-established public user sentiment"
  ];

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const slugify = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const sentence = (items) => items.filter(Boolean).join(", ");

  const ensureArray = (value, fallback = []) => {
    if (Array.isArray(value) && value.length) return value;
    if (typeof value === "string" && value.trim()) return [value.trim()];
    return fallback;
  };

  const publicUrl = (href) => {
    try {
      const value = String(href || "").trim();
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? value : "";
    } catch {
      return "";
    }
  };

  const nowDate = () => new Date().toISOString().slice(0, 10);

  const defaultFaqs = (review) => [
    {
      question: `What is ${review.name}?`,
      answer: `${review.name} is reviewed by ${BRAND} as a ${review.category} tool. Verify current positioning, feature claims, and availability against official product sources before publication.`
    },
    {
      question: `Who is ${review.name} best for?`,
      answer: `${review.name} is best suited for ${sentence(review.bestFor)}. The final recommendation should be updated after hands-on testing and pricing verification.`
    },
    {
      question: `Does ${review.name} have a free trial?`,
      answer: `${review.name}'s free trial status should be confirmed from the official pricing page because AI product plans and limits change frequently.`
    },
    {
      question: `How much does ${review.name} cost?`,
      answer: `Pricing for ${review.name} should be verified from the official pricing page. This template stores pricing context separately so the review can be updated quickly.`
    },
    {
      question: `What are the main benefits of ${review.name}?`,
      answer: `${review.name}'s main benefits depend on the workflow, but the review should evaluate output quality, ease of use, pricing fit, integrations, and reliability.`
    },
    {
      question: `What are the main drawbacks of ${review.name}?`,
      answer: `The review should clearly state ${review.name}'s limitations, including pricing friction, missing features, workflow constraints, or uncertainty that could affect buying decisions.`
    },
    {
      question: `What are the best alternatives to ${review.name}?`,
      answer: `The best alternatives to ${review.name} depend on the buyer's category and use case. This review template automatically links competing tools from the same AI category when available.`
    },
    {
      question: `Is ${review.name} worth it?`,
      answer: `${review.name} is worth considering if its strongest use cases match your workflow and its pricing makes sense after testing. The final verdict should reflect current product evidence, not hype.`
    }
  ];

  const buildSeo = (review) => {
    const slug = review.slug || slugify(review.name);
    const title = `${review.name} Review: Pricing, Pros, Cons & Alternatives | ${BRAND}`;
    const metaDescription = `${review.name} review for ${review.category.toLowerCase()} buyers. Compare pricing, features, pros, cons, use cases, alternatives, and final verdict.`;
    const keywords = [
      `${review.name} review`,
      `${review.name} pricing`,
      `${review.name} alternatives`,
      `${review.category} AI tools`,
      `${review.name} pros and cons`,
      `${review.name} vs competitors`
    ];

    return {
      title,
      metaDescription,
      slug,
      canonicalPath: `reviews/${slug}.html`,
      openGraph: {
        title,
        description: metaDescription,
        type: "article",
        image: "../assets/img/hero-dashboard.png"
      },
      twitterCard: {
        card: "summary_large_image",
        title,
        description: metaDescription
      },
      keywords,
      linkSuggestions: [
        "../reviews.html",
        `../categories.html#${slugify(review.category)}`,
        "../affiliate-disclosure.html",
        "../privacy-policy.html"
      ]
    };
  };

  const normalizeReview = (source, allReviews = []) => {
    const name = source.name || source.toolName || "Untitled AI Tool";
    const category = source.category || "AI Tools";
    const slug = source.slug || slugify(name);
    const bestFor = ensureArray(source.bestFor || source.idealFor, [
      `${category} buyers`,
      "AI evaluators",
      "teams comparing tools"
    ]);
    const shortDescription =
      source.shortDescription ||
      source.summary ||
      `${name} is a ${category.toLowerCase()} product. This review should be completed after checking official sources and hands-on testing.`;
    const verdict =
      source.quickVerdict ||
      source.verdict ||
      `${name} is worth evaluating if your workflow matches its strongest use cases, but pricing, platform support, and current feature claims should be verified from official sources before making a recommendation.`;
    const officialWebsite = publicUrl(source.officialWebsite || source.website || source.affiliate?.officialWebsite);
    const affiliateUrl = source.affiliateUrl || source.affiliateURL || source.affiliate?.affiliateUrl || "";
    const cleanAffiliateUrl = publicUrl(affiliateUrl);
    const officialWebsiteButtonUrl = publicUrl(source.officialWebsiteButtonUrl || source.primaryCtaUrl || cleanAffiliateUrl || officialWebsite);
    const scores = source.scores || {
      aiCreatorHubScore: {
        score: null,
        label: "Pending",
        status: "Pending",
        badges: []
      },
      communityScore: {
        score: null,
        sentiment: "Pending",
        status: "Pending"
      },
      confidence: "Limited"
    };
    const sameCategory = allReviews
      .filter((item) => item.name !== name && item.category === category)
      .slice(0, 4);
    const alternatives = ensureArray(source.alternatives, sameCategory.map((item) => ({
      name: item.name,
      category: item.category,
      url: item.url || `reviews/${item.slug || slugify(item.name)}.html`,
      summary: item.summary || `A competing ${category.toLowerCase()} option.`
    }))).slice(0, 6);

    const review = {
      ...source,
      name,
      slug,
      category,
      currentVersion: source.currentVersion || "Current version pending official verification",
      scores,
      shortDescription,
      bestFor,
      officialWebsite,
      officialWebsiteButtonUrl,
      primaryCtaUrl: publicUrl(source.primaryCtaUrl || officialWebsiteButtonUrl),
      affiliateUrl: cleanAffiliateUrl,
      affiliateCtaLabel: source.affiliateCtaLabel || source.ctaLabel || `Get ${name}`,
      quickVerdict: verdict,
      developer: source.developer || "Pending official verification",
      pricing: source.pricing || "Pending official pricing verification",
      platforms: ensureArray(source.platforms, ["Web or supported platforms pending verification"]),
      freeTrial: source.freeTrial || "Pending official verification",
      api: source.api || "Pending official verification",
      pros: ensureArray(source.pros, [
        "Clear value proposition for the right workflow",
        "Potential to save time when matched to the correct use case",
        "Worth testing against category alternatives"
      ]),
      cons: ensureArray(source.cons, [
        "Pricing and usage limits should be verified before buying",
        "Feature claims may change as the product evolves",
        "Hands-on testing is required before final recommendation"
      ]),
      whatIsIt:
        source.whatIsIt ||
        `${name} is categorized by ${BRAND} as a ${category.toLowerCase()} tool. A complete review should explain what the product does, who built it, how it fits into a creator or business workflow, and which claims are supported by official sources.`,
      keyFeatures: ensureArray(source.keyFeatures, [
        {
          title: "Core workflow",
          description: `Document the main workflow ${name} supports after reviewing official product pages and documentation.`
        },
        {
          title: "Output quality",
          description: "Evaluate output quality with practical examples instead of repeating marketing claims."
        },
        {
          title: "Integrations and platform fit",
          description: "Confirm supported platforms, integrations, API access, and export options from official sources."
        }
      ]),
      pricingTable: ensureArray(source.pricingTable, [
        { plan: "Free or Trial", price: "Verify", bestFor: "Initial testing", notes: "Confirm current limits from official pricing." },
        { plan: "Paid Plan", price: "Verify", bestFor: "Regular use", notes: "Confirm features, seats, and usage limits." },
        { plan: "Business or Enterprise", price: "Verify", bestFor: "Teams", notes: "Confirm security, support, and admin controls." }
      ]),
      whoShouldBuy: ensureArray(source.whoShouldBuy, [
        `Teams that need a ${category.toLowerCase()} solution and are willing to test quality before subscribing.`,
        "Buyers who want to compare pricing, workflow fit, and alternatives before committing.",
        "Creators or operators whose use case matches the product's strongest documented features."
      ]),
      whoShouldSkip: ensureArray(source.whoShouldSkip, [
        "Buyers who need guaranteed feature availability that has not been verified.",
        "Teams that cannot validate pricing, data handling, or usage limits before adoption.",
        "Users whose workflow is better served by a simpler or more specialized alternative."
      ]),
      useCases: ensureArray(source.realWorldUseCases || source.useCases, [
        `Test ${name} against a real ${category.toLowerCase()} workflow before buying.`,
        "Compare output quality with at least two competing products.",
        "Document time saved, accuracy, collaboration fit, and handoff requirements."
      ]),
      alternatives,
      comparisonSuggestions: ensureArray(source.comparisonSuggestions, alternatives.length
        ? alternatives.map((item) => `Compare ${name} vs ${item.name}`).slice(0, 4)
        : [`Compare ${name} vs leading ${category} alternatives`]),
      faqs: ensureArray(source.faqs, []),
      finalVerdict:
        source.finalVerdict ||
        `The final recommendation for ${name} should be based on verified pricing, documented features, current product limits, and hands-on results. ${BRAND} should clearly separate confirmed facts from editorial judgment.`,
      affiliateDisclosure:
        source.affiliateDisclosure ||
        `${BRAND} may earn a commission if readers purchase through affiliate links. Affiliate relationships do not determine scores, rankings, or recommendations.`,
      lastVerified: source.lastVerified || source.updated || source.published || nowDate(),
      methodology: source.methodology || "",
      scoreMethodology: source.scoreMethodology || "",
      evidence: ensureArray(source.evidence, []),
      sourceLinks: ensureArray(source.sourceLinks, []),
      relatedLinks: ensureArray(source.relatedLinks, []),
      sources: ensureArray(source.sources, SOURCE_CHECKLIST.map((name) => ({ name, status: "Required before publication" }))),
      published: source.published || nowDate(),
      updated: source.updated || source.published || nowDate()
    };

    review.faqs = review.faqs.length >= 8 ? review.faqs.slice(0, 8) : defaultFaqs(review);
    review.seo = { ...buildSeo(review), ...(source.seo || {}) };
    return review;
  };

  const list = (items, className = "check-list") =>
    `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

  const featureCards = (features) => `
    <div class="engine-card-grid">
      ${features.map((feature) => `
        <article class="engine-mini-card">
          <h3>${escapeHtml(feature.title || feature)}</h3>
          <p>${escapeHtml(feature.description || "Feature details should be verified from official sources.")}</p>
        </article>
      `).join("")}
    </div>
  `;

  const pricingTable = (rows) => `
    <div class="engine-table-wrap">
      <table class="engine-table">
        <thead><tr><th>Plan</th><th>Price</th><th>Best For</th><th>Notes</th></tr></thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.plan)}</td>
              <td>${escapeHtml(row.price)}</td>
              <td>${escapeHtml(row.bestFor)}</td>
              <td>${escapeHtml(row.notes)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  const alternativeCards = (alternatives, basePrefix) => `
    <div class="engine-card-grid">
      ${alternatives.map((item) => {
        const href = item.url && /^https?:/i.test(item.url) ? item.url : `${basePrefix}${item.url || `reviews/${slugify(item.name)}.html`}`;
        return `
          <article class="engine-mini-card">
            <span class="tool-chip">${escapeHtml(item.category || "Alternative")}</span>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.summary || "Competing tool to evaluate in the same workflow.")}</p>
            <a href="${escapeHtml(href)}">View alternative</a>
          </article>
        `;
      }).join("")}
    </div>
  `;

  const faqItems = (faqs) => `
    <div class="faq-list">
      ${faqs.map((faq) => `
        <details class="faq-item">
          <summary>${escapeHtml(faq.question)}</summary>
          <p>${escapeHtml(faq.answer)}</p>
        </details>
      `).join("")}
    </div>
  `;

  const linkedList = (items, basePrefix) => `
    <ul class="check-list engine-link-list">
      ${items.map((item) => {
        if (typeof item === "string") return `<li>${escapeHtml(item)}</li>`;
        const rawHref = String(item.url || item.href || "").trim();
        const href = /^https?:/i.test(rawHref) ? rawHref : `${basePrefix}${rawHref}`;
        const external = /^https?:/i.test(rawHref);
        return `<li><a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(item.title || item.name || rawHref)}</a>${item.description ? `<span>${escapeHtml(item.description)}</span>` : ""}</li>`;
      }).join("")}
    </ul>
  `;

  const sourceCards = (items) => `
    <div class="source-link-grid">
      ${items.map((item) => {
        const href = publicUrl(item.url || item.href);
        if (!href) return "";
        return `
          <a class="source-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
            <strong>${escapeHtml(item.title || item.name || "Official source")}</strong>
            <span>${escapeHtml(item.description || "Open the official source in a new tab.")}</span>
          </a>
        `;
      }).join("")}
    </div>
  `;

  const evidenceGallery = (items) => `
    <div class="evidence-grid">
      ${items.map((item) => `
        <figure class="evidence-card">
          <a href="${escapeHtml(item.sourceUrl || item.image)}"${item.sourceUrl ? ' target="_blank" rel="noopener noreferrer"' : ""}>
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title || "Product evidence")}" loading="lazy" width="1000" height="810">
          </a>
          <figcaption><strong>${escapeHtml(item.title || "Product evidence")}</strong>${item.caption ? `<span>${escapeHtml(item.caption)}</span>` : ""}</figcaption>
        </figure>
      `).join("")}
    </div>
  `;

  const section = (title, body, eyebrow = "") => `
    <section class="engine-section">
      <div class="container narrow content-panel reveal">
        ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
        <h2>${escapeHtml(title)}</h2>
        ${body}
      </div>
    </section>
  `;

  const scoreText = (score) =>
    typeof score === "number" ? `${score.toFixed(1)} / 10` : "Pending";

  const absoluteUrl = (path = "", baseUrl = SITE_BASE_URL) => {
    try {
      return new URL(path || "", baseUrl || SITE_BASE_URL).href;
    } catch {
      return `${SITE_BASE_URL}${String(path || "").replace(/^\/+/, "")}`;
    }
  };

  const breadcrumbPage = (name, url) => ({
    "@type": "WebPage",
    "@id": url,
    url,
    name
  });

  const schemaScripts = (review, baseUrl = SITE_BASE_URL) => {
    const canonical = absoluteUrl(review.seo.canonicalPath || `reviews/${review.slug}.html`, baseUrl);
    const homeUrl = absoluteUrl("", baseUrl);
    const reviewsUrl = absoluteUrl("reviews.html", baseUrl);
    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "SoftwareApplication",
          name: review.name,
          applicationCategory: review.category,
          operatingSystem: review.platforms.join(", "),
          url: publicUrl(review.officialWebsite)
        },
        author: { "@type": "Organization", name: BRAND },
        datePublished: review.published,
        dateModified: review.updated,
        reviewBody: review.quickVerdict
      };
    if (typeof review.scores.aiCreatorHubScore.score === "number") {
      reviewSchema.reviewRating = {
          "@type": "Rating",
          ratingValue: review.scores.aiCreatorHubScore.score,
          bestRating: 10,
          worstRating: 0
        };
    }
    if (review.evidence.length) {
      reviewSchema.image = review.evidence.map((item) => absoluteUrl(item.image, canonical));
    }
    return [
      reviewSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: review.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: breadcrumbPage("Home", homeUrl) },
          { "@type": "ListItem", position: 2, name: "Reviews", item: breadcrumbPage("Reviews", reviewsUrl) },
          { "@type": "ListItem", position: 3, name: `${review.name} Review`, item: breadcrumbPage(`${review.name} Review`, canonical) }
        ]
      }
    ];
  };

  const injectSchemas = (review) => {
    document.querySelectorAll("script[data-engine-schema]").forEach((script) => script.remove());
    schemaScripts(review).forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.engineSchema = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  };

  const updateMeta = (review) => {
    document.title = review.seo.title;
    const ensureMeta = (selector, attrs) => {
      let meta = document.head.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        document.head.appendChild(meta);
      }
      Object.entries(attrs).forEach(([key, value]) => meta.setAttribute(key, value));
    };
    const canonicalUrl = absoluteUrl(review.seo.canonicalPath || `reviews/${review.slug}.html`);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
    ensureMeta('meta[name="description"]', { name: "description", content: review.seo.metaDescription });
    ensureMeta('meta[name="keywords"]', { name: "keywords", content: review.seo.keywords.join(", ") });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: review.seo.openGraph.title });
    ensureMeta('meta[property="og:description"]', { property: "og:description", content: review.seo.openGraph.description });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: review.seo.openGraph.type });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    if (review.seo.openGraph.image) {
      ensureMeta('meta[property="og:image"]', { property: "og:image", content: absoluteUrl(review.seo.openGraph.image, canonicalUrl) });
    }
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: review.seo.twitterCard.card });
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: review.seo.twitterCard.title });
    ensureMeta('meta[name="twitter:description"]', { name: "twitter:description", content: review.seo.twitterCard.description });
    if (review.seo.twitterCard.image) {
      ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: absoluteUrl(review.seo.twitterCard.image, canonicalUrl) });
    }
  };

  const renderReview = (source, options = {}) => {
    const review = normalizeReview(source, options.allReviews || []);
    const prefix = options.fromNested ? "../" : "";
    const officialWebsite = publicUrl(review.officialWebsite);
    const officialCtaHref = publicUrl(review.officialWebsiteButtonUrl || review.primaryCtaUrl || review.affiliateUrl || officialWebsite);
    const affiliateHref = publicUrl(review.affiliateUrl);
    const officialRel = affiliateHref && officialCtaHref === affiliateHref
      ? "sponsored nofollow noopener noreferrer"
      : "nofollow noopener noreferrer";
    const scores = review.scores;
    const badges = scores.aiCreatorHubScore.badges?.length ? scores.aiCreatorHubScore.badges : [review.badge].filter(Boolean);

    return `
      <section class="review-hero engine-review-hero section">
        <div class="container review-hero__grid">
          <div>
            <a class="breadcrumb" href="${prefix}reviews.html">Reviews</a>
            <p class="eyebrow">${escapeHtml(review.category)} Review</p>
            <h1>${escapeHtml(review.name)} Review</h1>
            <p class="lede">${escapeHtml(review.shortDescription)}</p>
            <div class="engine-hero-actions">
              ${officialCtaHref ? `<a class="button" href="${escapeHtml(officialCtaHref)}" target="_blank" rel="${officialRel}">Official Website</a>` : ""}
              ${affiliateHref ? `<a class="button button--ghost" href="${escapeHtml(affiliateHref)}" target="_blank" rel="sponsored nofollow noopener noreferrer">${escapeHtml(review.affiliateCtaLabel)}</a>` : ""}
            </div>
          </div>
          <aside class="review-score-card reveal" aria-label="${escapeHtml(review.name)} review summary">
            <span class="rating rating--large">${scoreText(scores.aiCreatorHubScore.score)}</span>
            <h2>${escapeHtml(scores.aiCreatorHubScore.label || review.bestFor[0] || "Score pending")}</h2>
            <dl>
              <div><dt>Current Version</dt><dd>${escapeHtml(review.currentVersion)}</dd></div>
              <div><dt>AI Creator Hub Score</dt><dd>${scoreText(scores.aiCreatorHubScore.score)}</dd></div>
              <div><dt>Community Score</dt><dd>${scoreText(scores.communityScore.score)}${scores.communityScore.sentiment ? ` (${escapeHtml(scores.communityScore.sentiment)})` : ""}</dd></div>
              <div><dt>Confidence</dt><dd>${escapeHtml(scores.confidence)}</dd></div>
              <div><dt>Best For</dt><dd>${escapeHtml(sentence(review.bestFor))}</dd></div>
            </dl>
            ${badges.length ? `<div class="badge-row">${badges.map((badge) => `<span>${escapeHtml(badge)}</span>`).join("")}</div>` : ""}
          </aside>
        </div>
      </section>
      ${section("Quick Verdict", `<p>${escapeHtml(review.quickVerdict)}</p>`)}
      ${review.methodology || review.scoreMethodology || review.sourceLinks.length ? `
        <section class="engine-section">
          <div class="container narrow content-panel reveal review-methodology">
            <p class="eyebrow">How This Review Was Prepared</p>
            <h2>Evidence before recommendation.</h2>
            <div class="engine-fact-grid">
              <div><span>Last source check</span><strong>${escapeHtml(review.lastVerified)}</strong></div>
              <div><span>Confidence</span><strong>${escapeHtml(scores.confidence)}</strong></div>
              <div><span>Score status</span><strong>${escapeHtml(scores.aiCreatorHubScore.status || "Editorial")}</strong></div>
            </div>
            ${review.methodology ? `<p>${escapeHtml(review.methodology)}</p>` : ""}
            ${review.scoreMethodology ? `<p class="editorial-note"><strong>Scoring:</strong> ${escapeHtml(review.scoreMethodology)}</p>` : ""}
          </div>
        </section>
      ` : ""}
      <section class="engine-section">
        <div class="container content-panel reveal">
          <p class="eyebrow">At a Glance</p>
          <h2>At a Glance</h2>
          <div class="engine-fact-grid">
            ${[
              ["Developer", review.developer],
              ["Category", review.category],
              ["Pricing", review.pricing],
              ["Platforms", review.platforms.join(", ")],
              ["Free Trial", review.freeTrial],
              ["API", review.api],
              ["Best For", sentence(review.bestFor)]
            ].map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="engine-section">
        <div class="container two-column">
          <article class="content-panel reveal">
            <p class="eyebrow">Pros</p>
            <h2>Pros</h2>
            ${list(review.pros, "check-list engine-check-list")}
          </article>
          <article class="content-panel reveal">
            <p class="eyebrow">Cons</p>
            <h2>Cons</h2>
            ${list(review.cons, "minus-list engine-check-list")}
          </article>
        </div>
      </section>
      ${section("What Is It?", `<p>${escapeHtml(review.whatIsIt)}</p>`)}
      ${section("Key Features", featureCards(review.keyFeatures))}
      ${review.evidence.length ? section("Product Evidence", evidenceGallery(review.evidence), "Official Product Interface") : ""}
      ${section("Pricing", pricingTable(review.pricingTable))}
      ${section("Who Should Buy It?", list(review.whoShouldBuy))}
      ${section("Who Should Skip It?", list(review.whoShouldSkip, "minus-list engine-check-list"))}
      ${section("Real World Use Cases", list(review.useCases))}
      ${section("Alternatives", alternativeCards(review.alternatives, prefix))}
      ${review.relatedLinks.length ? section("Related Whiteboard Guides", linkedList(review.relatedLinks, prefix)) : ""}
      ${section("Comparison Suggestions", linkedList(review.comparisonSuggestions, prefix))}
      ${review.sourceLinks.length ? section("Official Sources", sourceCards(review.sourceLinks), "Source Check") : ""}
      ${section("Frequently Asked Questions", faqItems(review.faqs))}
      ${section("Final Verdict", `<p>${escapeHtml(review.finalVerdict)}</p>`)}
      ${affiliateHref ? section("Affiliate Disclosure", `<p>${escapeHtml(review.affiliateDisclosure)}</p><p class="fine-print">Links marked as partner or affiliate links may earn ${BRAND} a commission at no additional cost to readers.</p>`) : ""}
    `;
  };

  const renderInto = (container, source, options = {}) => {
    const review = normalizeReview(source, options.allReviews || []);
    container.innerHTML = renderReview(review, options);
    updateMeta(review);
    injectSchemas(review);
    return review;
  };

  window.AICHReviewEngine = {
    slugify,
    normalizeReview,
    renderReview,
    renderInto,
    schemaScripts
  };
})();
