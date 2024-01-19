import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  globalSetup: './global-setup.ts',
  testDir: './tests',
  timeout: 60 * 10000, //global test timeout - default is 30s
  expect: {timeout:10000}, //global assertion timeout - default is 5s

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', {  outputFile: 'json-results/test-results.json'}]
  ],
  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.edgewordstraining.co.uk/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    actionTimeout: 20000, //Set a global action timeout of 20s - similar to UFT behaviour
    screenshot: 'only-on-failure',
    video: 'on',
    launchOptions: {slowMo: 100},
    headless: false,
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'firefoxonly',
      testDir: './tests-firefox',
      use: { 
        ...devices['Desktop Firefox'],
        
      }
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
             },

    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
            headless: false

           },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Galaxy Tab S4'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'], headless: false },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', headless: false },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
