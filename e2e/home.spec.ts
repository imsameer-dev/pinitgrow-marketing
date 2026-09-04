import { expect, test } from "@playwright/test";

test("home conversion landing renders and hands off to the app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pinterest");
  await expect(page.getByRole("heading", { name: /Everything you need/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Keyword Explorer" })).toBeVisible();
  await expect(page.getByText("Decision: What keywords should I target next?")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Creator" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Search Tracker" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Saved Lists" })).toBeVisible();
  await expect(page.getByText("$9.99").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Start Free Trial/i }).first()).toHaveAttribute(
    "href",
    "https://app.pinitgrow.com/register",
  );
  await expect(page.getByRole("link", { name: "Log in" }).first()).toHaveAttribute(
    "href",
    "https://app.pinitgrow.com/login",
  );
});

test("inner pages are live", async ({ page }) => {
  for (const path of ["/features", "/pricing", "/faq", "/about", "/contact", "/privacy", "/terms", "/refund", "/affiliate"]) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
  }
});
