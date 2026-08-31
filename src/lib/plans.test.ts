import { describe, expect, it } from "vitest";
import { plans } from "./plans";

describe("plans", () => {
  it("matches live Laravel prices and codes", () => {
    expect(plans.map((p) => [p.code, p.priceLabel])).toEqual([
      ["creator", "$9.99"],
      ["professional", "$29.99"],
      ["studio", "$85.99"],
    ]);
    expect(plans.find((p) => p.code === "professional")?.featured).toBe(true);
  });

  it("lists the same comparison rows as the Nuxt plans page", () => {
    const creator = plans[0];
    expect(creator.rows.map((r) => r.label)).toEqual([
      "Keyword Explorer",
      "Ideas searches",
      "Top Pins searches",
      "Pin Stats scans",
      "Account Explorer",
      "Board Explorer",
      "New research projects",
      "Maximum pins/search",
      "Stored projects",
      "Active trackers",
      "Tracker history",
    ]);
    expect(creator.rows[0]?.value).toBe("20/day");
  });
});
