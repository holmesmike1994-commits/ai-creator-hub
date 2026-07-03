(function () {
  const reviews = window.AICHReviews || [];
  const categories = window.AICHCategories || [];

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const byNewest = (items) =>
    [...items].sort((a, b) => new Date(b.published) - new Date(a.published));

  const icon = {
    chatbots: '<svg viewBox="0 0 24 24"><path d="M7 10.5h10M8.5 14H13m8-2.5c0 4.14-4.03 7.5-9 7.5-1.05 0-2.06-.15-3-.43L4 20l1.44-3.07C3.92 15.58 3 13.68 3 11.5 3 7.36 7.03 4 12 4s9 3.36 9 7.5Z"/></svg>',
    coding: '<svg viewBox="0 0 24 24"><path d="m8.5 8-4 4 4 4m7-8 4 4-4 4M13 5l-2 14"/></svg>',
    video: '<svg viewBox="0 0 24 24"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h7A2.5 2.5 0 0 1 16 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 16.5v-9Zm12 3 4-2.5v8l-4-2.5"/></svg>',
    images: '<svg viewBox="0 0 24 24"><path d="M5 5h14v14H5V5Zm3 10 3-3 2.2 2.2L16 11l3 4M8.5 8.5h.01"/></svg>',
    voice: '<svg viewBox="0 0 24 24"><path d="M12 4v16m-4-4V8m8 8V8M4 13v-2m16 2v-2"/></svg>',
    marketing: '<svg viewBox="0 0 24 24"><path d="M4 13V9l11-4v12L4 13Zm0 0 2 6h3l-2-5m8-6 4-2v10l-4-2"/></svg>',
    productivity: '<svg viewBox="0 0 24 24"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24"><path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M6.5 10v8m0-12v.01M10.5 18v-8m0 3.5c.7-2.4 5.5-3.1 5.5 1.5v3"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M4.5 8.5S5 6.8 6.4 6.4C7.7 6 12 6 12 6s4.3 0 5.6.4c1.4.4 1.9 2.1 1.9 2.1s.5 1.9.5 3.5-.5 3.5-.5 3.5-.5 1.7-1.9 2.1C16.3 18 12 18 12 18s-4.3 0-5.6-.4c-1.4-.4-1.9-2.1-1.9-2.1S4 13.6 4 12s.5-3.5.5-3.5ZM10.5 9.8v4.4L14.5 12l-4-2.2Z"/></svg>'
  };

  const fromNestedReviewPage = window.location.pathname.includes("/reviews/");

  const localHref = (href) => {
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;
    return fromNestedReviewPage ? `../${href}` : href;
  };

  const starRating = (rating) => {
    const filled = Math.round(rating);
    const stars = Array.from({ length: 5 }, (_, index) =>
      `<span class="${index < filled ? "is-filled" : ""}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 3.7 2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.68l-4.7 2.47.9-5.23-3.8-3.7 5.25-.76L12 3.7Z"/></svg></span>`
    ).join("");

    return `<span class="star-rating" aria-label="${rating.toFixed(1)} out of 5 stars">${stars}</span>`;
  };

  const reviewCard = (review) => `
    <article class="review-card reveal" data-category="${review.category.toLowerCase()}">
      <div class="review-card__top">
        <span class="tool-chip">${review.category}</span>
        <div class="review-card__score">
          ${starRating(review.rating)}
          <span class="rating" aria-label="${review.rating} out of 5">${review.rating.toFixed(1)}</span>
        </div>
      </div>
      <h3>${review.name}</h3>
      <span class="review-card__badge">${review.badge}</span>
      <p>${review.summary}</p>
      <div class="review-card__lists">
        <div>
          <strong>Pros</strong>
          <ul>${review.pros.slice(0, 2).map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
        <div>
          <strong>Cons</strong>
          <ul>${review.cons.slice(0, 2).map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
      <a class="button button--ghost" href="${localHref(review.url)}" aria-label="Read ${review.name} review">Read Review</a>
    </article>
  `;

  const renderReviewGrids = () => {
    document.querySelectorAll("[data-review-grid]").forEach((grid) => {
      const type = grid.dataset.reviewGrid;
      const category = grid.dataset.category;
      const limit = Number(grid.dataset.limit || 0);
      let list = reviews;

      if (type === "featured") list = reviews.filter((review) => review.featured);
      if (type === "latest") list = byNewest(reviews);
      if (category) {
        list = list.filter(
          (review) => review.category.toLowerCase() === category.toLowerCase()
        );
      }
      if (limit > 0) list = list.slice(0, limit);

      if (!list.length) {
        grid.innerHTML = `
          <article class="empty-state reveal">
            <h3>Reviews coming soon</h3>
            <p>This category is ready for new review pages. Add a review object in <code>assets/js/reviews-data.js</code> and point it to a page in <code>reviews/</code>.</p>
          </article>
        `;
        return;
      }

      grid.innerHTML = list.map(reviewCard).join("");
    });
  };

  const categoryCard = (category) => {
    const count = reviews.filter((review) => review.category === category.name).length;
    const categoryIcon = icon[category.slug] || icon.productivity;
    return `
      <a class="category-card reveal" href="${localHref(`categories.html#${category.slug}`)}">
        <span class="category-card__icon category-card__icon--${category.slug}" aria-hidden="true"><i>${categoryIcon}</i></span>
        <span>
          <strong>${category.name}</strong>
          <small>${category.description}</small>
          <em>${count || "More"} ${count === 1 ? "review" : "reviews"}</em>
        </span>
      </a>
    `;
  };

  const renderCategories = () => {
    document.querySelectorAll("[data-category-list]").forEach((list) => {
      list.innerHTML = categories.map(categoryCard).join("");
    });
  };

  const setupSearch = () => {
    const searchItems = [
      ...reviews.map((review) => ({
        type: "Review",
        title: review.name,
        meta: review.category,
        description: review.summary,
        href: localHref(review.url),
        tokens: `${review.name} ${review.category} ${review.summary} ${review.pros.join(" ")} ${review.cons.join(" ")}`.toLowerCase()
      })),
      ...categories.map((category) => ({
        type: "Category",
        title: category.name,
        meta: "Category guide",
        description: category.description,
        href: localHref(`categories.html#${category.slug}`),
        tokens: `${category.name} ${category.description}`.toLowerCase()
      }))
    ];

    document.querySelectorAll("[data-tool-search]").forEach((form) => {
      const input = form.querySelector("[data-search-input]");
      const results = form.querySelector("[data-search-results]");
      if (!input || !results) return;

      const render = () => {
        const query = input.value.trim().toLowerCase();
        const matches = query
          ? searchItems.filter((item) => item.tokens.includes(query)).slice(0, 6)
          : searchItems.slice(0, 5);

        results.hidden = false;
        results.innerHTML = matches.length
          ? matches
              .map(
                (item) => `
                  <a class="search-result" href="${item.href}">
                    <span>${icon.search}${item.type} / ${item.meta}</span>
                    <strong>${item.title}</strong>
                    <small>${item.description}</small>
                  </a>
                `
              )
              .join("")
          : `<div class="search-result search-result--empty"><strong>No matching tools yet</strong><small>Try a category like coding, video, voice, or marketing.</small></div>`;
      };

      input.addEventListener("input", render);
      input.addEventListener("focus", render);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        render();
        const firstResult = results.querySelector("a");
        if (firstResult) window.location.href = firstResult.href;
      });
      document.addEventListener("click", (event) => {
        if (!form.contains(event.target)) results.hidden = true;
      });
      results.hidden = true;
    });
  };

  const scoreBar = ([label, value]) => `
    <div class="score-row">
      <span>${label}</span>
      <div class="score-row__track" aria-hidden="true"><i style="width: ${value * 10}%"></i></div>
      <strong>${value.toFixed(1)}</strong>
    </div>
  `;

  const renderReviewDetail = () => {
    const detail = document.querySelector("[data-review-detail]");
    if (!detail) return;

    const slug = detail.dataset.reviewSlug || document.body.dataset.reviewSlug;
    const review = reviews.find((item) => item.slug === slug);

    if (!review) {
      detail.innerHTML = `
        <section class="section">
          <div class="container narrow">
            <p class="eyebrow">Review unavailable</p>
            <h1>This review could not be found.</h1>
            <p>Return to the reviews directory to keep exploring AI tools.</p>
            <a class="button" href="../reviews.html">All Reviews</a>
          </div>
        </section>
      `;
      return;
    }

    if (window.AICHReviewEngine) {
      window.AICHReviewEngine.renderInto(detail, review, {
        allReviews: reviews,
        categories,
        fromNested: fromNestedReviewPage
      });
      return;
    }

    detail.innerHTML = `
      <section class="review-hero section">
        <div class="container review-hero__grid">
          <div>
            <a class="breadcrumb" href="../reviews.html">Reviews</a>
            <p class="eyebrow">${review.category} Review</p>
            <h1>${review.name} Review</h1>
            <p class="lede">${review.summary}</p>
            <div class="hero-actions">
              <a class="button" href="../reviews.html">Explore More Reviews</a>
              <a class="button button--ghost" href="../categories.html#${review.category.toLowerCase()}">View Category</a>
            </div>
          </div>
          <aside class="review-score-card reveal" aria-label="${review.name} score summary">
            <span class="rating rating--large">${review.rating.toFixed(1)}/5</span>
            <h2>${review.badge}</h2>
            <p>${review.verdict}</p>
            <dl>
              <div><dt>Category</dt><dd>${review.category}</dd></div>
              <div><dt>Updated</dt><dd>${formatDate(review.published)}</dd></div>
              <div><dt>Pricing</dt><dd>${review.pricing}</dd></div>
            </dl>
          </aside>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container two-column">
          <article class="content-panel reveal">
            <h2>Quick Verdict</h2>
            <p>${review.verdict}</p>
            <h2>Best For</h2>
            <ul class="tag-list">${review.idealFor.map((item) => `<li>${item}</li>`).join("")}</ul>
            <h2>Top Use Cases</h2>
            <ul class="check-list">${review.useCases.map((item) => `<li>${item}</li>`).join("")}</ul>
          </article>
          <aside class="content-panel reveal">
            <h2>Score Breakdown</h2>
            <div class="score-list">
              ${Object.entries(review.scoreBreakdown).map(scoreBar).join("")}
            </div>
          </aside>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container two-column">
          <article class="content-panel reveal">
            <h2>Pros</h2>
            <ul class="check-list">${review.pros.map((item) => `<li>${item}</li>`).join("")}</ul>
          </article>
          <article class="content-panel reveal">
            <h2>Cons</h2>
            <ul class="minus-list">${review.cons.map((item) => `<li>${item}</li>`).join("")}</ul>
          </article>
        </div>
      </section>
      <section class="section">
        <div class="container narrow content-panel reveal">
          <h2>Editorial Note</h2>
          <p>This placeholder review is structured for a deeper hands-on article. Add screenshots, pricing tables, feature tests, alternatives, and final recommendations as the review is expanded.</p>
          <p class="fine-print">Some links may become affiliate links. Ratings should be updated after direct testing and pricing verification.</p>
        </div>
      </section>
    `;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "SoftwareApplication",
        name: review.name,
        applicationCategory: review.category
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5
      },
      author: {
        "@type": "Organization",
        name: "AI Creator Hub"
      },
      datePublished: review.published,
      reviewBody: review.summary
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  };

  const setupNavigation = () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#primary-navigation");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        nav.classList.toggle("is-open", !isOpen);
      });
    }

    const active = document.body.dataset.active;
    if (active) {
      document.querySelectorAll("[data-nav]").forEach((link) => {
        if (link.dataset.nav === active) link.setAttribute("aria-current", "page");
      });
    }
  };

  const setupForms = () => {
    document.querySelectorAll("[data-frontend-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = form.querySelector("[data-form-message]");
        if (message) {
          message.textContent = "Thanks. This demo form is ready for your email provider or CRM integration.";
        }
        form.reset();
      });
    });
  };

  const renderFooter = () => {
    document.querySelectorAll(".site-footer").forEach((footer) => {
      footer.innerHTML = `
        <div class="container">
          <div class="footer-shell">
            <div class="footer-brand-panel">
              <a class="footer-lockup-link" href="${localHref("index.html")}" aria-label="AI Creator Hub home">
                <img class="footer-lockup" src="${localHref("assets/img/brand-lockup-aih.svg")}" alt="AI Creator Hub - Discover. Compare. Choose Better AI." loading="lazy">
              </a>
              <p>AI Creator Hub is a decision platform for discovering, comparing, testing, and choosing better AI tools before teams waste budget or time.</p>
              <form class="footer-newsletter" data-frontend-form>
                <label for="footer-newsletter-email">Launch Brief</label>
                <div class="input-row">
                  <input class="field" id="footer-newsletter-email" name="email" type="email" placeholder="creator@example.com" autocomplete="email" required>
                  <button class="button" type="submit">Join</button>
                </div>
                <p class="form-message" data-form-message aria-live="polite"></p>
              </form>
            </div>
            <div class="footer-link-grid">
              <div>
                <h2>Platform</h2>
                <ul class="footer-list">
                  <li><a href="${localHref("reviews.html")}">Reviews</a></li>
                  <li><a href="${localHref("categories.html")}">Categories</a></li>
                  <li><a href="${localHref("about.html")}">About</a></li>
                  <li><a href="${localHref("contact.html")}">Contact</a></li>
                </ul>
              </div>
              <div>
                <h2>Categories</h2>
                <ul class="footer-list">
                  ${categories.slice(0, 7).map((category) => `<li><a href="${localHref(`categories.html#${category.slug}`)}">${category.name}</a></li>`).join("")}
                </ul>
              </div>
              <div>
                <h2>Trust</h2>
                <ul class="footer-list">
                  <li><a href="${localHref("privacy-policy.html")}">Privacy Policy</a></li>
                  <li><a href="${localHref("affiliate-disclosure.html")}">Affiliate Disclosure</a></li>
                </ul>
                <div class="social-links social-links--icons" aria-label="Social links">
                  <a href="#" aria-label="AI Creator Hub on X">${icon.x}</a>
                  <a href="#" aria-label="AI Creator Hub on LinkedIn">${icon.linkedin}</a>
                  <a href="#" aria-label="AI Creator Hub on YouTube">${icon.youtube}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p class="fine-print">&copy; <span data-current-year></span> AI Creator Hub. All rights reserved.</p>
            <p class="fine-print">Discover. Compare. Choose Better AI.</p>
          </div>
        </div>
      `;
    });
  };

  const setupReveal = () => {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
  };

  const setupYear = () => {
    document.querySelectorAll("[data-current-year]").forEach((item) => {
      item.textContent = new Date().getFullYear();
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderReviewGrids();
    renderCategories();
    renderReviewDetail();
    renderFooter();
    setupNavigation();
    setupSearch();
    setupForms();
    setupReveal();
    setupYear();
  });
})();
