export const productShots = {
  "keyword-explorer": {
    src: "/product/keyword-explorer.webp",
    alt: "PinitGrow Keyword Explorer showing A–Z suggestions, search intent, demand, and popularity for a home decor seed",
    width: 1920,
    height: 945,
  },
  keywords: {
    src: "/product/keyword-explorer.webp",
    alt: "PinitGrow Keyword Explorer showing A–Z suggestions, search intent, demand, and popularity for a home decor seed",
    width: 1920,
    height: 945,
  },
  "keywords-light": {
    src: "/product/keywords-light.png",
    alt: "Keyword Explorer results table with strong matches, search intent, and popularity scores",
    width: 1373,
    height: 833,
  },
  ideas: {
    src: "/product/ideas.webp",
    alt: "PinitGrow Ideas listing Pinterest topics, search volume, occurrences, and relevance",
    width: 1920,
    height: 945,
  },
  "top-pins": {
    src: "/product/top-pins.webp",
    alt: "PinitGrow Top Pins results with ranking pins, match labels, and engagement stats",
    width: 1920,
    height: 945,
  },
  "pin-stats": {
    src: "/product/pin-stats.webp",
    alt: "PinitGrow Pin Stats showing public saves, repins, destinations, and annotations",
    width: 1920,
    height: 945,
  },
  "account-explorer": {
    src: "/product/account-explorer.webp",
    alt: "PinitGrow Account Explorer showing creator profiles, audience stats, and public pins",
    width: 1920,
    height: 945,
  },
  "board-explorer": {
    src: "/product/board-explorer.webp",
    alt: "PinitGrow Board Explorer listing topical boards, pin counts, and owners",
    width: 1920,
    height: 945,
  },
  "rank-tracker": {
    src: "/product/rank-tracker.webp",
    alt: "PinitGrow Rank Tracker monitoring keyword positions for a domain over time",
    width: 1920,
    height: 945,
  },
  "search-tracker": {
    src: "/product/search-tracker.webp",
    alt: "PinitGrow Search Tracker comparing Pinterest search snapshots over time",
    width: 1920,
    height: 945,
  },
  trends: {
    src: "/product/trends.webp",
    alt: "PinitGrow Trends showing Spotlight, growing searches, and top search momentum",
    width: 1920,
    height: 945,
  },
  projects: {
    src: "/product/research-projects.webp",
    alt: "PinitGrow Research Projects workspace with a saved niche research snapshot",
    width: 1920,
    height: 945,
  },
  lists: {
    src: "/product/saved-lists.webp",
    alt: "PinitGrow Saved Lists showing named keyword and pin collections",
    width: 1920,
    height: 945,
  },
} as const;

export type ProductShotKey = keyof typeof productShots;
export type ProductShotName = ProductShotKey | "placeholder";

export function getProductShot(name: ProductShotName) {
  if (name === "placeholder") return null;
  return productShots[name];
}
