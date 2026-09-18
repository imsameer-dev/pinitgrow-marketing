import { expect, test } from "@playwright/test";

test("home explains the product and hands off signup to the app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pinterest data");
  await expect(page.getByRole("heading", { name: /Everything you need/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Basic", exact: true })).toBeVisible();
  await expect(page.getByText("$10").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Start Free Trial/ }).first()).toHaveAttribute("href", "https://app.pinitgrow.com/register");
  await expect(page.getByRole("link", { name: "Log in" }).first()).toHaveAttribute("href", "https://app.pinitgrow.com/login");
  const launchBuff = page.getByRole("link", { name: "Featured on LaunchBuff" });
  await expect(launchBuff).toHaveAttribute("href", "https://launchbuff.com/products/pinitgrow-pbdwfv");
  await expect(launchBuff.getByRole("img")).toHaveAttribute("src", "https://launchbuff.com/badge-featured-dark.svg");
  await expect(page.locator(".directory-links a")).toHaveCount(11);
});

test("product tour supports pointer and keyboard selection", async ({ page }) => {
  await page.goto("/");
  const keywordTab = page.getByRole("tab", { name: "Find your next keyword" });
  await keywordTab.click();
  await expect(keywordTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").getByRole("img")).toHaveAttribute("alt", /Keyword Explorer/);
  await keywordTab.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Spot emerging trends" })).toBeFocused();
  await expect(page.getByRole("tabpanel").getByRole("img")).toHaveAttribute("alt", /Trends/);
  await page.getByRole("tab", { name: "Spot emerging trends" }).press("Home");
  await expect(page.getByRole("tab", { name: "Discover winning pins" })).toHaveAttribute("aria-selected", "true");
});

test("FAQs disclose answers and trial limits", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Is there a free trial?", { exact: true }).click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute("open", "");
  await page.getByText("What’s included in the free trial?").click();
  await expect(page.getByText(/Trial usage limits apply/)).toBeVisible();
});

test("mobile navigation opens, closes on Escape, and follows links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
});

test("responsive layouts stay within the viewport", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

const paths = ["/features", "/pricing", "/faq", "/about", "/contact", "/privacy", "/terms", "/refund", "/affiliate",
    ...["keyword-explorer", "top-pins", "pin-stats", "ideas", "account-explorer", "board-explorer", "rank-tracker", "search-tracker", "trends", "projects", "lists"].map((slug) => "/features/" + slug)];
for (const path of paths) {
  test(`route ${path} renders an accessible page`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), path).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 }), path).toHaveCount(1);
    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBeTruthy();
    }
  });
}
