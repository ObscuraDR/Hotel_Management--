import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5173";

export default defineConfig({
  testDir: "e2e",
  timeout: 90_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    viewport: { width: 1280, height: 800 },
    trace: "on-first-retry",
    video: "off",
  },
  webServer: [
    {
      command: "php -S 127.0.0.1:8000",
      cwd: "api",
      url: "http://127.0.0.1:8000/dashboard.php",
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: "npx vite --host 127.0.0.1 --port 5173 --strictPort",
      url: "http://127.0.0.1:5173/",
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
