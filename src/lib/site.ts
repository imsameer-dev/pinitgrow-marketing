import { trialDays } from "@/lib/plans";

export const site = {
  name: "PinitGrow",
  url: "https://pinitgrow.com",
  appHost: "app.pinitgrow.com",
  email: "support@pinitgrow.com",
  description:
    "Find Pinterest keywords, winning pins, boards, accounts, trends, and ranking opportunities in one research platform.",
} as const;

export const nav = [
  { href: "/#features", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#usecases", label: "Use Cases" },
  { href: "/faq", label: "Resources" },
] as const;

export const footerNav = {
  product: [
    { href: "/features#keyword-explorer", label: "Keyword Explorer" },
    { href: "/features#top-pins", label: "Top Pins" },
    { href: "/features#pin-stats", label: "Pin Stats" },
    { href: "/features#rank-tracker", label: "Rank Tracker" },
    { href: "/features#search-tracker", label: "Search Tracker" },
  ],
  explore: [
    { href: "/features#ideas", label: "Ideas" },
    { href: "/features#account-explorer", label: "Account Explorer" },
    { href: "/features#board-explorer", label: "Board Explorer" },
    { href: "/features#trends", label: "Trends" },
    { href: "/features#projects", label: "Research Projects" },
    { href: "/features#lists", label: "Saved Lists" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/pricing", label: "Pricing" },
    { href: "/affiliate", label: "Affiliate Program" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/refund", label: "Refund Policy" },
    { href: "/contact", label: "Support" },
  ],
} as const;

export const audiences = [
  "Bloggers",
  "Niche sites",
  "Affiliate marketers",
  "Creators",
  "Agencies",
  "Publishers",
] as const;

export const hero = {
  eyebrow: "Pinterest research intelligence for serious growth",
  headlineBefore: "Stop guessing what works on ",
  headlineAccent: "Pinterest.",
  sub: "PinitGrow shows you what people search, which pins are winning, who owns the niche, and where fresh opportunities are moving before everyone else sees them.",
} as const;

export const problems = [
  {
    kind: "problem" as const,
    title: "Guessing what people search",
    body: "You publish around ideas that feel right instead of queries Pinterest already proves people want.",
  },
  {
    kind: "solution" as const,
    title: "Find demand before you create",
    body: "Expand seed keywords across A–Z and 0–9, compare opportunity, and surface viable research clusters fast.",
  },
  {
    kind: "problem" as const,
    title: "No visibility into what ranks",
    body: "You see pins in the feed, but not the titles, engagement, freshness, boards, creators, and movement behind them.",
  },
  {
    kind: "solution" as const,
    title: "Reverse-engineer the winners",
    body: "See Top Pins, Pin Stats, leading boards, creator accounts, and ranking momentum in one research view.",
  },
];

export const features = [
  {
    id: "projects",
    icon: "folder" as const,
    visual: "boards" as const,
    badge: "Workspace",
    title: "Research Projects",
    body: "Package a seed keyword into a durable research snapshot — keywords, pins, ideas, and an opportunity score — instead of losing the work when a tab closes.",
    decision: "How do I keep a full niche brief for my team?",
    input: "A project name and seed keyword after you have run Keyword Explorer and Top Pins.",
    output: "A saved research package with opportunity scoring, pins, keywords, and ideas.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/projects",
  },
  {
    id: "keyword-explorer",
    icon: "search" as const,
    visual: "bars" as const,
    badge: "Discover",
    title: "Keyword Explorer",
    body: "Expand a seed keyword across the full A–Z and 0–9 sweep and discover hidden long-tail opportunities before you create content.",
    decision: "What keywords should I target next?",
    input: 'A seed such as "home decor" or "easy weeknight dinners".',
    output:
      "A–Z / 0–9 suggestions with intent, popularity, and demand when volume is live.",
    shot: "keywords" as const,
    shotUrl: "app.pinitgrow.com/app/keywords",
    barWidths: ["86%", "69%", "78%", "54%", "63%"],
  },
  {
    id: "ideas",
    icon: "spark" as const,
    visual: "tiles" as const,
    badge: "Ideate",
    title: "Ideas",
    body: "Find Pinterest-native idea clusters, related questions and fresh creative angles around any niche without guessing what users want.",
    decision: "Which content angles deserve a new post or Pin?",
    input: "A topic or interest query.",
    output: "Official annotations so you can write pins the way Pinterest already labels them.",
    shot: "ideas" as const,
    shotUrl: "app.pinitgrow.com/app/ideas",
  },
  {
    id: "top-pins",
    icon: "trophy" as const,
    visual: "bars" as const,
    badge: "Analyze",
    title: "Top Pins",
    body: "See which Pins are actually ranking and compare saves, engagement, freshness, titles, descriptions and source patterns.",
    decision: "What does winning content in this niche look like?",
    input: "A keyword.",
    output: "Ranking pins with saves, Pin Score, and destination links.",
    shot: "top-pins" as const,
    shotUrl: "app.pinitgrow.com/app/top-pins",
    barWidths: ["91%", "83%", "68%", "77%", "58%"],
  },
  {
    id: "pin-stats",
    icon: "bars" as const,
    visual: "chart" as const,
    badge: "Measure",
    title: "Pin Stats",
    body: "Inspect public engagement signals and understand why some Pins keep winning while others stall after the initial distribution burst.",
    decision: "Which Pin patterns are worth repeating?",
    input: "One or many pin URLs.",
    output: "Bulk stats, annotations, and destination data.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/pin-stats",
  },
  {
    id: "account-explorer",
    icon: "users" as const,
    visual: "creators" as const,
    badge: "Creators",
    title: "Account Explorer",
    body: "Discover influential creator accounts, analyze niche authority and see who repeatedly surfaces around your target topics.",
    decision: "Which accounts should I study for growth patterns?",
    input: "A username or profile keyword.",
    output: "The pins and topics a competitor account actually uses.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/account-explorer",
  },
  {
    id: "board-explorer",
    icon: "grid" as const,
    visual: "boards" as const,
    badge: "Boards",
    title: "Board Explorer",
    body: "Find high-performing boards, compare activity and followers, and identify where your content belongs before publishing.",
    decision: "Which boards are the strongest topical match?",
    input: "A board URL or name.",
    output: "Board-level pins and interests.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/board-explorer",
  },
  {
    id: "rank-tracker",
    icon: "trend" as const,
    visual: "ranking" as const,
    badge: "Track",
    title: "Rank Tracker",
    body: "Track keyword positions, movement and new gains so you always know what is improving and what needs attention.",
    decision: "Are my SEO and Pin changes actually working?",
    input: "A keyword plus your domain.",
    output: "Scheduled position checks over time.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/rank-tracker",
  },
  {
    id: "search-tracker",
    icon: "snapshot" as const,
    visual: "ranking" as const,
    badge: "Snapshot",
    title: "Search Tracker",
    body: "Snapshot a Pinterest search over time so you can compare which pins appear, disappear, and hold the SERP week to week — not just a one-off look.",
    decision: "How is this search results page changing over time?",
    input: "A keyword to track on a schedule.",
    output: "SERP snapshots with pin counts you can compare over time.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/search-tracker",
  },
  {
    id: "trends",
    icon: "bolt" as const,
    visual: "wave" as const,
    badge: "Momentum",
    title: "Trends",
    body: "Spot momentum early and separate fresh opportunity from stale search behavior before you invest time in new content.",
    decision: "What should I publish before the trend peaks?",
    input: "A region and topic view.",
    output: "Spotlight, growing, and top search signals from public Pinterest data.",
    shot: "trends" as const,
    shotUrl: "app.pinitgrow.com/app/trends",
  },
  {
    id: "lists",
    icon: "save" as const,
    visual: "bars" as const,
    badge: "Library",
    title: "Saved Lists",
    body: "Keep the keywords and pins you want to ship next. Unsaved explorer work lives in the current tab; lists persist so research survives a refresh.",
    decision: "Which keywords and pins should I brief next?",
    input: "Any keyword or pin you save from an explorer.",
    output: "Named keyword and pin lists you can reopen anytime.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/lists",
    barWidths: ["88%", "72%", "64%", "51%"],
  },
];

export const steps = [
  {
    num: "1",
    title: "Enter a seed keyword",
    body: "Start with the topic, niche, product, recipe, style, or content category you want to own.",
  },
  {
    num: "2",
    title: "See what Pinterest is proving",
    body: "Analyze related keywords, Top Pins, ideas, boards, accounts, freshness, engagement, and competition.",
  },
  {
    num: "3",
    title: "Build the content plan",
    body: "Save winning opportunities, export research, create lists, and prioritize the topics most likely to move.",
  },
];

export const stats = [
  { value: "A–Z", label: "keyword expansion on every seed" },
  { value: "11", label: "research tools in one workspace" },
  { value: "Live", label: "pin, board, and account signals" },
  { value: `${trialDays} days`, label: "full-access trial, no card" },
] as const;

export const deepDives = [
  {
    tag: "A",
    title: "Expand beyond obvious keywords.",
    body: "PinitGrow runs your seed through A–Z and 0–9 autocomplete expansion so you can uncover long-tail queries, subtopics, intent variations, and hidden content clusters instead of stopping at the first ten ideas.",
    shot: "keywords-light" as const,
    shotUrl: "app.pinitgrow.com/app/keywords",
    caption: "A–Z Keyword Expansion",
    badge: "Live results",
  },
  {
    tag: "B",
    title: "See what top-ranking pins are doing right.",
    body: "Break down the pins Pinterest is already rewarding. Compare saves, engagement, freshness, title structure, description depth, source domains, and related ideas so your next creative starts with evidence.",
    shot: "top-pins" as const,
    shotUrl: "app.pinitgrow.com/app/top-pins",
    caption: "Top Pins",
    badge: "Live ranking view",
  },
  {
    tag: "C",
    title: "Find the boards and accounts shaping your niche.",
    body: "Know who already owns attention. PinitGrow surfaces leading boards and creators so you can study their content patterns, target collaboration opportunities, and understand where your niche is concentrated.",
    shot: "placeholder" as const,
    shotUrl: "app.pinitgrow.com/app/board-explorer",
    caption: "Board & Account Explorer",
    badge: "Authority map",
  },
  {
    tag: "D",
    title: "Track movement, not snapshots.",
    body: "Ranking research becomes useful when you know what is changing. Watch keyword positions, movement, freshness, and topic momentum so you can react before your competitors do.",
    shot: "trends" as const,
    shotUrl: "app.pinitgrow.com/app/trends",
    caption: "Trends & Rank Tracker",
    badge: "Momentum view",
  },
  {
    tag: "E",
    title: "Turn research into a repeatable system.",
    body: "Organize research into projects and saved lists, export clean data, and generate research briefs so your strategy survives beyond one browser session or one team member.",
    shot: "ideas" as const,
    shotUrl: "app.pinitgrow.com/app/projects",
    caption: "Ideas & Research Projects",
    badge: "Saved workflow",
  },
];

export const testimonials = [
  {
    quote:
      "PinitGrow cut my research time in half. I finally know which keywords deserve a post before I spend hours creating it.",
    name: "Sarah Johnson",
    role: "Food Publisher",
  },
  {
    quote:
      "The Top Pins and Trends views are the first thing I check now. My Pinterest calendar is built from actual ranking evidence.",
    name: "Emily Carter",
    role: "Pinterest Strategist",
  },
  {
    quote:
      "Board Explorer exposed traffic sources we were completely ignoring. It changed how we structure every client campaign.",
    name: "Ryan Patel",
    role: "Agency Marketer",
  },
];

export const homeFaqs = [
  {
    q: "Is there a free trial?",
    a: `Yes. Every plan starts with a ${trialDays}-day trial so you can test the workflow before paying. No credit card required.`,
  },
  {
    q: "Do I need a Pinterest account connected?",
    a: "No for core research. Account connection is only needed for features that depend on your own tracked data.",
  },
  {
    q: "Can I export the research?",
    a: "Yes. Keyword Explorer, Ideas, Top Pins, and Board Explorer can export CSV from the app on every plan.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There is no long-term lock-in on monthly plans.",
  },
  {
    q: "Is this only for bloggers?",
    a: "No. PinitGrow works for creators, Etsy sellers, affiliate marketers, publishers, agencies, and brand teams.",
  },
  {
    q: "Does the product keep getting updated?",
    a: "Yes. New research modules and data improvements are added as the platform evolves.",
  },
];

export const faqs = [
  ...homeFaqs,
  {
    q: "What is PinitGrow?",
    a: "PinitGrow is a cloud Pinterest research workspace: keyword expansion, top pins, pin stats, account and board explorers, plus rank and search tracking. The marketing site is pinitgrow.com; the app is app.pinitgrow.com.",
  },
  {
    q: "Do you use the official Pinterest API?",
    a: "No. PinitGrow reads publicly available logged-out Pinterest data, the same class of approach used by other tools in this category. We do not claim an official Pinterest partnership.",
  },
  {
    q: "Where is the app?",
    a: "The research workspace is at app.pinitgrow.com. This website is only the public front door. Log in and trial signup always happen there.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Your account remains. Research routes are gated until a plan is activated. You can still open profile and security settings.",
  },
];
