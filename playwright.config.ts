import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  webServer: {
    command: "npx next dev --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_APP_URL: "https://app.pinitgrow.com" },
  },
  use: { baseURL: "http://127.0.0.1:3100" },
});
