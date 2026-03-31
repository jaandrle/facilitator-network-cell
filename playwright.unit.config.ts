import { defineConfig, devices } from "@playwright/experimental-ct-react";
import { loadEnv } from "vite";
import { fileURLToPath } from "url";

import { config } from "./bs/helpers/.config.js";
const fromEnv = Object.fromEntries(
	Object.entries(loadEnv("development", process.cwd(), "VITE_"))
		.map(([k, v]) => [k.slice(5), v])
);
export default defineConfig({
	testDir: "./src/",
	"testMatch": "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
	/* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
	snapshotDir: "./__snapshots__",
	/* Maximum time one test can run for. */
	timeout: 10 * 1000,
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",

		/* Port to use for Playwright component endpoint. */
		ctPort: 3100,

		ctViteConfig: {
			define: { VITE: { config, ...fromEnv } },
			resolve: {
				alias: {
					"@": fileURLToPath(new URL("./src", import.meta.url)),
				},
			},
		}
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
			command: "bs/dev/ws.js --silent",
			reuseExistingServer: !process.env.CI,
	},
});
