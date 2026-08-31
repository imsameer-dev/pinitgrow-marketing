import { expect, test } from "@playwright/test";
import path from "node:path";

const routes = [
  { path: "/", name: "home" },
  { path: "/features", name: "features" },
  { path: "/pricing", name: "pricing" },
  { path: "/faq", name: "faq" },
] as const;

const themes = ["light", "dark"] as const;
const widths = [375, 768, 1024, 1440] as const;
const screenshotWidths = new Set([375, 1440]);
const screenshotDirectory = path.resolve(".superpowers", "sdd", "screenshots");

for (const theme of themes) {
  for (const width of widths) {
    test(`${theme} marketing pages render at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript((selectedTheme) => {
        window.localStorage.setItem("theme", selectedTheme);
      }, theme);

      for (const route of routes) {
        await page.goto(route.path);

        await expect(page.locator("html")).toHaveClass(
          theme === "dark" ? /(^|\s)dark(\s|$)/ : /^(?!.*(?:^|\s)dark(?:\s|$))/,
        );

        const trialLinks = page.getByRole("link", { name: "Start free trial" });
        expect(await trialLinks.count()).toBeGreaterThan(0);
        for (const link of await trialLinks.all()) {
          await expect(link).toHaveAttribute(
            "href",
            "https://app.pinitgrow.com/register",
          );
        }

        const loginLinks = page.getByRole("link", { name: "Log in" });
        expect(await loginLinks.count()).toBeGreaterThan(0);
        for (const link of await loginLinks.all()) {
          await expect(link).toHaveAttribute(
            "href",
            "https://app.pinitgrow.com/login",
          );
        }

        const viewport = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
        }));
        expect(viewport.documentWidth).toBeLessThanOrEqual(viewport.viewportWidth);

        if (screenshotWidths.has(width)) {
          await page.screenshot({
            fullPage: true,
            path: path.join(
              screenshotDirectory,
              `${route.name}-${theme}-${width}.png`,
            ),
          });
        }
      }
    });
  }
}

test("theme control cycles system, light, and dark", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("theme", "system"));
  await page.goto("/");

  await page.getByRole("button", { name: /Color theme system/i }).click();
  await expect(
    page.getByRole("button", { name: /Color theme light/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Color theme light/i }).click();
  await expect(
    page.getByRole("button", { name: /Color theme dark/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Color theme dark/i }).click();
  await expect(
    page.getByRole("button", { name: /Color theme system/i }),
  ).toBeVisible();
});

test("home loads its hero product image eagerly", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByAltText(/Keyword Explorer/i)).toHaveAttribute(
    "loading",
    "eager",
  );
});

test("features loads its leading product image eagerly", async ({ page }) => {
  await page.goto("/features");

  await expect(page.getByAltText(/Keyword Explorer/i).first()).toHaveAttribute(
    "loading",
    "eager",
  );
});

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  expect(
    await page.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await expect(page.locator("html")).not.toHaveClass(/(^|\s)lenis(?:\s|$)/);
});

test("keyboard focus is visible on primary controls", async ({ page }) => {
  await page.goto("/faq");

  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
  expect(
    await focused.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.outlineStyle !== "none" || style.boxShadow !== "none";
    }),
  ).toBe(true);

  const accordion = page.getByRole("button", {
    name: "How long is the trial?",
  });
  await accordion.focus();
  await expect(accordion).toBeFocused();
  expect(
    await accordion.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.outlineStyle !== "none" || style.boxShadow !== "none";
    }),
  ).toBe(true);
});
