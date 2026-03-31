import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 * 
 * This configuration is optimized for end-to-end tests that require
 * a full application setup and browser environment.
 */
export default defineConfig({
  // Look for E2E test files in the tests directory
  testDir: './tests',
  
  // Run tests in parallel for faster execution
  fullyParallel: true,
  
  // Fail CI if any test has .only
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,
  
  // Limit workers in CI to avoid resource contention
  workers: process.env.CI ? 1 : undefined,
  
  // Use HTML reporter for visual test results
  reporter: 'html',
  
  // Configure test behavior
  use: {
    // Base URL for the running application
    baseURL: 'http://localhost:5173',
    
    // Enable tracing on first retry for debugging
    trace: 'on-first-retry',
  },
  
  // Configure browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add more browsers as needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  
  // Configure web server for E2E tests
  webServer: {
    command: 'bs/localhost.js --silent --ws',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes for server startup
  },
});