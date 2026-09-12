import { describe, expect, it } from "vitest";
import {
  featurePages,
  featurePath,
  featureStaticParams,
  getFeaturePage,
  planLimitsForFeature,
} from "./feature-pages";
import { productShots } from "./product-shots";
import { features } from "./site";
import { plans } from "./plans";

const expectedSlugs = [
  "keyword-explorer",
  "ideas",
  "top-pins",
  "pin-stats",
  "account-explorer",
  "board-explorer",
  "rank-tracker",
  "search-tracker",
  "trends",
  "projects",
  "lists",
] as const;

describe("featurePages", () => {
  it("covers every live research tool on its own slug", () => {
    expect(featurePages.map((page) => page.slug)).toEqual([...expectedSlugs]);
    expect(featureStaticParams()).toEqual(expectedSlugs.map((slug) => ({ slug })));
  });

  it("matches the homepage feature ids so hub and home stay in sync", () => {
    expect(features.map((feature) => feature.id).sort()).toEqual(
      [...expectedSlugs].sort(),
    );
  });

  it("returns undefined for an unknown slug", () => {
    expect(getFeaturePage("not-a-tool")).toBeUndefined();
  });

  it("builds a dedicated marketing path for each slug", () => {
    expect(featurePath("keyword-explorer")).toBe("/features/keyword-explorer");
  });

  it("documents Keyword Explorer with the live result columns", () => {
    const page = getFeaturePage("keyword-explorer");
    expect(page?.appPath).toBe("/app/keywords");
    expect(page?.tables[0]?.columns.map((column) => column.name)).toEqual([
      "Keyword",
      "Search intent",
      "Pinterest demand",
      "Popularity",
    ]);
  });

  it("documents Top Pins table columns from the live workspace", () => {
    const page = getFeaturePage("top-pins");
    expect(page?.appPath).toBe("/app/top-pins");
    expect(page?.tables[0]?.columns.map((column) => column.name)).toEqual([
      "Pin",
      "Match",
      "Relevance score",
      "Pin score",
      "Pinterest rank",
      "Created At",
      "Appearances",
      "Saves",
      "Repins",
      "Reactions",
      "Comments",
      "Is Repin",
      "Tagged topics",
      "Description",
    ]);
  });

  it("uses a live screenshot for every research tool", () => {
    for (const page of featurePages) {
      expect(page.shot in productShots).toBe(true);
      expect(features.find((feature) => feature.id === page.slug)?.shot).toBe(page.shot);
    }
  });

  it("gives Keyword Explorer a decision-led headline", () => {
    expect(getFeaturePage("keyword-explorer")?.headline).toMatch(/seed/i);
  });

  it("pulls plan limits from the live catalog instead of inventing numbers", () => {
    const rows = planLimitsForFeature("keyword-explorer");
    expect(rows).toEqual([
      {
        label: "Keyword Explorer",
        creator: "20/day",
        professional: "40/day",
        studio: "100/day",
      },
    ]);
    expect(plans[0]?.rows.find((row) => row.label === "Keyword Explorer")?.value).toBe(
      "20/day",
    );
  });
});
