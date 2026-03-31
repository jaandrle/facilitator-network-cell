import { test, expect } from "@playwright/test";

test.describe("Basic Navigation", () => {
	test("should load the main page", async ({ page }) => {
		// Navigate to the main page
		await page.goto("/");
		
		// Verify the page loads successfully
		await expect(page).toHaveURL("/");
		
		// Check that some content is visible (basic smoke test)
		const mainHeading = page.getByRole("heading", { name: "FACILITATOR" });
		await expect(mainHeading).toBeVisible();
	});

	test("should show password form initially", async ({ page }) => {
		await page.goto("/");
		
		// Check for password input field
		const passwordInput = page.getByLabel("Password");
		await expect(passwordInput).toBeVisible();
		
		// Check for connect button
		const connectButton = page.getByRole("button", { name: /connect/i });
		await expect(connectButton).toBeVisible();
	});
});