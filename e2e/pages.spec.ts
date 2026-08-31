import { expect, test } from "@playwright/test";

test("features lists Keyword Explorer", async ({ page }) => {
  await page.goto("/features");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/every research tool/i);
  await expect(page.getByRole("heading", { name: "Keyword Explorer" })).toBeVisible();
});

test("routes expose distinct metadata", async ({ page }) => {
  const routes = [
    {
      path: "/",
      title: /PinitGrow.*Pinterest research/i,
      description: /keyword explorer/i,
    },
    {
      path: "/features",
      title: /Features.*PinitGrow/i,
      description: /Pinterest research tools/i,
    },
    {
      path: "/pricing",
      title: /Pricing.*PinitGrow/i,
      description: /plans/i,
    },
    {
      path: "/faq",
      title: /FAQ.*PinitGrow/i,
      description: /trial/i,
    },
  ];

  for (const route of routes) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
  }
});

test("product frames identify placeholder pixels and use real dimensions", async ({
  page,
}) => {
  await page.goto("/features");

  const rankTracker = page
    .getByRole("heading", { name: "Rank Tracker" })
    .locator("xpath=ancestor::section");
  await expect(rankTracker.getByText("app.pinitgrow.com/app/rank-tracker")).toBeVisible();
  const placeholder = rankTracker.getByAltText(
    "Keyword Explorer interface (placeholder for Rank Tracker)",
  );
  await expect(placeholder).toHaveAttribute("width", "1373");
  await expect(placeholder).toHaveAttribute("height", "833");
});

test("pricing shows live plan prices", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByText("$9.99")).toBeVisible();
  await expect(page.getByText("$29.99")).toBeVisible();
  await expect(page.getByText("$85.99")).toBeVisible();
  await expect(page.getByRole("link", { name: "Start free trial" }).first()).toHaveAttribute(
    "href",
    "https://app.pinitgrow.com/register",
  );
});

test("faq includes trial length", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.getByText("3-day trial", { exact: false })).toBeVisible();
});

test("unknown routes show the custom 404", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
});

test("mobile header exposes site navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: /Color theme (system|light|dark)\./i }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  const featuresLink = menu.getByRole("link", { name: "Features", exact: true });
  await expect(featuresLink).toBeVisible();
  await expect(menu.getByRole("link", { name: "Pricing", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "FAQ", exact: true })).toBeVisible();
  expect((await featuresLink.boundingBox())?.height).toBeGreaterThanOrEqual(40);

  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
});
