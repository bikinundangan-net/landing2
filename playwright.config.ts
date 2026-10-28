import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000", headless: true, trace: "retain-on-failure" },
});
