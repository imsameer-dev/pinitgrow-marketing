import { expect, test } from "@playwright/test";

test("contact form submits once, confirms success and supports another enquiry", async ({ page }) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route("https://api.web3forms.com/submit", async (route) => {
    requests++;
    const payload = route.request().postDataJSON();
    expect(payload.access_key).toBeTruthy();
    expect(payload.email).toBe("test@example.com");
    expect(payload.topic).toBe("Product support");
    expect(payload.message).toBe("Help with my research project.");
    expect(payload.botcheck).toBe(false);
    await gate;
    await route.fulfill({ json: { success: true } });
  });
  await page.goto("/contact");
  await expect(page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByLabel("Your name", { exact: true }).fill("Test User");
  await page.getByLabel("Email address", { exact: true }).fill("test@example.com");
  await page.getByLabel("What can we help with?").selectOption("Product support");
  await page.getByLabel("Your message", { exact: true }).fill("Help with my research project.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  release();
  await expect(page.getByRole("status")).toContainText("Message sent. Thank you!");
  expect(requests).toBe(1);
  await page.getByRole("button", { name: "Send another message" }).click();
  await expect(page.getByLabel("Your message", { exact: true })).toHaveValue("");
});

test("invalid fields do not submit, and rejected or offline submissions keep the message", async ({ page }) => {
  let attempts = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    attempts++;
    if (attempts === 1) await route.fulfill({ status: 400, json: { success: false } });
    else await route.abort("failed");
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  expect(attempts).toBe(0);
  await page.getByLabel("Your name", { exact: true }).fill("Test User");
  await page.getByLabel("Email address", { exact: true }).fill("test@example.com");
  await page.getByLabel("What can we help with?").selectOption("Plans & billing");
  await page.getByLabel("Your message", { exact: true }).fill("Please keep this message on failure.");
  for (const attempt of [1, 2]) {
    await page.getByRole("button", { name: "Send message", exact: true }).click();
    await expect(page.getByRole("form", { name: "Contact PinitGrow" }).getByRole("alert")).toContainText("Your details are still here");
    await expect(page.getByLabel("Your message", { exact: true })).toHaveValue("Please keep this message on failure.");
    expect(attempts).toBe(attempt);
    await expect(page.getByRole("status")).toHaveCount(0);
  }
});

test("contact layout and navigation work on desktop and mobile", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1050 });
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Better support.");
    await expect(page.getByRole("button", { name: "Send message", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.screenshot({ path: `e2e/contact-${width}.png`, fullPage: true });
    if (width === 390) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Contact", exact: true })).toBeVisible();
    }
  }
});
