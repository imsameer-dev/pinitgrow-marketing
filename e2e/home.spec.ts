import { expect, test } from "@playwright/test";

test("home explains the product and hands off to the app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /keywords, pins, and rankings/i,
  );
  const trial = page.getByRole("link", { name: "Start free trial" }).first();
  await expect(trial).toHaveAttribute("href", "https://app.pinitgrow.com/register");
  await expect(page.getByRole("link", { name: "Log in" }).first()).toHaveAttribute(
    "href",
    "https://app.pinitgrow.com/login",
  );
  await expect(page.getByAltText(/Keyword Explorer/i)).toBeVisible();
});
