import { expect, test } from "@playwright/test";

test("monthly pricing is consistent and readable on desktop and mobile", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/pricing");
    const cards = page.locator(".pricing-plan");
    await expect(cards).toHaveCount(3);
    for (const [index, name, price] of [[0, "Basic", "$9.99"], [1, "Pro", "$25"], [2, "Studio", "$80"]] as const) {
      await expect(cards.nth(index).getByRole("heading", { name, exact: true })).toBeVisible();
      await expect(cards.nth(index)).toContainText(price);
    }
    await expect(page.getByRole("table")).toContainText("1,800/month");
    await expect(page.getByRole("table")).toContainText("6,000/month");
    await expect(page.getByRole("table")).toContainText("Unlimited");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.screenshot({ path: `e2e/pricing-new-${width}.png`, fullPage: true });
  }
});
