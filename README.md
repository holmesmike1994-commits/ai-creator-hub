# AI Creator Hub

Modern static website for AI reviews, comparisons, tutorials, and affiliate-ready disclosure pages.

## Structure

- `index.html` - homepage
- `reviews.html` - review directory
- `categories.html` - category landing page
- `about.html` - company/editorial page
- `contact.html` - frontend-only contact form
- `privacy-policy.html` - privacy policy placeholder
- `affiliate-disclosure.html` - affiliate disclosure placeholder
- `reviews/*.html` - individual review pages
- `assets/css/styles.css` - shared design system and responsive layout
- `assets/js/reviews-data.js` - review and category data
- `assets/js/review-engine.js` - reusable public review template, schema, and SEO renderer
- `assets/js/main.js` - reusable cards, review rendering, navigation, and forms
- `assets/img/hero-dashboard.webp` - optimized generated hero visual
- `assets/img/hero-dashboard.png` - source fallback hero visual

## Add A New Review

Private editorial tools should stay outside this public website folder and out of any GitHub Pages deployment.

1. Draft the review content outside the public site project.
2. Verify facts against official sources:
   official website, docs, pricing page, release notes, public feature lists, and well-established public sentiment.
3. Add the published review object to `assets/js/reviews-data.js`.
4. Create the HTML file in `reviews/`.
5. Open the page locally and check schema, links, and readability.

If creating manually, copy one of the existing files in `reviews/` and update:
   - `<title>`
   - meta description
   - `data-review-slug`
   - `data-active="reviews"`
Then point the new data object's `url` to the new page.

No build step is required. Open `index.html` directly, or serve the folder with any static host.
