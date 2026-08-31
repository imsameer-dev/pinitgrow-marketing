import { expect, test } from "@playwright/test";

test("features lists Keyword Explorer", async ({ page }) => {
  await page.goto("/features");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/every research tool/i);
  await expect(page.getByRole("heading", { name: "Keyword Explorer" })).toBeVisible();
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
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu.getByRole("link", { name: "Features", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Pricing", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "FAQ", exact: true })).toBeVisible();
});
