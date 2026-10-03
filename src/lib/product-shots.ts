// Change the URL when replacing assets so optimized-image caches reload them.
const heroImageVersion = "hero-20261003";

export const productShots = {
  "keyword-explorer": {
    src: `/product/keyword-explorer.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Keyword Explorer showing keyword suggestions, search intent, mapped Idea demand, and popularity for Holiday Party Hairstyles",
    width: 1586,
    height: 992,
  },
  keywords: {
    src: `/product/keyword-explorer.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Keyword Explorer showing keyword suggestions, search intent, mapped Idea demand, and popularity for Holiday Party Hairstyles",
    width: 1586,
    height: 992,
  },
  "keywords-light": {
    src: "/product/keywords-light.png",
    alt: "Keyword Explorer results table with strong matches, search intent, and popularity scores",
    width: 1373,
    height: 833,
  },
  ideas: {
    src: `/product/ideas.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Ideas listing Pinterest topics, search volume, occurrences, and relevance",
    width: 1586,
    height: 992,
  },
  "top-pins": {
    src: `/product/top-pins.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Top Pins results with ranking pins, match labels, and engagement stats",
    width: 1586,
    height: 992,
  },
  "pin-stats": {
    src: `/product/pin-stats.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Pin Stats showing public saves, repins, destinations, and annotations",
    width: 1586,
    height: 992,
  },
  "account-explorer": {
    src: `/product/account-explorer.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Account Explorer showing creator profiles, audience stats, and public pins",
    width: 1586,
    height: 992,
  },
  "board-explorer": {
    src: `/product/board-explorer.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Board Explorer listing topical boards, pin counts, and owners",
    width: 1586,
    height: 992,
  },
  "rank-tracker": {
    src: `/product/rank-tracker.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Rank Tracker monitoring keyword positions for a domain over time",
    width: 1586,
    height: 992,
  },
  "search-tracker": {
    src: `/product/search-tracker.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Search Tracker comparing Pinterest search snapshots over time",
    width: 1586,
    height: 992,
  },
  trends: {
    src: `/product/trends.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Trends showing Spotlight, growing searches, and top search momentum",
    width: 1586,
    height: 992,
  },
  projects: {
    src: `/product/research-projects.webp?v=${heroImageVersion}`,
    alt: "PinitGrow Research Projects workspace with a saved niche research snapshot",
    width: 1586,
    height: 992,
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
