import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
process.env.ENV = `prod`
const ENV = process.env.ENV;
console.log('ENV is: ' + process.env.ENV);

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`, `prod`].includes(ENV)) {
  console.log(`Please provide a correct environment value like "npx cross-env ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  //Global Setup to run before all tests
  globalSetup: `./global-setup`,
  //Global Teardown to run after all tests
  globalTeardown: `./global-teardown.ts`,
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 5000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 1200000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  //grep: [new RegExp('@debug')],
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    //['./reporters/CustomReport.ts'],
    ['html']
    //['junit', {outputFile: 'test-results.xml', open: 'never'}],
    //['json', {  outputFile: 'test-results.json' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 1200000,
    navigationTimeout:1200000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'off',
    baseURL: ENV === `qa` ? 'https://www-qa.polarisindcms.com/' : 'https://www.polaris.com/',
    headless: true,
  },
  
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome']
     },
    }
    
    /* {
      name: 'iOS',
      use: { ...devices['Desktop Safari'] },
    } */
    

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
