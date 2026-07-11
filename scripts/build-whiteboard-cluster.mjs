import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://holmesmike1994-commits.github.io/ai-creator-hub/";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const published = "2026-07-11";
const affiliateUrl = "https://95f81no1m0whse-f-f07hgwzrn.hop.clickbank.net";

const links = {
  instaReview: "../reviews/instadoodle.html",
  doodlyReview: "../reviews/doodly.html",
  videoScribeReview: "../reviews/videoscribe.html",
  animakerReview: "../reviews/animaker.html",
  instaDoodly: "../comparisons/instadoodle-vs-doodly.html",
  instaVideoScribe: "../comparisons/instadoodle-vs-videoscribe.html",
  doodlyVideoScribe: "../comparisons/doodly-vs-videoscribe.html",
  recommendation: "../recommendations/whiteboard-animation.html",
  instaAlternatives: "../alternatives/instadoodle-alternatives.html",
  doodlyAlternatives: "../alternatives/doodly-alternatives.html",
  teachers: "../guides/whiteboard-animation-software-for-teachers.html",
  youtube: "../guides/whiteboard-animation-software-for-youtube.html"
};

const official = {
  instaDoodle: "https://instadoodle.com/",
  doodly: "https://www.doodly.com/doodly-pricing",
  videoScribe: "https://www.videoscribe.co/pricing/",
  videoScribeEducation: "https://www.videoscribe.co/en/education/",
  canva: "https://www.canva.com/features/whiteboard-animation/",
  animaker: "https://www.animaker.com/whiteboard",
  vyond: "https://www.vyond.com/plans/"
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const table = (headers, rows) => `
  <div class="comparison-table-wrap">
    <table class="comparison-table">
      <thead><tr>${headers.map((item) => `<th>${item}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((item) => `<td>${item}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;

const cards = (items) => `
  <div class="engine-card-grid">
    ${items.map((item) => `
      <article class="engine-mini-card">
        ${item.label ? `<span class="tool-chip">${item.label}</span>` : ""}
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        ${item.link ? `<a href="${item.link.href}"${item.link.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${item.link.label}</a>` : ""}
      </article>`).join("")}
  </div>`;

const checkList = (items, className = "check-list") =>
  `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const related = (items) => `
  <div class="related-link-grid">
    ${items.map((item) => `<a href="${item.href}"><strong>${item.title}</strong><span>${item.text}</span></a>`).join("")}
  </div>`;

const section = (eyebrow, title, content, options = {}) => `
  <section class="section section--tight"${options.id ? ` aria-labelledby="${options.id}"` : ""}>
    <div class="container${options.narrow ? " narrow" : ""}${options.panel === false ? "" : " content-panel"} reveal">
      <p class="eyebrow">${eyebrow}</p>
      <h2${options.id ? ` id="${options.id}"` : ""}>${title}</h2>
      ${content}
    </div>
  </section>`;

const faqSection = (faqs) => `
  <section class="section section--tight" aria-labelledby="faq-title">
    <div class="container narrow content-panel reveal">
      <p class="eyebrow">FAQ</p>
      <h2 id="faq-title">Questions readers ask before choosing.</h2>
      <div class="faq-list">
        ${faqs.map((faq) => `<details class="faq-item"><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join("")}
      </div>
    </div>
  </section>`;

const sourceSection = (sources) => section(
  "Source Check",
  "Official sources used for this page.",
  `<div class="source-link-grid">${sources.map((source) => `
    <a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer">
      <strong>${source.title}</strong><span>${source.description}</span>
    </a>`).join("")}</div>
   <p class="fine-print">Pricing and product limits were checked on July 11, 2026. Confirm current checkout terms before purchasing because plans and promotions can change.</p>`
);

const pages = [
  {
    path: "alternatives/instadoodle-alternatives.html",
    active: "reviews",
    title: "Best InstaDoodle Alternatives: 5 Tools Compared | AI Creator Hub",
    description: "Compare the best InstaDoodle alternatives for whiteboard animation, AI doodles, education, YouTube, business video, pricing, and workflow fit.",
    keywords: ["InstaDoodle alternatives", "best InstaDoodle alternative", "whiteboard animation software", "Doodly vs InstaDoodle", "VideoScribe alternative"],
    eyebrow: "Whiteboard Animation Alternatives",
    heading: "The Best InstaDoodle Alternatives",
    subtitle: "Choose by workflow, not by the longest feature list.",
    intro: "InstaDoodle is strongest when you want a browser-based, AI-assisted doodle workflow. The better alternative depends on what you need instead: a free trial, deeper scene control, a broader design suite, character animation, or business collaboration.",
    heroAside: `<p class="eyebrow">Quick Shortlist</p><h2>Five credible paths</h2>${checkList([
      "Doodly for an established desktop doodle workflow.",
      "VideoScribe for transparent plans, a free trial, and structured production.",
      "Canva for occasional whiteboard animation inside a design suite.",
      "Animaker for characters, templates, voices, and broader animation.",
      "Vyond for business teams, governance, and multi-style video."
    ])}`,
    content: [
      section("Decision Table", "InstaDoodle alternatives at a glance.", table(
        ["Tool", "Best for", "Current pricing context", "Main tradeoff"],
        [
          [`<a href="${links.doodlyReview}"><strong>Doodly</strong></a>`, "Desktop whiteboard videos and large bundled libraries", "$49 Standard or $79 Enterprise monthly on the official page", "Less AI-first and requires a desktop installation"],
          [`<a href="${links.videoScribeReview}"><strong>VideoScribe</strong></a>`, "Structured explainers, education, teams, and reseller workflows", "7-day free trial; annual equivalents from $12.50/month", "Download and video-length limits vary by plan"],
          [`<a href="${official.canva}" target="_blank" rel="noopener noreferrer"><strong>Canva SpeedPaint</strong></a>`, "Occasional whiteboard effects inside a larger design workflow", "One free whiteboard-animation credit is advertised", "Less specialized for long, scene-driven doodle videos"],
          [`<a href="${links.animakerReview}"><strong>Animaker</strong></a>`, "Character-heavy animation and multilingual voice workflows", "Free plan plus annual paid plans", "Broader interface and more choices to learn"],
          [`<a href="${official.vyond}" target="_blank" rel="noopener noreferrer"><strong>Vyond</strong></a>`, "Business training, collaboration, brand control, and multiple video styles", "Starter is $99 monthly or $699 annually", "Substantially higher cost for solo creators"]
        ]
      )),
      section("Why Switch", "What an alternative should solve.", cards([
        { title: "You need a real trial", text: "VideoScribe offers a seven-day trial without payment details. InstaDoodle instead advertises a money-back guarantee." },
        { title: "You need deeper production control", text: "VideoScribe and Doodly provide more established scene, asset, audio, and export workflows for repeatable explainers." },
        { title: "You already work in Canva", text: "Canva's SpeedPaint app can be enough when whiteboard animation is one small part of a larger social or presentation workflow." },
        { title: "You create for teams or clients", text: "Vyond and VideoScribe Max publish clearer collaboration or reseller options than a lightweight creator offer." }
      ])),
      section("Recommendations", "Which alternative should you choose?", cards([
        { label: "Closest traditional option", title: "Choose Doodly", text: "Pick Doodly when you want a dedicated whiteboard-video builder with a large bundled asset library and desktop workflow.", link: { href: links.doodlyReview, label: "Read the Doodly review" } },
        { label: "Best trial path", title: "Choose VideoScribe", text: "Pick VideoScribe when you want to test before paying and compare clear limits for downloads, video length, assets, and reseller rights.", link: { href: links.videoScribeReview, label: "Read the VideoScribe review" } },
        { label: "Best existing design stack", title: "Choose Canva", text: "Pick Canva when your work already lives there and you only need an occasional hand-drawn animation effect.", link: { href: official.canva, label: "View Canva whiteboard animation", external: true } },
        { label: "Keep the AI-first workflow", title: "Stay with InstaDoodle", text: "Keep InstaDoodle on the shortlist when prompt-generated doodles, browser access, and quick explainer production are the priority.", link: { href: links.instaReview, label: "Read the InstaDoodle review" } }
      ])),
      section("Selection Checklist", "Verify these details before paying.", checkList([
        "Create one real project during a trial or refund window.",
        "Confirm whether your plan permits client work, resale, and YouTube monetization.",
        "Check download limits, maximum video length, resolution, and watermark rules.",
        "Compare how quickly you can revise a scene after a script change.",
        "Calculate the full cost of add-ons, upgrades, voices, and required asset tiers."
      ])),
      section("Related Content", "Continue the whiteboard-animation decision.", related([
        { href: links.instaReview, title: "InstaDoodle Review", text: "Pricing, official features, evidence, scores, and verdict." },
        { href: links.videoScribeReview, title: "VideoScribe Review", text: "Trial, plan limits, AI tools, exports, licensing, and community themes." },
        { href: links.animakerReview, title: "Animaker Review", text: "Character animation, whiteboard tools, voice, pricing, API, and teams." },
        { href: links.instaDoodly, title: "InstaDoodle vs Doodly", text: "Compare the two existing AI Creator Hub evaluations." },
        { href: links.instaVideoScribe, title: "InstaDoodle vs VideoScribe", text: "Compare AI-first speed with a structured production platform." },
        { href: links.recommendation, title: "Whiteboard Animation Recommendation", text: "See AI Creator Hub's current category recommendation." }
      ]))
    ].join(""),
    faqs: [
      { question: "What is the closest alternative to InstaDoodle?", answer: "Doodly and VideoScribe are the closest dedicated alternatives. Doodly offers an established desktop doodle workflow, while VideoScribe offers a structured web and app workflow with a seven-day free trial." },
      { question: "Is VideoScribe better than InstaDoodle?", answer: "VideoScribe is a better fit for buyers who value trial access, transparent plan limits, a large image library, and structured production. InstaDoodle is a better fit when prompt-generated doodle elements and fast browser-based creation matter more." },
      { question: "Can Canva replace InstaDoodle?", answer: "Canva can replace InstaDoodle for occasional SpeedPaint-style effects inside presentations, social graphics, and mixed-media designs. It is less specialized for longer whiteboard-video production." },
      { question: "Which InstaDoodle alternative is best for teachers?", answer: "VideoScribe is a strong teacher option because it offers a free trial, education discounts, templates, and clear plan limits. InstaDoodle remains attractive for fast AI-assisted lesson explainers." },
      { question: "Which alternative is best for client work?", answer: "VideoScribe Max explicitly includes reseller rights. Vyond offers an Agency plan and rights-transfer workflows. Always verify current licensing terms before delivering paid client work." },
      { question: "Is there a free InstaDoodle alternative?", answer: "Canva advertises one free whiteboard-animation credit, and VideoScribe offers a seven-day free trial with watermarked output. Free access and limits can change, so check the official pages." }
    ],
    sources: [
      { title: "InstaDoodle official site", url: official.instaDoodle, description: "Current feature, pricing, guarantee, and platform claims." },
      { title: "Doodly official pricing", url: official.doodly, description: "Current plan prices, bundled assets, platform requirements, and refund terms." },
      { title: "VideoScribe official pricing", url: official.videoScribe, description: "Current trial, plan prices, limits, AI tools, and reseller rights." },
      { title: "Canva whiteboard animation", url: official.canva, description: "SpeedPaint workflow, customization, sharing, and free-credit information." },
      { title: "Animaker Whiteboard", url: official.animaker, description: "Whiteboard assets, templates, character builder, voices, and subtitles." },
      { title: "Vyond plans", url: official.vyond, description: "Current business plans, AI tools, collaboration, output, and rights features." }
    ]
  },
  {
    path: "alternatives/doodly-alternatives.html",
    active: "reviews",
    title: "Best Doodly Alternatives: 5 Whiteboard Tools Compared | AI Creator Hub",
    description: "Compare Doodly alternatives including InstaDoodle, VideoScribe, Canva, Animaker, and Vyond by pricing, AI features, workflow, and best fit.",
    keywords: ["Doodly alternatives", "best Doodly alternative", "Doodly competitor", "whiteboard animation software", "Doodly vs VideoScribe"],
    eyebrow: "Doodly Alternatives",
    heading: "The Best Doodly Alternatives",
    subtitle: "Move beyond desktop doodle video when your workflow demands it.",
    intro: "Doodly remains useful for template-driven whiteboard videos, but it is not the right fit for every creator. These alternatives solve different gaps: AI-generated assets, a browser-first editor, a free trial, mixed-media design, character animation, or business collaboration.",
    heroAside: `<p class="eyebrow">Current Doodly Score</p><h2>8.2 / 10</h2><div class="comparison-score-grid"><div><span>Community Score</span><strong>8.1 / 10</strong></div><div><span>Confidence</span><strong>Moderate</strong></div></div><a class="button" href="${links.doodlyReview}">Read Doodly Review</a>`,
    content: [
      section("Decision Table", "Doodly competitors at a glance.", table(
        ["Tool", "Choose it when", "Pricing signal", "Watch for"],
        [
          [`<a href="${links.instaReview}"><strong>InstaDoodle</strong></a>`, "You want cloud access and AI-generated doodle elements", "Official page displays multiple offer formats", "Confirm the exact checkout and upgrade terms"],
          [`<a href="${links.videoScribeReview}"><strong>VideoScribe</strong></a>`, "You want a free trial and clearer usage limits", "7-day trial; paid annual equivalents from $12.50/month", "Plan-based download and duration limits"],
          [`<a href="${official.canva}" target="_blank" rel="noopener noreferrer"><strong>Canva</strong></a>`, "You need whiteboard effects inside broader brand content", "One free SpeedPaint credit is advertised", "Not as focused on long-form doodle production"],
          [`<a href="${links.animakerReview}"><strong>Animaker</strong></a>`, "You need character creation, templates, and multilingual audio", "Free plan plus annual paid plans", "More features create a broader learning curve"],
          [`<a href="${official.vyond}" target="_blank" rel="noopener noreferrer"><strong>Vyond</strong></a>`, "You produce business training or multi-style team video", "$99 monthly Starter or $699 annually", "Higher cost and more platform than many solo users need"]
        ]
      )),
      section("Reasons to Change", "Where Doodly may stop fitting.", cards([
        { title: "You want browser-first access", text: "Doodly is a desktop application that still requires an internet connection. InstaDoodle, Canva, and modern VideoScribe workflows are easier to access across devices." },
        { title: "You need stronger AI assistance", text: "InstaDoodle emphasizes prompt-generated doodle assets, while VideoScribe and Vyond publish broader AI image, script, voice, or text-to-video capabilities." },
        { title: "You want to test without checkout", text: "VideoScribe offers a seven-day trial without payment details. That creates a clearer evaluation path before committing." },
        { title: "You need business controls", text: "Vyond and higher VideoScribe plans make collaboration, client rights, brand tools, and team usage more explicit." }
      ])),
      section("Best Matches", "Choose the replacement that fixes your real problem.", cards([
        { label: "AI-first alternative", title: "InstaDoodle", text: "Best when generating specific doodle characters or objects from prompts saves more time than browsing a fixed library.", link: { href: links.instaReview, label: "Read InstaDoodle Review" } },
        { label: "Structured alternative", title: "VideoScribe", text: "Best when you want a trial, clear download limits, a large image library, preview links, and reseller rights on the appropriate plan.", link: { href: links.videoScribeReview, label: "Read VideoScribe Review" } },
        { label: "Design-suite alternative", title: "Canva", text: "Best when whiteboard effects are only one output within a broader presentation, social, or marketing workflow.", link: { href: official.canva, label: "View Canva SpeedPaint", external: true } },
        { label: "Business alternative", title: "Vyond", text: "Best for teams needing multiple animation styles, governance, collaboration, brand controls, or high-volume training production.", link: { href: official.vyond, label: "View Vyond plans", external: true } }
      ])),
      section("Related Content", "Compare before replacing Doodly.", related([
        { href: links.doodlyReview, title: "Doodly Review", text: "Current pricing, strengths, limitations, scores, and alternatives." },
        { href: links.videoScribeReview, title: "VideoScribe Review", text: "Compare the strongest structured alternative in detail." },
        { href: links.doodlyVideoScribe, title: "Doodly vs VideoScribe", text: "Compare pricing, trials, features, output, rights, and value." },
        { href: links.instaDoodly, title: "InstaDoodle vs Doodly", text: "Direct comparison using both existing evaluations." },
        { href: links.instaAlternatives, title: "InstaDoodle Alternatives", text: "See how the same five workflows compare from the AI-first side." },
        { href: links.recommendation, title: "Whiteboard Animation Recommendation", text: "Our current category recommendation and decision logic." }
      ]))
    ].join(""),
    faqs: [
      { question: "What is the best alternative to Doodly?", answer: "The best alternative depends on the job. InstaDoodle is the strongest AI-first doodle option, VideoScribe is strong for structured production and trial access, and Vyond is better for business teams." },
      { question: "Is InstaDoodle better than Doodly?", answer: "InstaDoodle is better for browser access and AI-generated doodle elements. Doodly is better for buyers who prefer an established desktop workflow with large bundled asset libraries." },
      { question: "Is VideoScribe cheaper than Doodly?", answer: "Based on official annual pricing checked July 11, 2026, VideoScribe Lite starts at an equivalent $12.50 per month, while Doodly Standard is listed at $49 per month or $490 per year. Features and limits differ substantially." },
      { question: "Can Canva replace Doodly?", answer: "Canva can replace Doodly for occasional whiteboard effects used inside social posts, presentations, or mixed-media designs. Dedicated tools remain better for longer scene-based doodle videos." },
      { question: "Which Doodly alternative is best for agencies?", answer: "VideoScribe Max includes reseller rights, and Vyond offers an Agency plan. Confirm current rights, transfer fees, and client-delivery terms before buying." },
      { question: "Does Doodly require a download?", answer: "Yes. Doodly's official pricing FAQ describes it as a desktop application for Windows and Mac that requires an internet connection for assets and cloud projects." }
    ],
    sources: [
      { title: "Doodly official pricing", url: official.doodly, description: "Plan prices, assets, desktop requirements, exports, ownership, and refund policy." },
      { title: "InstaDoodle official site", url: official.instaDoodle, description: "Cloud workflow, AI generation, features, offer presentation, and guarantee." },
      { title: "VideoScribe official pricing", url: official.videoScribe, description: "Trial, paid tiers, limits, AI tools, and commercial or reseller rights." },
      { title: "Canva whiteboard animation", url: official.canva, description: "SpeedPaint workflow and whiteboard-animation capabilities." },
      { title: "Animaker Whiteboard", url: official.animaker, description: "Whiteboard assets, character builder, templates, voices, and subtitles." },
      { title: "Vyond plans", url: official.vyond, description: "Current pricing, AI tools, collaboration, brand, output, and agency options." }
    ]
  },
  {
    path: "comparisons/instadoodle-vs-videoscribe.html",
    active: "comparisons",
    title: "InstaDoodle vs VideoScribe: Which Should You Choose? | AI Creator Hub",
    description: "Compare InstaDoodle vs VideoScribe for whiteboard animation, AI generation, pricing, free trials, assets, voiceovers, exports, education, and YouTube.",
    keywords: ["InstaDoodle vs VideoScribe", "VideoScribe vs InstaDoodle", "whiteboard animation comparison", "InstaDoodle alternative", "VideoScribe alternative"],
    eyebrow: "Whiteboard Animation Comparison",
    heading: "InstaDoodle vs VideoScribe",
    subtitle: "AI-first speed or structured production control?",
    intro: "Choose InstaDoodle for quick browser-based creation and prompt-generated doodle elements. Choose VideoScribe when a free trial, transparent plan limits, a larger documented asset library, and more structured production controls matter more.",
    heroAside: `<p class="eyebrow">Quick Verdict</p><h2>Different strengths</h2><div class="comparison-score-grid"><div><span>InstaDoodle Score</span><strong>8.7 / 10</strong></div><div><span>VideoScribe Score</span><strong>8.4 / 10</strong></div><div><span>Comparison confidence</span><strong>Moderate</strong></div></div><p>Both products now have complete, source-checked AI Creator Hub evaluations.</p>`,
    content: [
      section("Comparison Table", "The important differences.", table(
        ["Decision factor", "InstaDoodle", "VideoScribe"],
        [
          ["Primary workflow", "Prompt-led doodle generation and fast scene assembly", "Structured scene, asset, timeline, camera, and audio production"],
          ["Platform", "Cloud-based browser app", "Modern browser and installed app options; Legacy is limited to eligible plans"],
          ["AI tools", "Doodle element generation plus plan-dependent voice tools", "Image, script, and voice generation with published plan limits"],
          ["Published library", "1,000+ standard doodle elements; larger libraries on upgrades", "9,000+ assets on trial or Lite and 5 million on Core or Max"],
          ["Trial", "No free trial advertised; 60-day money-back guarantee stated", "Seven-day free trial, no card required, with watermarked exports"],
          ["Pricing", "Official page shows $47, $67, and $127 monthly cards plus a separate $37 promotional checkout", "Annual equivalents of $12.50 Lite, $18.75 Core, and $23.33 Max per month"],
          ["Downloads", "Official page advertises unlimited video creation; verify plan and checkout terms", "5 per month Lite, 30 Core, unlimited Max"],
          ["Best fit", "Fast AI-assisted explainers and specific generated doodle assets", "Education, repeatable explainers, teams, and documented reseller workflows"]
        ]
      )),
      section("Ease of Use", "InstaDoodle starts faster; VideoScribe explains more.", `<p>InstaDoodle's pitch is immediate: type a prompt, generate a doodle element, assemble scenes, add a voiceover, and render in the cloud. That is attractive when asset search is the slowest part of your process.</p><p>VideoScribe gives buyers more published detail about limits and production tools. Its infinite canvas, camera controls, scene workflow, audio tools, templates, and preview links support a more deliberate production process. That can take longer to learn, but it may also be easier to standardize across repeated projects.</p>`),
      section("Pricing", "The cheaper-looking option depends on the checkout.", `<p>VideoScribe has the clearer comparison path. Its official pricing page lists a free trial and three paid tiers with explicit annual prices, download limits, maximum video lengths, asset access, AI allowances, and reseller rights.</p><p>InstaDoodle's official page currently displays both monthly plan cards and a separate promotional checkout showing a $37 total. That does not automatically make the offer bad, but it does mean buyers should verify whether the final charge is one-time or recurring and whether Pro or Agency upgrades are necessary.</p>`),
      section("Who Should Choose What", "Match the tool to the publishing job.", `<div class="two-column"><article class="content-panel"><h3>Choose InstaDoodle if...</h3>${checkList([
        "You want AI-generated doodle characters or objects from specific prompts.",
        "You prefer a cloud workflow with no desktop installation.",
        "You make quick explainers for teaching, coaching, social, or simple funnels.",
        "You are willing to confirm offer and upgrade terms at checkout."
      ])}</article><article class="content-panel"><h3>Choose VideoScribe if...</h3>${checkList([
        "You want a seven-day trial before paying.",
        "You need clear download, duration, library, or reseller limits.",
        "You build longer or repeatedly revised education and training videos.",
        "You value a mature canvas, camera, audio, and sharing workflow."
      ])}</article></div>`, { panel: false }),
      section("Recommendation", "AI Creator Hub's current view.", `<p>InstaDoodle remains our quick-start recommendation for creators whose central problem is generating the right doodle asset quickly. VideoScribe is the stronger risk-controlled purchase path because its free trial, clearer plan limits, and structured production workflow make evaluation and repeated publishing easier.</p><p>Neither product is objectively better for every buyer. InstaDoodle leads on AI-first speed; VideoScribe leads on trial access, documentation, and production clarity.</p><div class="engine-hero-actions"><a class="button" href="${links.instaReview}">Read InstaDoodle Review</a><a class="button button--ghost" href="${links.videoScribeReview}">Read VideoScribe Review</a></div>`),
      section("Related Content", "Keep comparing with context.", related([
        { href: links.videoScribeReview, title: "VideoScribe Review", text: "See the complete source-checked evaluation, scores, pricing, limits, and verdict." },
        { href: links.doodlyVideoScribe, title: "Doodly vs VideoScribe", text: "Compare the two established whiteboard-production workflows." },
        { href: links.instaAlternatives, title: "InstaDoodle Alternatives", text: "See five alternatives organized by workflow." },
        { href: links.teachers, title: "Whiteboard Software for Teachers", text: "Choose for lesson production and classroom constraints." },
        { href: links.youtube, title: "Whiteboard Software for YouTube", text: "Choose for channel production, voice, output, and licensing." }
      ]))
    ].join(""),
    faqs: [
      { question: "Is VideoScribe better than InstaDoodle?", answer: "VideoScribe is better for buyers who value trial access, transparent usage limits, large documented libraries, and structured production. InstaDoodle is better when prompt-generated doodles and quick browser-based creation are the priority." },
      { question: "Which is cheaper, InstaDoodle or VideoScribe?", answer: "VideoScribe Lite is listed at $150 billed annually, equivalent to $12.50 per month. InstaDoodle's official page displays multiple price formats, including monthly plan cards and a separate $37 promotional checkout, so final terms must be confirmed." },
      { question: "Which tool is better for teachers?", answer: "VideoScribe offers a free trial, education discounts, templates, and explicit plan limits. InstaDoodle can be faster for generating custom doodle elements and short lesson explainers." },
      { question: "Which tool is better for YouTube?", answer: "InstaDoodle suits quick AI-assisted doodle explainers. VideoScribe suits repeatable channel production when clear download limits, video length, voice tools, asset access, and commercial rights are important." },
      { question: "Does InstaDoodle have a free trial?", answer: "The official InstaDoodle page says there is no free version or trial and instead advertises a 60-day money-back guarantee." },
      { question: "Does VideoScribe include reseller rights?", answer: "VideoScribe's official pricing page states that reseller rights are included with the Max plan. Other plans include commercial rights but not reseller rights." }
    ],
    sources: [
      { title: "InstaDoodle official site", url: official.instaDoodle, description: "Features, platform, pricing presentation, guarantee, and FAQs." },
      { title: "VideoScribe official pricing", url: official.videoScribe, description: "Trial, plan prices, assets, downloads, AI limits, and reseller rights." },
      { title: "VideoScribe plan limits", url: "https://help.videoscribe.co/knowledge/subscription-plan-limitations", description: "Official comparison of downloads, duration, assets, audio, AI, fonts, and rights." },
      { title: "VideoScribe publishing guide", url: "https://help.videoscribe.co/knowledge/publish-and-share-projects", description: "Official export, preview-link, download, duration, MP4, and GIF details." }
    ]
  },
  {
    path: "comparisons/doodly-vs-videoscribe.html",
    active: "comparisons",
    title: "Doodly vs VideoScribe (2026): Which Is Better? | AI Creator Hub",
    description: "Compare Doodly vs VideoScribe on pricing, free trials, whiteboard features, assets, exports, licensing, ease of use, community sentiment, and value.",
    keywords: ["Doodly vs VideoScribe", "VideoScribe vs Doodly", "Doodly alternative", "VideoScribe alternative", "best whiteboard animation software"],
    eyebrow: "Whiteboard Animation Comparison",
    heading: "Doodly vs VideoScribe",
    subtitle: "Which established whiteboard-animation workflow should you choose?",
    intro: "Doodly and VideoScribe both turn scripts and ideas into hand-drawn explainer videos, but their buying paths are different. Doodly emphasizes a desktop-supported workflow and large bundled libraries. VideoScribe combines a modern browser workflow, transparent plan limits, a no-card trial, and plan-based AI assistance.",
    heroAside: `<p class="eyebrow">Current Recommendation</p><h2>VideoScribe for most new buyers</h2><div class="comparison-score-grid"><div><span>VideoScribe Score</span><strong>8.4 / 10</strong></div><div><span>Doodly Score</span><strong>8.2 / 10</strong></div><div><span>Comparison confidence</span><strong>Moderate</strong></div></div><p>Doodly remains credible, but VideoScribe provides the easier trial and more transparent decision path.</p>`,
    content: [
      section("Quick Verdict", "The better choice depends on how you want to buy and produce.", `<p><strong>Choose VideoScribe</strong> when you want to test the complete workflow without entering payment details, compare explicit download and duration limits, use a browser-based production path, or add documented AI image, script, and voice tools.</p><p><strong>Choose Doodly</strong> when you prefer its established desktop-supported workflow, want the asset bundle described by its current plans, or already work inside the wider Voomly Cloud product family.</p>`),
      section("Comparison Table", "Doodly and VideoScribe at a glance.", table(
        ["Decision factor", "Doodly", "VideoScribe"],
        [
          ["AI Creator Hub Score", "8.2 / 10", "8.4 / 10"],
          ["Community Score", "8.1 / 10", "8.2 / 10"],
          ["Confidence", "Moderate", "Moderate"],
          ["Primary workflow", "Desktop-supported doodle-video production with bundled assets", "Browser-first structured whiteboard production with Legacy access on eligible plans"],
          ["Trial", "Official pricing page includes try-for-free calls to action; confirm exact terms", "Seven days, no payment details, three watermarked downloads"],
          ["Published pricing", "$49 monthly or $490 yearly for Standard; $79 monthly or $790 yearly for Enterprise", "Annual equivalents of $12.50 Lite, $18.75 Core, and $23.33 Max per month"],
          ["Asset library", "Plan page lists characters, props, music, templates, fonts, and scenes", "9,000+ assets on Trial or Lite; five million on Core or Max"],
          ["AI assistance", "Not the central documented workflow", "Images and scripts on every current tier; voice allowances on Core and Max"],
          ["Exports", "Official page advertises unlimited creation and 1080p export; verify current plan terms", "1080p MP4 on every tier plus plan-based download and duration limits"],
          ["Client resale", "Confirm current Doodly and Voomly terms before client delivery", "Max explicitly includes reseller rights"],
          ["Best for", "Creators who want a familiar traditional doodle builder", "New buyers, educators, repeat production, and clearly licensed client workflows"]
        ]
      )),
      section("Pricing", "VideoScribe is less expensive on the published annual entry price.", `<p>Doodly's official page currently lists Standard at $49 per month or $490 per year, and Enterprise at $79 per month or $790 per year. The page describes substantial bundled image, music, scene, template, font, storage, and Voomly Cloud allowances. Buyers should verify the exact trial and renewal terms shown at checkout.</p><p>VideoScribe's annual view lists Lite at $150 per licence per year, Core at $225, and Max at $280. The lower entry price comes with explicit tradeoffs: Lite has five downloads per month and five-minute videos, Core has 30 downloads and ten-minute videos, and Max has unlimited downloads and twenty-minute videos.</p><p>Sticker price is not the full decision. Compare the plan that supports your real monthly export volume, video length, asset needs, custom fonts, collaboration, and client licensing.</p>`),
      section("Ease of Use", "Both target non-animators, but VideoScribe offers the cleaner evaluation path.", `<p>Doodly's focused interface and bundled libraries are intended to make drag-and-drop doodle videos approachable. Its desktop-supported model will feel familiar to creators who prefer installed software, though the official FAQ says an internet connection remains necessary for assets and cloud projects.</p><p>VideoScribe combines structured scenes, camera movement, drawing hands, templates, audio, and multiple canvas sizes. Its seven-day trial uses the same product workflow as the paid plans, giving buyers a practical way to judge setup and editing before paying.</p>`),
      section("Features and Control", "Doodly leads with bundled media; VideoScribe publishes deeper current controls.", cards([
        { title: "Doodly library workflow", text: "The current Standard and Enterprise cards list different allowances for characters, props, music, templates, fonts, scenes, support, and cloud storage." },
        { title: "VideoScribe production workflow", text: "Scene limits, camera pans and zooms, drawing styles, custom backdrops, landscape or vertical canvases, audio tracks, and preview links are documented in detail." },
        { title: "AI assistance", text: "VideoScribe publishes monthly limits for image and script generation on every tier and voiceover generation on Core and Max. Doodly is better understood as a traditional asset-driven builder." },
        { title: "Review and handoff", text: "VideoScribe Core and Max can create preview links. Doodly's broader Voomly Cloud bundle may appeal to teams using adjacent hosting or funnel tools." }
      ])),
      section("Output and Rights", "Licensing can matter more than the editor.", `<p>VideoScribe documents commercial rights on paid plans and reserves reseller rights for Max. That distinction matters for freelancers and agencies charging clients for delivered videos. Its support documentation also states the exact MP4, GIF, download, and duration rules by plan.</p><p>Doodly's official page advertises 1080p output and unlimited video creation. Buyers doing paid client work should still confirm the current Doodly and Voomly Cloud licence before delivery rather than assuming personal commercial use automatically covers resale or transfer.</p>`),
      section("Community Comparison", "Both products are liked for accessibility, with similar production concerns.", `<div class="consensus-grid"><article class="engine-mini-card"><p class="eyebrow">Doodly</p><h3>Established and focused</h3><p>Recurring public sentiment favors the recognizable doodle style, asset-driven workflow, and accessibility for non-animators. Friction tends to involve pricing fit, the niche visual style, and whether a desktop-supported workflow still suits the buyer.</p></article><article class="engine-mini-card"><p class="eyebrow">VideoScribe</p><h3>Approachable and structured</h3><p>Public reviewers commonly praise ease of use and educational explainers. Recurring complaints mention slow rendering, longer-session instability, or performance friction on complex projects.</p></article></div><p class="fine-print">These are original summaries of recurring public themes, not reproduced reviews. Community sentiment can change as products evolve.</p>`),
      section("Who Should Choose What", "Match the platform to the work.", `<div class="two-column"><article class="content-panel"><h3>Choose Doodly if...</h3>${checkList([
        "You prefer its traditional desktop-supported doodle workflow.",
        "Its current bundled characters, props, templates, music, and Voomly Cloud tools fit your production stack.",
        "You already know the editor and switching costs outweigh VideoScribe's advantages.",
        "You have confirmed the current trial, export, renewal, and client-use terms."
      ])}</article><article class="content-panel"><h3>Choose VideoScribe if...</h3>${checkList([
        "You want a seven-day trial without entering payment details.",
        "You value clearly published download, duration, AI, font, and licensing limits.",
        "You need a browser-first workflow with preview links on higher plans.",
        "You produce client work and can use Max's documented reseller rights."
      ])}</article></div>`, { panel: false }),
      section("Recommendation", "Why AI Creator Hub currently prefers VideoScribe.", `<p>VideoScribe is our current recommendation for most new buyers because it is easier to evaluate before paying, its plan tradeoffs are clearer, and the present product combines a focused whiteboard workflow with useful AI assistance and documented publishing controls.</p><p>Doodly remains a sensible choice for creators who prefer its library, interface, or Voomly Cloud ecosystem. The score difference is small, so existing Doodly users should not switch merely because VideoScribe leads by 0.2 points. Switch only when the trial, browser workflow, AI allowances, or licensing clarity solves a real production problem.</p><div class="engine-hero-actions"><a class="button" href="${links.videoScribeReview}">Read VideoScribe Review</a><a class="button button--ghost" href="${links.doodlyReview}">Read Doodly Review</a></div>`),
      section("Related Content", "Continue the whiteboard-animation decision.", related([
        { href: links.videoScribeReview, title: "VideoScribe Review", text: "Pricing, trial, plan limits, AI tools, community themes, and verdict." },
        { href: links.doodlyReview, title: "Doodly Review", text: "Current pricing, workflow, strengths, drawbacks, and alternatives." },
        { href: links.instaDoodly, title: "InstaDoodle vs Doodly", text: "Compare AI-first speed with the established Doodly workflow." },
        { href: links.instaVideoScribe, title: "InstaDoodle vs VideoScribe", text: "Compare AI-generated doodles with structured production." },
        { href: links.recommendation, title: "Whiteboard Animation Recommendation", text: "See the current category recommendation and supporting rationale." }
      ]))
    ].join(""),
    faqs: [
      { question: "Is VideoScribe better than Doodly?", answer: "AI Creator Hub currently recommends VideoScribe for most new buyers because it offers a no-card trial, clearer plan limits, browser-based production, and documented AI tools. Doodly remains competitive for its established asset-driven workflow." },
      { question: "Is VideoScribe cheaper than Doodly?", answer: "On the official annual prices checked July 11, 2026, VideoScribe Lite starts at $150 per year while Doodly Standard is listed at $490 per year. Features, libraries, limits, and bundled products differ." },
      { question: "Which is easier to use, Doodly or VideoScribe?", answer: "Both target non-animators. VideoScribe is easier to evaluate because its seven-day trial requires no payment details. The editor that feels easier will depend on whether you prefer a browser-first scene workflow or Doodly's desktop-supported asset workflow." },
      { question: "Which tool is better for teachers?", answer: "VideoScribe is usually the stronger first test for teachers because it offers a no-card trial, education discounts, multiple canvas sizes, preview links on higher plans, and clearly documented limits." },
      { question: "Which tool is better for YouTube?", answer: "VideoScribe offers transparent commercial-use, download, duration, and canvas information. Doodly can also suit doodle-based channels, but creators should confirm current export and licensing terms for their plan." },
      { question: "Does VideoScribe include AI features?", answer: "Yes. Current plans include different monthly allowances for AI image and script generation, while Core and Max also include AI voiceover minutes." },
      { question: "Can Doodly and VideoScribe create client videos?", answer: "VideoScribe requires Max when charging for or reselling videos made for third parties. Doodly users should confirm the current licence and transfer terms before delivering paid client work." },
      { question: "What is the best alternative to both Doodly and VideoScribe?", answer: "InstaDoodle is a stronger AI-first option for prompt-generated doodle elements. Animaker is broader for character animation, multilingual voice, templates, and team workflows." }
    ],
    sources: [
      { title: "Doodly official pricing", url: official.doodly, description: "Current plans, prices, bundled assets, platform notes, exports, and FAQs." },
      { title: "VideoScribe official pricing", url: official.videoScribe, description: "Current trial, annual prices, plan limits, AI tools, and licensing guidance." },
      { title: "VideoScribe plan limits", url: "https://help.videoscribe.co/knowledge/subscription-plan-limitations", description: "Downloads, duration, assets, watermarks, fonts, AI allowances, and reseller rights." },
      { title: "VideoScribe publishing guide", url: "https://help.videoscribe.co/knowledge/publish-and-share-projects", description: "Preview links, MP4 and GIF exports, resolution, duration, and download rules." },
      { title: "VideoScribe commercial rights", url: "https://help.videoscribe.co/knowledge/make-money-from-scribe-videos", description: "Official commercial-use and reseller-rights distinction." }
    ],
    includeAffiliate: false
  },
  {
    path: "guides/whiteboard-animation-software-for-teachers.html",
    active: "categories",
    title: "Best Whiteboard Animation Software for Teachers | AI Creator Hub",
    description: "Choose whiteboard animation software for teaching by trial access, lesson workflow, templates, voiceovers, revisions, output limits, and education pricing.",
    keywords: ["whiteboard animation software for teachers", "whiteboard video maker for education", "animated lesson software", "VideoScribe for teachers", "InstaDoodle for teachers"],
    eyebrow: "Education Workflow Guide",
    heading: "Whiteboard Animation Software for Teachers",
    subtitle: "Choose the tool that makes lessons easier to build and revise.",
    intro: "The right classroom animation tool is not the one with the most effects. It is the one that helps you explain a concept clearly, revise it next term, export it in the format your students can access, and stay inside your budget and licensing requirements.",
    heroAside: `<p class="eyebrow">Current Shortlist</p><h2>Start with the teaching job</h2>${checkList([
      "InstaDoodle for quick AI-assisted lesson explainers.",
      "VideoScribe for trial access and structured repeatable lessons.",
      "Canva for mixed classroom materials and occasional animation.",
      "Animaker for characters, voices, and multilingual lessons."
    ])}`,
    content: [
      section("Teacher Decision Table", "Choose by classroom workflow.", table(
        ["Teaching need", "Best starting point", "Why"],
        [
          ["Create a quick custom doodle visual", `<a href="${links.instaReview}">InstaDoodle</a>`, "Prompt-generated elements can reduce time spent searching a fixed library"],
          ["Test a full workflow before purchasing", `<a href="${links.videoScribeReview}">VideoScribe</a>`, "Seven-day trial without payment details and three watermarked downloads"],
          ["Build slides, worksheets, social posts, and animation together", `<a href="${official.canva}" target="_blank" rel="noopener noreferrer">Canva</a>`, "SpeedPaint sits inside a broader design and collaboration platform"],
          ["Create character-led or multilingual lessons", `<a href="${links.animakerReview}">Animaker</a>`, "Published whiteboard features include character building, 100+ templates, voices, and subtitles"],
          ["Standardize training across a department", `<a href="${official.vyond}" target="_blank" rel="noopener noreferrer">Vyond</a>`, "Stronger team, brand, security, and multi-style business controls"]
        ]
      )),
      section("Evaluation Criteria", "What matters more than animation novelty.", cards([
        { title: "Revision speed", text: "A lesson that takes hours to update will become stale. Test how quickly you can replace one scene, sentence, example, or voice track." },
        { title: "Student access", text: "Confirm MP4 output, resolution, captions or subtitles, file size, watermark rules, and compatibility with your LMS or classroom platform." },
        { title: "Voice and language", text: "Decide whether you will record your own narration, upload audio, or generate voiceovers. Check language and plan limits before building around AI voice." },
        { title: "Rights and privacy", text: "Review institutional policy before uploading student information, internal material, copyrighted assets, or identifiable classroom content." }
      ])),
      section("Practical Workflow", "A repeatable animated lesson in six steps.", checkList([
        "Write one learning objective and remove anything that does not support it.",
        "Break the explanation into scenes of one idea each.",
        "Use drawings to clarify relationships, not merely decorate narration.",
        "Record or generate narration only after the visual sequence is stable.",
        "Add captions and check the lesson without sound.",
        "Export a short pilot, test it with learners, and revise before producing a full series."
      ])),
      section("Pricing Context", "Trial access may matter more than the sticker price.", `<p>VideoScribe's official education page advertises educator and student discounts, while its standard pricing page offers a seven-day trial without payment details. That creates a low-risk route for testing a real lesson.</p><p>InstaDoodle does not advertise a free trial. Its official page states a 60-day guarantee, but it also displays multiple pricing formats. Teachers should confirm the final billing terms and whether standard, Pro, or Agency features are actually needed.</p><p>Canva may be cost-effective when a school already uses it for presentations and classroom materials. Its whiteboard-animation page advertises one free SpeedPaint credit, which is useful for testing the effect before buying more access.</p>`),
      section("Recommendation", "Our current teacher guidance.", `<p>Start with VideoScribe when you want to evaluate a complete lesson workflow without entering payment details. Start with InstaDoodle when generating custom doodle elements quickly is the main time-saving opportunity. Use Canva when whiteboard animation is an occasional effect inside a larger classroom design stack.</p><p>There is no universal winner. The right choice depends on lesson length, revision frequency, student access, voice needs, institutional policy, and whether the teacher or school already pays for adjacent tools.</p>`),
      section("Related Content", "Continue the evaluation.", related([
        { href: links.instaReview, title: "InstaDoodle Review", text: "Source-checked features, pricing context, product evidence, and score." },
        { href: links.videoScribeReview, title: "VideoScribe Review", text: "Trial, plans, education fit, output limits, and community themes." },
        { href: links.animakerReview, title: "Animaker Review", text: "Character-led and multilingual education workflows." },
        { href: links.instaVideoScribe, title: "InstaDoodle vs VideoScribe", text: "Compare the two strongest quick-start paths for educators." },
        { href: links.instaAlternatives, title: "InstaDoodle Alternatives", text: "Five alternatives grouped by workflow." },
        { href: links.recommendation, title: "Whiteboard Animation Recommendation", text: "See our current category-level recommendation." }
      ]))
    ].join(""),
    faqs: [
      { question: "What is the best whiteboard animation software for teachers?", answer: "VideoScribe is a strong first test because it offers a seven-day free trial and education discounts. InstaDoodle is a strong quick-start option when AI-generated doodle elements can save preparation time." },
      { question: "Can teachers try VideoScribe for free?", answer: "Yes. VideoScribe's official documentation states that the seven-day trial requires no payment details and includes up to three watermarked video downloads." },
      { question: "Does InstaDoodle offer a teacher discount?", answer: "The official InstaDoodle pages checked July 11, 2026 did not clearly publish a dedicated teacher discount. Confirm current promotions directly before buying." },
      { question: "Can Canva make whiteboard animations?", answer: "Yes. Canva's official whiteboard-animation page describes the SpeedPaint app, which converts an uploaded image or page into a hand-drawn animation that can be edited inside Canva." },
      { question: "What should teachers verify before uploading classroom content?", answer: "Teachers should check school privacy policy, student-data rules, copyright permissions, platform terms, storage, sharing settings, captions, and accessibility requirements." },
      { question: "Which tool is best for multilingual lessons?", answer: "Animaker publishes broad AI voice and subtitle language support, while VideoScribe includes plan-dependent AI voice generation. Verify language quality and plan limits with a real lesson script." }
    ],
    sources: [
      { title: "VideoScribe for education", url: official.videoScribeEducation, description: "Official education use cases, trial access, and educator or student discount path." },
      { title: "VideoScribe official pricing", url: official.videoScribe, description: "Current trial, plans, output limits, asset access, and AI allowances." },
      { title: "InstaDoodle official site", url: official.instaDoodle, description: "Cloud workflow, features, education use cases, pricing presentation, and guarantee." },
      { title: "Canva whiteboard animation", url: official.canva, description: "SpeedPaint workflow, classroom use cases, editing, sharing, and free-credit detail." },
      { title: "Animaker Whiteboard", url: official.animaker, description: "Characters, assets, templates, voice, subtitle, and training use cases." }
    ]
  },
  {
    path: "guides/whiteboard-animation-software-for-youtube.html",
    active: "categories",
    title: "Best Whiteboard Animation Software for YouTube | AI Creator Hub",
    description: "Choose whiteboard animation software for YouTube by workflow, aspect ratio, voiceover, export limits, monetization rights, thumbnails, and publishing speed.",
    keywords: ["whiteboard animation software for YouTube", "YouTube whiteboard video maker", "doodle video software for YouTube", "InstaDoodle YouTube", "VideoScribe YouTube"],
    eyebrow: "YouTube Production Guide",
    heading: "Whiteboard Animation Software for YouTube",
    subtitle: "Build a repeatable channel workflow, not a one-off animation.",
    intro: "YouTube creators need more than a drawing effect. The right tool must support repeatable scripts, narration, revisions, landscape and vertical output, thumbnails, commercial rights, and a production pace that can survive a publishing schedule.",
    heroAside: `<p class="eyebrow">Current Shortlist</p><h2>Match the channel format</h2>${checkList([
      "InstaDoodle for quick AI-assisted doodle explainers.",
      "VideoScribe for repeatable long-form production and clear limits.",
      "Canva for thumbnails, Shorts assets, and mixed channel graphics.",
      "Animaker or Vyond for character-led and multi-style channels."
    ])}`,
    content: [
      section("Creator Decision Table", "Choose by YouTube production need.", table(
        ["Channel workflow", "Best starting point", "Reason"],
        [
          ["Fast prompt-led doodle explainers", `<a href="${links.instaReview}">InstaDoodle</a>`, "AI-generated doodle elements and cloud rendering reduce setup"],
          ["Repeatable long-form or training videos", `<a href="${links.videoScribeReview}">VideoScribe</a>`, "Published limits cover duration, downloads, assets, voice, and preview links"],
          ["Thumbnails, Shorts, and mixed channel design", `<a href="${official.canva}" target="_blank" rel="noopener noreferrer">Canva</a>`, "Whiteboard effects live inside a broader video and design workflow"],
          ["Character-led educational or entertainment video", `<a href="${links.animakerReview}">Animaker</a>`, "Character builder, templates, broad voices, subtitles, and animation assets"],
          ["Business channels and team production", `<a href="${official.vyond}" target="_blank" rel="noopener noreferrer">Vyond</a>`, "Brand tools, collaboration, multiple styles, longer output, and high-volume plans"]
        ]
      )),
      section("YouTube Criteria", "The checks that protect a channel workflow.", cards([
        { title: "Commercial and reseller rights", text: "Confirm that monetized channel use is permitted. Client production can require different rights from publishing on your own channel." },
        { title: "Aspect ratios and derivatives", text: "A strong workflow should produce 16:9 episodes and make it practical to create 9:16 clips, square posts, and thumbnail assets." },
        { title: "Voice workflow", text: "Test your real script with recorded, uploaded, or generated narration. Voice limits, pronunciation, timing, and language support vary by plan." },
        { title: "Revision cost", text: "YouTube facts, sponsors, calls to action, and branding change. Measure how quickly you can update one scene without rebuilding the video." }
      ])),
      section("Production Workflow", "From outline to upload without wasted motion.", checkList([
        "Write a clear promise for the video before choosing visuals.",
        "Build a scene list with one visual idea per narration beat.",
        "Create the 16:9 master and keep text inside mobile-safe areas.",
        "Lock visuals before generating or recording the final voiceover.",
        "Export a short test to check hand timing, pacing, and readability.",
        "Create thumbnail and vertical cut-down assets from the same visual system.",
        "Archive source files, licenses, and plan details for future revisions."
      ])),
      section("Licensing and Pricing", "A cheap plan is expensive if it blocks publishing.", `<p>VideoScribe states that all paid plans include commercial rights, while Max is required for reseller rights. It also publishes download and maximum-duration limits: Lite supports five downloads and five-minute videos, Core supports 30 downloads and ten-minute videos, and Max supports unlimited downloads and twenty-minute videos.</p><p>InstaDoodle's official page advertises unlimited video creation and multiple aspect ratios, but buyers should verify current licensing and checkout terms because the page presents multiple offer formats and plan upgrades.</p><p>Vyond's official help states that Starter and Professional can be used for ad-supported publishing and video sales, subject to its rights terms. Agency production and client transfers have separate rules. Always read the current license rather than assuming a marketing plan covers client work.</p>`),
      section("Recommendation", "Our current YouTube guidance.", `<p>Choose InstaDoodle when the channel depends on publishing quick doodle explainers and custom AI-generated elements save the most time. Choose VideoScribe when you want a trial first and need explicit limits for long-form production, downloads, assets, preview links, and reseller rights.</p><p>Use Canva alongside either tool for thumbnails and channel graphics. Consider Animaker or Vyond when the channel needs characters, multiple animation styles, team collaboration, or more sophisticated business production.</p><div class="engine-hero-actions"><a class="button" href="${links.instaReview}">Read InstaDoodle Review</a><a class="button button--ghost" href="${links.instaVideoScribe}">Compare With VideoScribe</a></div>`),
      section("Related Content", "Build the rest of the shortlist.", related([
        { href: links.instaVideoScribe, title: "InstaDoodle vs VideoScribe", text: "Compare speed, production control, pricing, trial, and rights." },
        { href: links.videoScribeReview, title: "VideoScribe Review", text: "See the source-checked plan, AI, output, rights, and community details." },
        { href: links.animakerReview, title: "Animaker Review", text: "Evaluate character animation, multilingual voice, templates, and teams." },
        { href: links.instaAlternatives, title: "InstaDoodle Alternatives", text: "Five alternatives organized by creator workflow." },
        { href: links.doodlyAlternatives, title: "Doodly Alternatives", text: "Compare modern replacements for a traditional desktop workflow." },
        { href: links.recommendation, title: "Whiteboard Animation Recommendation", text: "See our current category recommendation and history." }
      ]))
    ].join(""),
    faqs: [
      { question: "What is the best whiteboard animation software for YouTube?", answer: "InstaDoodle is a strong choice for fast AI-assisted doodle explainers. VideoScribe is a strong choice for repeatable long-form production with transparent plan and download limits." },
      { question: "Can InstaDoodle videos be used on YouTube?", answer: "The official InstaDoodle site lists YouTube videos among its use cases. Creators should still confirm current commercial-use and asset-license terms for their exact plan before monetizing content." },
      { question: "Can VideoScribe videos be monetized?", answer: "VideoScribe's official pricing page states that paid plans include commercial rights. Reselling videos created for third parties requires the Max plan's reseller rights." },
      { question: "Which tool is better for YouTube Shorts?", answer: "InstaDoodle publishes multiple aspect-ratio support, while Canva is especially useful for vertical derivatives and channel graphics. Test the complete 9:16 export workflow before committing." },
      { question: "Do I need AI voice generation?", answer: "No. A recorded human voice can be more distinctive and trustworthy. AI voice is useful when speed, language coverage, or frequent revisions matter, but pronunciation and plan limits should be tested." },
      { question: "How long should a whiteboard YouTube video be?", answer: "Length should follow the topic and audience, not the software limit. Choose a plan that supports your expected episodes, then optimize pacing and clarity using real audience-retention data." }
    ],
    sources: [
      { title: "InstaDoodle official site", url: official.instaDoodle, description: "YouTube use cases, cloud workflow, aspect ratios, voice, output, pricing presentation, and guarantee." },
      { title: "VideoScribe official pricing", url: official.videoScribe, description: "Commercial rights, reseller rights, duration, downloads, assets, voice tools, and prices." },
      { title: "VideoScribe publishing guide", url: "https://help.videoscribe.co/knowledge/publish-and-share-projects", description: "Official MP4, GIF, preview-link, download, and duration details." },
      { title: "Canva whiteboard animation", url: official.canva, description: "SpeedPaint, mixed-media editing, voiceover, effects, sharing, and MP4 workflow." },
      { title: "Vyond monetization guidance", url: "https://help.vyond.com/hc/en-us/articles/17221613849364-Can-I-monetize-videos-I-create-with-Vyond-Studio", description: "Official ad-revenue, video-sales, transfer, and broadcast-rights guidance." }
    ]
  }
];

const breadcrumbPage = (name, url) => ({
  "@type": "WebPage",
  "@id": url,
  url,
  name
});

const pageHtml = (page) => {
  const canonical = `${SITE}${page.path}`;
  const clusterUrl = `${SITE}recommendations/whiteboard-animation.html`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.heading,
    description: page.description,
    datePublished: published,
    dateModified: published,
    author: {
      "@type": "Organization",
      name: "AI Creator Hub Editorial Team",
      url: `${SITE}authors/editorial-team.html`
    },
    publisher: { "@type": "Organization", name: "AI Creator Hub", url: SITE },
    mainEntityOfPage: canonical,
    keywords: page.keywords.join(", ")
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: breadcrumbPage("Home", SITE) },
      { "@type": "ListItem", position: 2, name: "Whiteboard Animation", item: breadcrumbPage("Whiteboard Animation", clusterUrl) },
      { "@type": "ListItem", position: 3, name: page.heading, item: breadcrumbPage(page.heading, canonical) }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="keywords" content="${escapeHtml(page.keywords.join(", "))}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}assets/img/hero-dashboard.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${SITE}assets/img/hero-dashboard.webp">
  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
  <link rel="icon" href="../assets/img/favicon-aih.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body data-active="${page.active}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="nav" aria-label="Primary navigation">
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
  </div></header>
  <main class="main" id="main">
    <section class="comparison-hero">
      <div class="container comparison-hero__grid">
        <div class="reveal">
          <a class="breadcrumb" href="${links.recommendation}">Whiteboard Animation</a>
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.heading}</h1>
          <p class="comparison-subtitle">${page.subtitle}</p>
          <p class="lede">${page.intro}</p>
          <div class="review-byline" aria-label="Article authorship">
            <span>Prepared by</span>
            <a href="../authors/editorial-team.html">AI Creator Hub Editorial Team</a>
            <span>Source checked ${published}</span>
            <a href="../editorial-methodology.html">How we evaluate tools</a>
          </div>
        </div>
        <aside class="comparison-summary-card reveal">${page.heroAside}</aside>
      </div>
    </section>
    ${page.content}
    ${faqSection(page.faqs)}
    ${sourceSection(page.sources)}
    ${page.includeAffiliate === false ? "" : `<section class="engine-section"><div class="container narrow content-panel"><p class="eyebrow">Affiliate Disclosure</p><h2>Editorial judgment stays independent.</h2><p>AI Creator Hub may earn a commission from qualifying purchases made through the InstaDoodle partner link. Affiliate relationships do not determine scores, comparisons, or recommendations.</p><p><a href="${affiliateUrl}" target="_blank" rel="sponsored nofollow noopener noreferrer">Check the current InstaDoodle offer</a></p></div></section>`}
  </main>
  <footer class="site-footer"></footer>
  <script src="../assets/js/reviews-data.js" defer></script>
  <script src="../assets/js/main.js" defer></script>
</body>
</html>
`;
};

for (const page of pages) {
  const target = path.join(root, page.path);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, pageHtml(page), "utf8");
}

console.log(`Built ${pages.length} whiteboard-animation cluster pages.`);
