import { describe, expect, it } from "vitest";
import { plans, trialDays } from "./plans";
import { featurePages, planLimitsForFeature } from "./feature-pages";

describe("pricing catalog", () => {
  it("advertises the requested monthly prices", () => {
    expect(trialDays).toBe(3);
    expect(plans.map((p) => [p.code, p.name, p.priceLabel])).toEqual([
      ["basic", "Basic", "$9.99"], ["pro", "Pro", "$25"], ["studio", "Studio", "$80"],
    ]);
    expect(plans.find((p) => p.featured)?.code).toBe("pro");
  });

  it("provides 3x and 10x monthly credits without multiplying every batch size", () => {
    const value = (index: number, label: string) => plans[index].rows.find((r) => r.label === label)?.value;
    for (const row of plans[0].rows.filter((r) => r.value.endsWith("/month"))) {
      const baseline = Number(row.value.replaceAll(",", "").replace("/month", ""));
      expect(value(1, row.label)).toBe(`${(baseline * 3).toLocaleString("en-US")}/month`);
      expect(value(2, row.label)).toBe(`${(baseline * 10).toLocaleString("en-US")}/month`);
    }
    expect(plans.map((_, i) => value(i, "Maximum pins/search"))).toEqual(["100", "300", "500"]);
    expect(plans.map((_, i) => value(i, "Active trackers"))).toEqual(["5", "15", "50"]);
    expect(plans.map((_, i) => value(i, "Exports & cached results"))).toEqual(["Unlimited", "Unlimited", "Unlimited"]);
  });

  it("resolves every feature comparison row to a published entitlement", () => {
    for (const page of featurePages) {
      for (const row of planLimitsForFeature(page.slug)) {
        expect(row.creator, `${page.slug}: ${row.label}`).not.toBe("—");
        expect(row.professional, `${page.slug}: ${row.label}`).not.toBe("—");
        expect(row.studio, `${page.slug}: ${row.label}`).not.toBe("—");
      }
    }
  });
});
