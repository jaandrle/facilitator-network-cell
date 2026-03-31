import { test, expect } from "@playwright/experimental-ct-react";
import { LayoutEntry } from "./layout";
import {LayoutEntryChangeTest} from "./__components";

test.describe("LayoutEntry Component", () => {
	test("should render layout with given props", async ({ mount }) => {
		const component = await mount(
			<LayoutEntry title="Test Title" subtitle="Test Subtitle">
				<div>Child Content</div>
			</LayoutEntry>,
		);

		component.getByRole("heading", { name: "Test Title" });
		await expect(component).toContainText("Test Subtitle");
		await expect(component).toContainText("Child Content");
	});

	test("should display all required elements", async ({ mount }) => {
		const component = await mount(
			<LayoutEntry title="Test Title" subtitle="Test Subtitle">
				<div>Child Content</div>
			</LayoutEntry>,
		);

		const titleHeading = component.getByRole("heading", { name: "Test Title" });
		await expect(titleHeading).toBeVisible();
		const subtitle = component.getByText("Test Subtitle");
		await expect(subtitle).toBeVisible();
		const contentContainer = component.locator("div").filter({ hasText: "Child Content" });
		await expect(contentContainer).toBeVisible();
	});

	test("should handle different title and subtitle lengths gracefully", async ({ mount }) => {
		const longTitle = "Very Long Title That Should Still Fit";
		const longSubtitle = "Even Longer Subtitle With More Text To Test Layout";

		const component = await mount(
			<LayoutEntry title={longTitle} subtitle={longSubtitle}>
				<div>Content</div>
			</LayoutEntry>,
		);

		const titleHeading = component.getByRole("heading", { name: longTitle });
		await expect(titleHeading).toBeVisible();

		await expect(component).toContainText(longSubtitle);
	});

	test("should maintain layout structure when content changes", async ({ mount }) => {
		const { promise, resolve } = Promise.withResolvers();
		const component = await mount( <LayoutEntryChangeTest isDone={resolve} />);

		await promise;
		const suffix = "Hello Test";
		component.getByRole("heading", { name: `Title ${suffix}` });
		await expect(component).toContainText(`Subtitle ${suffix}`);
		await expect(component).toContainText(suffix);
	});
});
