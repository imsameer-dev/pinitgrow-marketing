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

test("system theme renders with a light color scheme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => window.localStorage.setItem("theme", "system"));
  await page.goto("/");

  await expect(page.locator("body")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
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
  await page.addInitScript(() => {
    const observed = { mounted: false };
    Object.defineProperty(window, "__lenisObserved", { value: observed });

    const observeRoot = () => {
      const root = document.documentElement;
      if (!root) {
        requestAnimationFrame(observeRoot);
        return;
      }

      observed.mounted ||= root.classList.contains("lenis");
      new MutationObserver((mutations) => {
        observed.mounted ||= root.classList.contains("lenis");
        observed.mounted ||= mutations.some((mutation) =>
          mutation.oldValue?.split(/\s+/).includes("lenis"),
        );
      }).observe(root, {
        attributeFilter: ["class"],
        attributeOldValue: true,
      });
    };

    observeRoot();
  });
  await page.goto("/");

  expect(
    await page.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await expect(page.locator("html")).not.toHaveClass(/(^|\s)lenis(?:\s|$)/);
  expect(
    await page.evaluate(
      () =>
        (
          window as typeof window & {
            __lenisObserved: { mounted: boolean };
          }
        ).__lenisObserved.mounted,
    ),
  ).toBe(false);
});

test("keyboard focus is visible on primary controls", async ({ page }) => {
  await page.goto("/faq");

  const tabTo = async (target: ReturnType<typeof page.locator>) => {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      await page.keyboard.press("Tab");
      if (await target.evaluate((element) => element === document.activeElement)) {
        await expect(target).toBeFocused();
        return;
      }
    }
    throw new Error("Control was not reachable with the Tab key");
  };

  const themeToggle = page.getByRole("button", { name: /Color theme/i });
  await tabTo(themeToggle);
  await tabTo(page.getByRole("link", { name: "Log in" }).first());
  await tabTo(page.getByRole("link", { name: "Start free trial" }).first());

  const accordion = page.getByRole("button", {
    name: "How long is the trial?",
  });
  await tabTo(accordion);
  expect(
    await accordion.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.outlineStyle !== "none" || style.boxShadow !== "none";
    }),
  ).toBe(true);

  await page.keyboard.press("Enter");
  await expect(accordion).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Space");
  await expect(accordion).toHaveAttribute("aria-expanded", "false");
});
