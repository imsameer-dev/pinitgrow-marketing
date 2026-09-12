import { plans } from "@/lib/plans";
import type { ProductShotName } from "@/lib/product-shots";

export type FeatureColumn = {
  name: string;
  meaning: string;
};

export type FeatureTable = {
  title: string;
  caption?: string;
  columns: FeatureColumn[];
};

export type FeaturePage = {
  slug: string;
  title: string;
  badge: string;
  headline: string;
  ctaTitle: string;
  decision: string;
  lead: string;
  input: string;
  process: string;
  output: string;
  shot: ProductShotName;
  appPath: string;
  tables: FeatureTable[];
  extras: { title: string; body: string }[];
  actions: string[];
  related: string[];
  planRowLabels: string[];
};

export const featurePages: FeaturePage[] = [
  {
    slug: "keyword-explorer",
    title: "Keyword Explorer",
    badge: "Discover",
    headline: "Turn one seed into the Pinterest searches people actually use.",
    ctaTitle: "Start researching your first keyword",
    decision: "What keywords should I target next?",
    lead: "Expand a seed across Pinterest autocomplete A–Z and 0–9, then compare intent, demand, and popularity before you create anything.",
    input: 'A seed of at least two characters, such as "home decor" or "easy weeknight dinners". Trends can prefill the seed.',
    process:
      "PinitGrow runs the full A–Z and 0–9 typeahead sweep, dedupes suggestions, groups them, and scores relative popularity. Demand is attached when Pinterest publishes it on an Interest page.",
    output:
      "A grouped keyword table with search intent, Pinterest demand, and a 0–100 popularity score. Copy, CSV, and Save to list are available once results load.",
    shot: "keyword-explorer",
    appPath: "/app/keywords",
    tables: [
      {
        title: "Results you see in the app",
        caption: "Rows are grouped as Strong matches, A–Z keywords, then 0–9 keywords.",
        columns: [
          {
            name: "Keyword",
            meaning: "The suggestion Pinterest returned for this seed.",
          },
          {
            name: "Search intent",
            meaning:
              "How-to, Comparison, Shopping, Local, Seasonal, Trends, Ideas, or General.",
          },
          {
            name: "Pinterest demand",
            meaning:
              "Compact search volume when it was measured on a public Pinterest Interest page. Otherwise shown as a dash.",
          },
          {
            name: "Popularity",
            meaning:
              "Relative 0–100 score from autocomplete rank and how often the term appeared across the sweep.",
          },
        ],
      },
      {
        title: "CSV export columns",
        columns: [
          { name: "Keyword", meaning: "The suggestion text." },
          { name: "Rank", meaning: "Row order in the exported list." },
          { name: "Word Count", meaning: "Number of words in the keyword." },
          { name: "Character Count", meaning: "Number of characters in the keyword." },
          { name: "Seed", meaning: "The seed you expanded." },
          { name: "Monthly Searches", meaning: "Pinterest demand when available." },
          { name: "CPC", meaning: "Reserved for later; exported empty today." },
          { name: "Competition", meaning: "Reserved for later; exported empty today." },
        ],
      },
    ],
    extras: [
      {
        title: "Filters",
        body: "Both, A–Z, or 0–9. Filters follow the expansion source, not digits that happen to appear inside a keyword.",
      },
      {
        title: "Temporary workspace",
        body: "Unsaved explorer work stays in the current tab. Save a keyword to a list, or create a Research Project, to keep it.",
      },
    ],
    actions: ["Explore", "Copy all visible keywords", "Download Keywords CSV", "Save to list"],
    related: ["ideas", "top-pins", "lists", "projects"],
    planRowLabels: ["Keyword Explorer"],
  },
  {
    slug: "ideas",
    title: "Ideas",
    badge: "Discover",
    headline: "See the topics Pinterest already assigns to winning Pins.",
    ctaTitle: "Find ideas from ranking Pins",
    decision: "Which content angles deserve a new post or Pin?",
    lead: "Find the official Pinterest topics attached to top-ranking pins for a seed, with search volume, occurrences, and relevance.",
    input: "A seed keyword of at least two characters.",
    process:
      "PinitGrow collects top-ranking pins for the seed, reads the public topics Pinterest assigns to them, then measures Interest-page search volume where Pinterest publishes it.",
    output:
      "A ranked ideas table plus Copy and CSV. Volume can show as a number, Not published, Measuring, or Unavailable.",
    shot: "ideas",
    appPath: "/app/ideas",
    tables: [
      {
        title: "Results you see in the app",
        caption: "Ideas are taken from top-ranking pins, not guessed from the seed alone.",
        columns: [
          { name: "Idea", meaning: "The Pinterest topic or annotation name." },
          {
            name: "Search volume",
            meaning: "Measured Interest volume, or Not published / Unavailable when Pinterest does not expose a count.",
          },
          {
            name: "Occurrences",
            meaning: "How many top pins in this run carried the idea.",
          },
          {
            name: "Top-pin positions",
            meaning: "The Pinterest ranks where the idea appeared.",
          },
          { name: "Category", meaning: "Pinterest category tree when available." },
          { name: "Relevance", meaning: "How closely the idea matches the seed." },
        ],
      },
      {
        title: "CSV export columns",
        columns: [
          { name: "Idea", meaning: "Topic name." },
          { name: "Word Count", meaning: "Words in the idea name." },
          { name: "Character Count", meaning: "Characters in the idea name." },
          { name: "Search Volume", meaning: "Measured volume when available." },
          { name: "Follower Count", meaning: "Interest followers when Pinterest exposes them." },
          { name: "Idea Id", meaning: "Numeric id parsed from the Pinterest idea link." },
          { name: "Category Tree", meaning: "Full category path." },
          { name: "Idea Link", meaning: "Pinterest idea or search URL." },
          { name: "Occurrences", meaning: "How often it appeared on top pins." },
          { name: "Pin Positions", meaning: "Comma-separated ranks." },
          { name: "Relevance Score", meaning: "Numeric relevance." },
        ],
      },
    ],
    extras: [
      {
        title: "Progress",
        body: "The tool first reports pins analyzed, then volumes measured. Results can appear before volume measurement finishes.",
      },
    ],
    actions: ["Find ideas", "Copy names", "Download CSV", "Open the Pinterest Idea or Search page"],
    related: ["keyword-explorer", "top-pins", "projects"],
    planRowLabels: ["Ideas searches"],
  },
  {
    slug: "top-pins",
    title: "Top Pins",
    badge: "Analyze",
    headline: "Inspect the Pins that already own the search.",
    ctaTitle: "See what is already ranking",
    decision: "What does winning content in this niche look like?",
    lead: "Pull the pins Pinterest is already ranking for a keyword, label how closely they match, then inspect engagement, freshness, and source patterns.",
    input:
      "A keyword plus a maximum pin count. Plans cap the ceiling at 100, 300, or 500 pins. Trends can prefill the keyword.",
    process:
      "PinitGrow scrapes the public search feed, keeps Pinterest’s original rank order, then enriches each pin with detail stats. Match labels separate Strong, Related, Broad, and Weak results.",
    output:
      "A masonry grid or sortable table, match-confidence counts, and a CSV with the full pin field set. You can refresh a cached run to fetch live data.",
    shot: "top-pins",
    appPath: "/app/top-pins",
    tables: [
      {
        title: "Table view columns",
        caption: "Grid view shows the same metrics on each pin card. Default order is Pinterest rank.",
        columns: [
          { name: "Pin", meaning: "Thumbnail, title, and destination domain." },
          { name: "Match", meaning: "Strong, Related, Broad, or Weak against your seed." },
          { name: "Relevance score", meaning: "Numeric seed-match score used for sorting." },
          { name: "Pin score", meaning: "PinitGrow’s 0–100 popularity score for the pin." },
          { name: "Pinterest rank", meaning: "Original position in the public search feed." },
          { name: "Created At", meaning: "Date Pinterest reports for the pin." },
          { name: "Appearances", meaning: "How often the pin showed up across collected pages." },
          { name: "Saves", meaning: "Public save count when Pinterest exposes it." },
          { name: "Repins", meaning: "Public repin count." },
          { name: "Reactions", meaning: "Total public reactions." },
          { name: "Comments", meaning: "Public comment count." },
          { name: "Is Repin", meaning: "Whether this result is a repin of another pin." },
          { name: "Tagged topics", meaning: "Pinterest annotations / ideas on the pin." },
          { name: "Description", meaning: "Published pin description." },
        ],
      },
      {
        title: "CSV export also includes",
        columns: [
          { name: "Image, Pin ID, Title", meaning: "Core pin identity." },
          { name: "Shares, Hashtags, Site Name, Link", meaning: "Distribution and destination." },
          { name: "Dominant Color, Is Video, Is Promoted, Is Story", meaning: "Format and promotion flags." },
          { name: "Pinner Username, Pinner Name, Pinner Followers", meaning: "Creator account." },
          { name: "Board Name, Board Link, Profile Link, Pin URL", meaning: "Where the pin lives." },
          { name: "Matched / Missing Seed Terms, Source Query", meaning: "Why the match label was assigned." },
        ],
      },
    ],
    extras: [
      {
        title: "Collection size",
        body: "Choose up to 50, 100, 200, 300, 400, or 500 pins, limited by your plan’s maximum pins per search.",
      },
      {
        title: "Match confidence",
        body: "Each run reports how many results are strong, related, broad, and weak, plus overall confidence.",
      },
    ],
    actions: ["Search", "Switch grid or table", "Load more in batches of 25", "Export CSV", "Refresh live"],
    related: ["keyword-explorer", "pin-stats", "board-explorer", "projects"],
    planRowLabels: ["Top Pins credits", "Maximum pins/search"],
  },
  {
    slug: "pin-stats",
    title: "Pin Stats",
    badge: "Analyze",
    headline: "Pull public engagement on any Pin, in bulk.",
    ctaTitle: "Inspect Pin stats",
    decision: "Which Pin patterns are worth repeating?",
    lead: "Paste one or many Pinterest pin URLs and pull public engagement, annotations, and destination data in bulk.",
    input: "Pin URLs, one per line or comma-separated. Duplicates are removed. The first 50 URLs in a paste are looked up.",
    process:
      "Each URL is parsed as a pin. Valid pins are fetched from the public pin-detail endpoint. Invalid links are flagged instead of failing the whole batch.",
    output: "A card per URL with image, title, saves, repins, domain, created date, and up to four annotations.",
    shot: "pin-stats",
    appPath: "/app/pin-stats",
    tables: [
      {
        title: "Details returned per pin",
        columns: [
          { name: "Title", meaning: "Published pin title, or Untitled pin." },
          { name: "Image", meaning: "Public pin image." },
          { name: "Saves", meaning: "Aggregated public save count." },
          { name: "Repins", meaning: "Public repin count." },
          { name: "Domain", meaning: "Destination website." },
          { name: "Created date", meaning: "Date Pinterest reports for the pin." },
          { name: "Annotations", meaning: "Topics Pinterest attached to the pin." },
          { name: "Destination link", meaning: "Outbound URL when present." },
        ],
      },
    ],
    extras: [
      {
        title: "Invalid URLs",
        body: "Links that are not Pinterest pin URLs are marked Not a pin URL and skipped. The rest of the batch still runs.",
      },
    ],
    actions: ["Get stats"],
    related: ["top-pins", "account-explorer", "lists"],
    planRowLabels: ["Pin Stats pins"],
  },
  {
    slug: "account-explorer",
    title: "Account Explorer",
    badge: "Analyze",
    headline: "Study the creators who keep showing up in your niche.",
    ctaTitle: "Explore creator accounts",
    decision: "Which accounts should I study for growth patterns?",
    lead: "Search creators by niche or @username, then open a full public profile with pins, boards, and audience stats.",
    input: "A username such as @creator, or a niche phrase such as gel nail ideas.",
    process:
      "Search returns matching public accounts. Opening a profile collects public pins and boards, then enriches pin titles, descriptions, engagement, links, dates, and board names.",
    output:
      "A search grid of creators, plus a profile workspace with audience metrics, a Pins tab, and a Boards tab.",
    shot: "account-explorer",
    appPath: "/app/account-explorer",
    tables: [
      {
        title: "Search results",
        columns: [
          { name: "Name", meaning: "Display name, falling back to @username." },
          { name: "Username", meaning: "Pinterest handle." },
          { name: "Description", meaning: "Public profile bio." },
          { name: "Monthly views", meaning: "Public monthly views when Pinterest exposes them." },
          { name: "Followers", meaning: "Public follower count." },
          { name: "Pins", meaning: "Public pin count." },
          { name: "Boards", meaning: "Public board count." },
        ],
      },
      {
        title: "Profile metrics",
        caption: "Shown after you open a creator. Pins and boards continue loading in the background.",
        columns: [
          { name: "Followers", meaning: "Public audience size." },
          { name: "Following", meaning: "Accounts this creator follows." },
          { name: "Monthly views", meaning: "When Pinterest publishes the figure." },
          { name: "Monthly reach", meaning: "When Pinterest publishes the figure." },
          { name: "Pins", meaning: "Account pin count, plus how many have been collected." },
          { name: "Boards", meaning: "Account board count, plus how many have been collected." },
        ],
      },
    ],
    extras: [
      {
        title: "Profile collection",
        body: "The first pass collects 100 pins and all public boards, then continues through remaining public pins. You can use the profile while collection runs.",
      },
      {
        title: "Pin enrichment",
        body: "Titles, descriptions, engagement statistics, links, dates, and board names appear as each pin is enriched.",
      },
    ],
    actions: ["Search accounts", "View profile", "Refresh profile", "Open Pinterest"],
    related: ["board-explorer", "top-pins", "projects"],
    planRowLabels: ["Account Explorer"],
  },
  {
    slug: "board-explorer",
    title: "Board Explorer",
    badge: "Analyze",
    headline: "Find the boards already collecting this topic.",
    ctaTitle: "Explore topical boards",
    decision: "Which boards are the strongest topical match?",
    lead: "Find the public Pinterest boards already collecting pins for a topic, then compare size, structure, and owner authority.",
    input: "A topic keyword.",
    process: "PinitGrow searches public boards for that topic and returns owner and volume metadata.",
    output: "A board table with pin counts, sections, owner, and follower counts, plus CSV export.",
    shot: "board-explorer",
    appPath: "/app/board-explorer",
    tables: [
      {
        title: "Results you see in the app",
        columns: [
          { name: "Board", meaning: "Cover, name, and description." },
          { name: "Pins", meaning: "How many pins the board holds." },
          { name: "Sections", meaning: "How many board sections Pinterest reports." },
          { name: "Owner", meaning: "Username and display name." },
          { name: "Owner Followers", meaning: "The owner’s public follower count." },
        ],
      },
      {
        title: "CSV export columns",
        columns: [
          { name: "Board", meaning: "Board name." },
          { name: "URL", meaning: "Public board URL." },
          { name: "Pins", meaning: "Pin count." },
          { name: "Sections", meaning: "Section count." },
          { name: "Owner", meaning: "Owner username." },
          { name: "Owner Name", meaning: "Owner display name." },
          { name: "Owner Followers", meaning: "Follower count." },
          { name: "Image", meaning: "Cover image URL." },
          { name: "Description", meaning: "Board description." },
        ],
      },
    ],
    extras: [],
    actions: ["Search", "Export CSV", "Open the board on Pinterest"],
    related: ["account-explorer", "top-pins", "projects"],
    planRowLabels: ["Board Explorer"],
  },
  {
    slug: "rank-tracker",
    title: "Rank Tracker",
    badge: "Track",
    headline: "Watch whether your domain is moving in the top 100.",
    ctaTitle: "Track a keyword rank",
    decision: "Are my SEO and Pin changes actually working?",
    lead: "Track where your domain appears in Pinterest’s top 100 for a keyword, with automatic daily checks and saved history.",
    input: "A keyword plus the website domain you want to monitor.",
    process:
      "Each tracker queues a search of Pinterest’s top 100. Automatic checks run daily at your local time. You can also snapshot now. History is kept for the days your plan allows.",
    output:
      "A tracker list with current position, status, and history. Positions outside the top 100 are reported as outside that depth.",
    shot: "rank-tracker",
    appPath: "/app/rank-tracker",
    tables: [
      {
        title: "Each tracked keyword",
        columns: [
          { name: "Keyword", meaning: "The query being monitored." },
          { name: "Website domain", meaning: "The domain whose ranking pins you care about." },
          {
            name: "Current position",
            meaning: "Best current rank in the top 100, Checking, Unavailable, or Outside top 100.",
          },
          { name: "Status", meaning: "Waiting in queue, Checking Pinterest, Check failed, or Up to date." },
          { name: "Last successful check", meaning: "When the last completed snapshot landed." },
          { name: "Next automatic check", meaning: "Scheduled daily run in your local time." },
          { name: "Checks saved", meaning: "How many history points this tracker has stored." },
        ],
      },
      {
        title: "History points",
        columns: [
          { name: "Checked at", meaning: "When that rank check ran." },
          { name: "Position", meaning: "Rank at that time, if the domain was in the top 100." },
          { name: "Pin ID", meaning: "The ranking pin captured for that check." },
          { name: "Current / Best / Change", meaning: "Summary against the previous successful point." },
        ],
      },
    ],
    extras: [
      {
        title: "Shared tracker pool",
        body: "Rank Tracker and Search Tracker share the same active-tracker and history-day limits on your plan.",
      },
      {
        title: "Email",
        body: "Optional email after a successful automatic run, configured under Profile.",
      },
    ],
    actions: ["Track keyword", "Snapshot now", "Open history", "Remove tracker", "Schedule & email"],
    related: ["search-tracker", "top-pins", "trends"],
    planRowLabels: ["Manual rank checks", "Active trackers", "Tracker history"],
  },
  {
    slug: "search-tracker",
    title: "Search Tracker",
    badge: "Track",
    headline: "Compare how a Pinterest search changes over time.",
    ctaTitle: "Track a Pinterest search",
    decision: "How is this search results page changing over time?",
    lead: "Save Pinterest’s top 100 for a keyword on a schedule, then compare which pins appear, move, or drop out.",
    input: "A keyword of at least two characters.",
    process:
      "Each run stores a ranking snapshot, then fills engagement metrics when they become available. Automatic checks run daily. Failed attempts are not stored as history.",
    output:
      "A tracker list plus snapshot history you can inspect pin by pin, including movement versus the previous snapshot.",
    shot: "search-tracker",
    appPath: "/app/search-tracker",
    tables: [
      {
        title: "Each tracked search",
        columns: [
          { name: "Keyword", meaning: "The Pinterest search being snapshotted." },
          { name: "Latest result set", meaning: "Pin count in the most recent successful snapshot." },
          { name: "Snapshots saved", meaning: "How many dated snapshots exist." },
          { name: "Status", meaning: "Queued, processing, up to date, or failed." },
          { name: "Last successful snapshot", meaning: "When the last stored run completed." },
          { name: "Next automatic check", meaning: "Scheduled daily snapshot." },
        ],
      },
      {
        title: "Snapshot pin table",
        columns: [
          { name: "Rank", meaning: "Position in that snapshot’s top 100." },
          { name: "Pin", meaning: "Title and thumbnail." },
          { name: "Movement", meaning: "How the pin moved versus the previous snapshot." },
          { name: "Saves", meaning: "Public saves when available." },
          { name: "Repins", meaning: "Public repins when available." },
          { name: "Score", meaning: "Pin score for that result." },
          { name: "Destination", meaning: "Outbound domain." },
        ],
      },
    ],
    extras: [
      {
        title: "Late engagement",
        body: "A snapshot is stored immediately. Engagement fields can fill in once, then that history point is frozen.",
      },
    ],
    actions: ["Track search", "Snapshot now", "Compare snapshot dates", "Remove tracker"],
    related: ["rank-tracker", "top-pins", "trends"],
    planRowLabels: ["Manual search checks", "Active trackers", "Tracker history"],
  },
  {
    slug: "trends",
    title: "Trends",
    badge: "Discover",
    headline: "Spot momentum before you commit a Pin to it.",
    ctaTitle: "Browse Pinterest trends",
    decision: "What should I publish before the trend peaks?",
    lead: "Compare Pinterest’s Spotlight, Growing searches, and Top searches for a region, then send a topic into Keyword Explorer or Top Pins.",
    input: "A region and a view: Spotlight, Growing searches, or Top searches. The catalog covers 26 regions.",
    process:
      "PinitGrow serves the daily public Pinterest Trends snapshot. Spotlight is save-based and currently published for United States, Canada, and Great Britain and Ireland. Growing and Top searches are available more widely.",
    output:
      "Ranked trend cards with growth rates, categories, related searches, example pins, and sparklines. Each topic can prefill Keyword Explorer or Top Pins.",
    shot: "trends",
    appPath: "/app/trends",
    tables: [
      {
        title: "Views",
        columns: [
          {
            name: "Spotlight",
            meaning: "What is trending based on Pin saves, shown in Pinterest’s published order. 5 signals.",
          },
          {
            name: "Growing searches",
            meaning: "Searches ranked by 90-day momentum, with weekly and monthly changes shown separately. 25 signals.",
          },
          {
            name: "Top searches",
            meaning: "The highest-volume Pinterest searches over the last 30 days. 25 signals.",
          },
        ],
      },
      {
        title: "Fields on a trend",
        columns: [
          { name: "Topic", meaning: "Keyword or trend name." },
          { name: "MoM growth", meaning: "Month-over-month change when Pinterest publishes it." },
          { name: "WoW growth", meaning: "Week-over-week search change on Growing/Top views." },
          { name: "Categories", meaning: "Where Pinterest says the topic is popular." },
          { name: "Related searches", meaning: "Nearby queries on Spotlight cards." },
          { name: "Example pins", meaning: "Up to three public pins for the Spotlight topic." },
          { name: "Sparkline", meaning: "Recent time-series values on Growing/Top cards." },
          { name: "Forecast", meaning: "Shown when Pinterest marks the trend as having a prediction." },
        ],
      },
    ],
    extras: [
      {
        title: "Freshness",
        body: "Snapshots refresh about every 24 hours. The UI shows the region, data-through date, and fetch time.",
      },
    ],
    actions: ["Change region", "Switch view", "Research in Keyword Explorer", "Research in Top Pins"],
    related: ["keyword-explorer", "top-pins", "search-tracker"],
    planRowLabels: [],
  },
  {
    slug: "projects",
    title: "Research Projects",
    badge: "Organize",
    headline: "Keep a full niche brief instead of a pile of tabs.",
    ctaTitle: "Build your first research project",
    decision: "How do I keep a full niche brief for my team?",
    lead: "Package a seed into a durable research snapshot: keywords, top 100 pins, ideas, boards, accounts, competitors, opportunity score, and creative intelligence.",
    input: "A project name and seed keyword. PinitGrow collects fresh keywords and top pins, then builds the rest automatically.",
    process:
      "The project stores a Top 100 pin package with the same match labels as Top Pins, plus ideas, leading boards, accounts, competing domains, an explainable opportunity score, and creative analysis.",
    output:
      "A tabbed workspace you can reopen anytime, with optional notes. Explorer tabs are temporary; a project is the durable package.",
    shot: "projects",
    appPath: "/app/projects",
    tables: [
      {
        title: "Project library",
        columns: [
          { name: "Name", meaning: "Your project title." },
          { name: "Seed keyword", meaning: "The niche this snapshot is built around." },
          { name: "Keywords / Pins / Ideas", meaning: "Counts captured in the package." },
          { name: "Opportunity score", meaning: "0–100 score with a confidence label." },
          { name: "Status", meaning: "Ready, processing, or failed." },
          { name: "Updated", meaning: "When the snapshot data was last collected." },
        ],
      },
      {
        title: "Workspace tabs",
        columns: [
          { name: "Overview", meaning: "Coverage, opportunity, and creative summary." },
          { name: "Keywords", meaning: "Keyword, group, search intent, popularity." },
          { name: "Top Pins", meaning: "Curated Top 100 with the same columns as Top Pins table view." },
          { name: "Ideas", meaning: "Top 30 ideas with volume, occurrences, positions, category, relevance." },
          { name: "Boards", meaning: "Leading boards plus competing domains." },
          { name: "Accounts", meaning: "Creators with ranking pins, follower counts, and profile links." },
          { name: "Opportunity Score", meaning: "Explainable components, confidence coverage, strengths and risks." },
          { name: "Creative Intelligence", meaning: "Canvas, format, copy length, color, CTAs, and measured image signals." },
          { name: "Notes", meaning: "Your conclusions and next steps." },
        ],
      },
      {
        title: "Competing domains",
        columns: [
          { name: "Domain", meaning: "Destination website appearing in the top results." },
          { name: "Ranking pins", meaning: "How many top pins point there." },
          { name: "Best position", meaning: "Best Pinterest rank for that domain." },
          { name: "Median engagement", meaning: "Median engagement across those ranking pins." },
        ],
      },
    ],
    extras: [
      {
        title: "Top 100 package",
        body: "Standalone Top Pins can collect more than 100 results. A project keeps the first 100 after the pin-detail pass, ordered by original Pinterest position.",
      },
      {
        title: "Creative blueprint",
        body: "Creative Intelligence reports canvas, primary format, title/description character targets, seed-term rate in titles, CTA rate, aspect ratios, color families, and optional Azure pixel analysis.",
      },
    ],
    actions: ["Create project", "Open workspace", "Add notes", "Delete project"],
    related: ["keyword-explorer", "top-pins", "ideas", "lists"],
    planRowLabels: ["Project collections", "Stored projects"],
  },
  {
    slug: "lists",
    title: "Saved Lists",
    badge: "Organize",
    headline: "Save the keywords and Pins you actually intend to ship.",
    ctaTitle: "Start a saved list",
    decision: "Which keywords and pins should I brief next?",
    lead: "Keep the keywords and pins you want to ship. Explorer work is temporary; lists persist after a refresh.",
    input: "A list name and type — Keywords or Pins — then Save from Keyword Explorer or pin tools.",
    process: "Each list is a named bucket. Saving from an explorer adds the item and its metadata to that list.",
    output: "Reusable keyword and pin collections you can reopen anytime.",
    shot: "lists",
    appPath: "/app/lists",
    tables: [
      {
        title: "Each list",
        columns: [
          { name: "Name", meaning: "The collection title you chose." },
          { name: "Type", meaning: "Keywords or Pins." },
          { name: "Item count", meaning: "How many saved items are in the list." },
        ],
      },
      {
        title: "Saved items",
        columns: [
          { name: "Item", meaning: "The keyword text or pin reference." },
          { name: "Type", meaning: "Keyword or pin." },
          {
            name: "Metadata",
            meaning: "For keywords this can include popularity, volume, group, and intent from the explorer.",
          },
        ],
      },
    ],
    extras: [
      {
        title: "What lists are not",
        body: "Lists are not a full niche brief. Use Research Projects when you need keywords, pins, ideas, boards, and scores together.",
      },
    ],
    actions: ["Create list", "Save from an explorer", "Open a list", "Remove items or lists"],
    related: ["keyword-explorer", "top-pins", "projects"],
    planRowLabels: [],
  },
];

const pagesBySlug = new Map(featurePages.map((page) => [page.slug, page]));

export function getFeaturePage(slug: string): FeaturePage | undefined {
  return pagesBySlug.get(slug);
}

export function featurePath(slug: string): string {
  return `/features/${slug}`;
}

export function featureStaticParams(): { slug: string }[] {
  return featurePages.map((page) => ({ slug: page.slug }));
}

export function planLimitsForFeature(slug: string) {
  const page = getFeaturePage(slug);
  if (!page) return [];

  const creator = plans.find((plan) => plan.code === "basic");
  const professional = plans.find((plan) => plan.code === "pro");
  const studio = plans.find((plan) => plan.code === "studio");

  return page.planRowLabels.map((label) => ({
    label,
    creator: creator?.rows.find((row) => row.label === label)?.value ?? "—",
    professional: professional?.rows.find((row) => row.label === label)?.value ?? "—",
    studio: studio?.rows.find((row) => row.label === label)?.value ?? "—",
  }));
}
