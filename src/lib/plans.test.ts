import { describe, expect, it } from "vitest";
import { plans, trialDays } from "./plans";

describe("plans", () => {
  it("matches live Laravel prices, names, and codes", () => {
    expect(trialDays).toBe(3);
    expect(plans.map((p) => [p.code, p.name, p.priceLabel])).toEqual([
      ["creator", "Creator", "$9.99"],
      ["professional", "Professional", "$29.99"],
      ["studio", "Studio", "$85.99"],
    ]);
    expect(plans.find((p) => p.code === "professional")?.featured).toBe(true);
  });

  it("lists the live Laravel entitlements", () => {
    const creator = plans[0];
    expect(creator.rows.map((r) => r.label)).toEqual([
      "Keyword Explorer",
      "Ideas searches",
      "Top Pins searches",
      "Pin Stats scans",
      "Account Explorer",
      "Board Explorer",
      "New research projects",
      "Rank Tracker",
      "Search Tracker",
      "Maximum pins/search",
      "Stored projects",
      "Active trackers",
      "Tracker history",
    ]);
    expect(creator.rows.map((r) => r.value)).toEqual([
      "20/day",
      "5/day",
      "3/day",
      "5/day",
      "5/day",
      "5/day",
      "2/day",
      "5/day",
      "5/day",
      "100",
      "10",
      "5",
      "30 days",
    ]);
  });
});
