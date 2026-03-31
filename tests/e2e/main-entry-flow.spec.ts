import { test, expect } from "@playwright/test";

test.describe("Main Entry Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should load main entry page", async ({ page }) => {
		await expect(page).toHaveURL("/");
		await expect(page.getByRole("heading", { name: "FACILITATOR" })).toBeVisible();
	});

	test("should show password form by default", async ({ page }) => {
		const passwordInput = page.getByLabel("Password");
		const connectButton = page.getByRole("button", { name: /connect/i });
		
		await expect(passwordInput).toBeVisible();
		await expect(connectButton).toBeVisible();
	});

	test("should have proper page structure", async ({ page }) => {
		// Check for main heading
		await expect(page.getByRole("heading", { name: "FACILITATOR" })).toBeVisible();
		
		// Check for subtitle
		await expect(page.getByRole("heading", { name: "CIS FOUNDATION" })).toBeVisible();
		
		// Check for password input
		await expect(page.getByLabel("Password")).toBeVisible();
		
		// Check for connect button
		await expect(page.getByRole("button", { name: /connect/i })).toBeVisible();
	});

	test("should handle page navigation", async ({ page }) => {
		// Verify we're on the main page
		await expect(page).toHaveURL("/");
		
		// Check that the page has some content
		const pageContent = await page.textContent("body");
		expect(pageContent.length).toBeGreaterThan(100);
	});
});