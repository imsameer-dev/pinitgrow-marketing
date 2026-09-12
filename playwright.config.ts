import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "e2e",
  webServer: {
    command: "npx next dev --port 3000",
    url: baseURL,
    reuseExistingServer: true,
    env: { NEXT_PUBLIC_APP_URL: "https://app.pinitgrow.com" },
  },
  timeout: 60000,
  use: { baseURL, launchOptions: { channel: process.env.PLAYWRIGHT_CHANNEL } },
});
