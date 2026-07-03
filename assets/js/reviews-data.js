window.AICHReviews = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    category: "Chatbots",
    rating: 4.8,
    badge: "Best overall assistant",
    summary: "ChatGPT is the broadest general-purpose AI assistant for research, writing, coding help, planning, and everyday creative work.",
    verdict: "Best for creators who want one capable AI workspace that can move from idea generation to polished execution.",
    idealFor: ["Creators", "marketers", "students", "operators"],
    pricing: "Free plan available; paid plans add stronger models and expanded usage.",
    featured: true,
    published: "2026-06-19",
    url: "reviews/chatgpt.html",
    pros: ["Excellent all-around quality", "Strong writing and analysis workflows", "Useful multimodal capabilities"],
    cons: ["Advanced usage can require a paid plan", "Outputs still need fact-checking", "Team governance depends on plan"],
    useCases: ["Draft content briefs", "Summarize research", "Create launch plans", "Prototype code"],
    scoreBreakdown: {
      Ease: 9.5,
      Output: 9.4,
      Value: 9.0,
      Integrations: 8.8
    }
  },
  {
    slug: "claude",
    name: "Claude",
    category: "Chatbots",
    rating: 4.7,
    badge: "Best for long-form thinking",
    summary: "Claude is a refined AI assistant with a strong reputation for thoughtful writing, long-context work, and careful analysis.",
    verdict: "Best for teams that care about nuanced writing, document-heavy work, and calm reasoning over raw feature breadth.",
    idealFor: ["Writers", "analysts", "product teams", "researchers"],
    pricing: "Free plan available; paid plans increase limits and unlock stronger workflows.",
    featured: true,
    published: "2026-06-14",
    url: "reviews/claude.html",
    pros: ["Excellent tone control", "Strong document analysis", "Comfortable long-context workflows"],
    cons: ["Some workflows depend on availability limits", "Less broad plugin ecosystem", "Not always the fastest for quick snippets"],
    useCases: ["Review strategy docs", "Edit articles", "Analyze policies", "Summarize interviews"],
    scoreBreakdown: {
      Ease: 9.2,
      Output: 9.3,
      Value: 8.7,
      Integrations: 8.1
    }
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: "Coding",
    rating: 4.6,
    badge: "Best AI coding workspace",
    summary: "Cursor brings AI-native editing, repository context, chat, and code generation into a familiar developer environment.",
    verdict: "Best for developers who want AI assistance close to the codebase without constantly switching tools.",
    idealFor: ["Developers", "startup teams", "technical founders", "students"],
    pricing: "Free tier available; paid plans add larger usage limits and premium model access.",
    featured: true,
    published: "2026-06-08",
    url: "reviews/cursor.html",
    pros: ["Deep codebase context", "Fast refactor workflows", "Great fit for existing editor habits"],
    cons: ["Can be noisy on large tasks", "Model quality varies by selection", "Requires disciplined review of generated code"],
    useCases: ["Refactor modules", "Generate tests", "Explain unfamiliar code", "Build prototypes"],
    scoreBreakdown: {
      Ease: 8.9,
      Output: 9.0,
      Value: 8.8,
      Integrations: 8.9
    }
  },
  {
    slug: "heygen",
    name: "HeyGen",
    category: "Video",
    rating: 4.5,
    badge: "Best avatar video platform",
    summary: "HeyGen helps creators produce presenter-led videos with AI avatars, voice options, translations, and campaign-ready formats.",
    verdict: "Best for teams producing repeatable education, sales, and product videos without a studio setup.",
    idealFor: ["Founders", "sales teams", "course creators", "marketers"],
    pricing: "Paid plans are common for serious publishing; free trials or limited previews may vary.",
    featured: true,
    published: "2026-05-28",
    url: "reviews/heygen.html",
    pros: ["Polished avatar output", "Great for localized videos", "Reduces production overhead"],
    cons: ["Realism depends on avatar and script quality", "Higher-volume use can get expensive", "Needs brand review for public campaigns"],
    useCases: ["Product explainers", "Sales outreach", "Training videos", "Localized announcements"],
    scoreBreakdown: {
      Ease: 8.7,
      Output: 8.9,
      Value: 8.2,
      Integrations: 8.0
    }
  },
  {
    slug: "instadoodle",
    name: "InstaDoodle",
    category: "Images",
    rating: 4.2,
    badge: "Best doodle explainer style",
    summary: "InstaDoodle focuses on fast doodle-style visuals and explainer assets for social content, education, and simple marketing funnels.",
    verdict: "Best for creators who want a distinct explainer style without opening a heavy design suite.",
    idealFor: ["Educators", "solo creators", "social media teams", "coaches"],
    pricing: "Pricing varies by promotion and plan; review the checkout details before buying.",
    featured: false,
    published: "2026-05-15",
    url: "reviews/instadoodle.html",
    pros: ["Simple visual style", "Useful for explainer content", "Lower design learning curve"],
    cons: ["More niche than full image tools", "Template quality can vary", "Not ideal for premium brand imagery"],
    useCases: ["Explainer graphics", "Short-form posts", "Course visuals", "Simple storyboards"],
    scoreBreakdown: {
      Ease: 8.8,
      Output: 7.8,
      Value: 8.1,
      Integrations: 7.2
    }
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    category: "Voice",
    rating: 4.6,
    badge: "Best AI voice quality",
    summary: "ElevenLabs is a strong voice platform for natural narration, voice generation, dubbing, and audio-first content workflows.",
    verdict: "Best for creators who need polished narration and voice consistency across video, podcast, and learning content.",
    idealFor: ["Podcasters", "video teams", "course creators", "agencies"],
    pricing: "Free and paid tiers are typically available, with usage based on characters or minutes.",
    featured: true,
    published: "2026-05-06",
    url: "reviews/elevenlabs.html",
    pros: ["Natural voice quality", "Good control over delivery", "Useful for multilingual content"],
    cons: ["Usage can scale costs quickly", "Voice rights need careful handling", "Fine tuning takes experimentation"],
    useCases: ["Video narration", "Podcast intros", "Product walkthroughs", "Dubbing"],
    scoreBreakdown: {
      Ease: 8.6,
      Output: 9.2,
      Value: 8.5,
      Integrations: 8.4
    }
  }
];

window.AICHCategories = [
  {
    name: "Chatbots",
    slug: "chatbots",
    description: "AI assistants for research, writing, planning, and decision support."
  },
  {
    name: "Coding",
    slug: "coding",
    description: "Developer tools for generation, refactoring, tests, and repo-aware workflows."
  },
  {
    name: "Video",
    slug: "video",
    description: "Avatar, editing, scripting, and production tools for modern video teams."
  },
  {
    name: "Images",
    slug: "images",
    description: "Visual generation, design, illustration, and creative production tools."
  },
  {
    name: "Voice",
    slug: "voice",
    description: "AI narration, dubbing, cloning, and audio enhancement platforms."
  },
  {
    name: "Marketing",
    slug: "marketing",
    description: "Tools for campaigns, copy, landing pages, ads, and growth operations."
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "Automation, notes, meeting, document, and workflow acceleration tools."
  }
];
