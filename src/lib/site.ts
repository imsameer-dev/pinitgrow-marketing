export const nav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;

export const hero = {
  eyebrow: "Pinterest research for creators",
  headline: "See the keywords, pins, and rankings Pinterest doesn't show you.",
  sub: "Keyword explorer, top pins, accounts, boards, and rank tracking — in one cloud workspace.",
  trialNote: "No credit card. Full access during a 3-day trial.",
};

export const proofItems = [
  { value: 364, suffix: "+", label: "keyword suggestions from one seed" },
  { value: 3, suffix: "", label: "core pin research tools" },
  { value: 2, suffix: "", label: "scheduled rank and search trackers" },
  { value: 2, suffix: "", label: "account and board explorers" },
] as const;

export const walkthrough = [
  {
    title: "Find keywords Pinterest already ranks",
    body: "Start from a seed. PinitGrow expands A–Z and 0–9 autocomplete, then scores popularity so you can see demand — not guess it.",
    shot: "keywords" as const,
    href: "/features",
  },
  {
    title: "Study the pins that already win",
    body: "Top Pins and Pin Stats surface saves, Pin Score, annotations, and destinations for the results that already rank.",
    shot: "keywords" as const,
    href: "/features",
  },
  {
    title: "Track your domain over time",
    body: "Rank Tracker and Search Tracker snapshot keyword + domain position on a schedule so you can see movement, not a one-off SERP.",
    shot: "keywords" as const,
    href: "/features",
  },
] as const;

export const bento = [
  { title: "Ideas", body: "Official interests and annotations so pins match how Pinterest labels content." },
  { title: "Account Explorer", body: "Open a competitor profile and see the pins and topics they actually rank with." },
  { title: "Board Explorer", body: "Inspect a board's pins and interests without clicking through Pinterest by hand." },
  { title: "Research Projects", body: "Package a keyword run into a durable project instead of a throwaway tab." },
  { title: "Saved Lists", body: "Keep the keywords and pins you want to ship next." },
  { title: "CSV export", body: "Download explorer results when you are ready to brief a writer or designer." },
] as const;

export const howItWorks = [
  { step: "1", title: "Search a seed", body: "Type a keyword, account, board, or pin URL — the same way you already work." },
  { step: "2", title: "Read the hidden stats", body: "See popularity, saves, annotations, and rank position in one workspace." },
  { step: "3", title: "Save, track, export", body: "Keep what matters in lists and trackers. Unsaved explorer tabs stay in-session only." },
] as const;

export const testimonials = [
  {
    quote: "I stopped guessing pin titles and started using the keywords Pinterest already suggests.",
    name: "Illustrative creator quote",
  },
  {
    quote: "Rank tracking in the browser is the difference between a desktop dump and a weekly habit.",
    name: "Illustrative publisher quote",
  },
  {
    quote: "Account Explorer is how I decide which competitors are worth studying this month.",
    name: "Illustrative strategist quote",
  },
] as const;

export const faqs = [
  {
    q: "What is PinitGrow?",
    a: "PinitGrow is a cloud Pinterest research workspace: keyword expansion, top pins, pin stats, account and board explorers, plus rank and search tracking. The marketing site is pinitgrow.com; the app is app.pinitgrow.com.",
  },
  {
    q: "How is it different from PinClicks?",
    a: "PinClicks is the established cloud rank tracker in this niche. PinitGrow is also cloud-based and includes rank tracking plus account and board explorers in one login. Compare features on the Features page rather than assuming identical data coverage.",
  },
  {
    q: "How is it different from Pin Inspector?",
    a: "Pin Inspector is a desktop app with a one-time license. PinitGrow is a browser app with a 3-day trial and monthly plans, so you can research from any machine without installing software.",
  },
  {
    q: "Do you use the official Pinterest API?",
    a: "No. PinitGrow reads publicly available logged-out Pinterest data, the same class of approach used by other tools in this category. We do not claim an official Pinterest partnership.",
  },
  {
    q: "How long is the trial?",
    a: "Every new account includes a 3-day trial with no credit card. Limits apply; the tool set matches paid plans.",
  },
  {
    q: "Where is the app?",
    a: "The research workspace is at app.pinitgrow.com. This website is only the public front door.",
  },
  {
    q: "Does it support light and dark mode?",
    a: "Yes. Both the marketing site and the app follow a system default, with a manual light or dark override.",
  },
  {
    q: "Can I export CSV?",
    a: "Yes. Explorer results can be exported to CSV from the app.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Your account remains. Research routes are gated until a plan is activated. You can still open profile and security settings.",
  },
] as const;

export const faqPreviewIds = [0, 1, 3, 4] as const;

export const tools = [
  {
    title: "Keyword Explorer",
    input: 'A seed such as "home decor".',
    output: "A–Z / 0–9 suggestions with intent, popularity, and demand when volume is live.",
    shot: "keywords" as const,
  },
  {
    title: "Ideas",
    input: "A topic or interest query.",
    output: "Official annotations so you can write pins the way Pinterest already labels them.",
    shot: "keywords" as const,
  },
  {
    title: "Top Pins",
    input: "A keyword.",
    output: "Ranking pins with saves, Pin Score, and destination links.",
    shot: "keywords" as const,
  },
  {
    title: "Pin Stats",
    input: "One or many pin URLs.",
    output: "Bulk stats, annotations, and destination data.",
    shot: "keywords" as const,
  },
  {
    title: "Account Explorer",
    input: "A username or profile keyword.",
    output: "The pins and topics a competitor account actually uses.",
    shot: "keywords" as const,
  },
  {
    title: "Board Explorer",
    input: "A board URL or name.",
    output: "Board-level pins and interests.",
    shot: "keywords" as const,
  },
  {
    title: "Rank Tracker",
    input: "A keyword plus your domain.",
    output: "Scheduled position checks over time.",
    shot: "keywords" as const,
  },
  {
    title: "Search Tracker",
    input: "A keyword to snapshot.",
    output: "SERP snapshots you can compare week to week.",
    shot: "keywords" as const,
  },
  {
    title: "Research Projects & Saved Lists",
    input: "Any explorer result you want to keep.",
    output: "Durable projects and lists. Unsaved explorer work lives in the current tab only; refresh clears it. Tracker history stays on the server.",
    shot: "keywords" as const,
  },
] as const;
