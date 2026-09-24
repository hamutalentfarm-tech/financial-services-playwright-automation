import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Central Playwright configuration.
 * Base URL, timeouts, retries, and reporting are externalized via environment
 * variables (see .env.example) rather than hard-coded, per automation best
 * practices in the Technical Environment & Automation Framework document.
 */
export default defineConfig({
  testDir: './tests',
  // 30s default matches the Lab Guide's example configuration pattern (section 6),
  // since the shared lab VM can be slower than a dedicated CI runner.
  timeout: Number(process.env.DEFAULT_TIMEOUT_MS ?? 30000),
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? Number(process.env.RETRIES ?? 2) : Number(process.env.RETRIES ?? 0),
  // workers: process.env.CI ? 2 : undefined,
  workers: 1,

  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['list'],
  ],

  outputDir: 'test-artifacts',

  use: {
    // FINSERVE_BASE_URL follows the lab guide's suggested env var naming
    // (section 5); BASE_URL is kept as a fallback for compatibility.
    baseURL: process.env.FINSERVE_BASE_URL ?? process.env.BASE_URL ?? 'http://8.234.70.115:8082',
    headless: process.env.HEADLESS !== 'false',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',

    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 7'] },
    // },
    // {
    //   // API-only project: no browser needed, faster execution.
    //   name: 'api',
    //   testDir: './tests/api',
    //   use: {
    //     baseURL: process.env.API_BASE_URL ?? 'http:///api',
    //   },
    // },
  ],
});
