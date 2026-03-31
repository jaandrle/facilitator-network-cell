import { test, expect } from "@playwright/experimental-ct-react";
import { SvgIcon, type SvgIconId } from "./";

// Create a mock icon ID for testing purposes
const mockIconId = { __SvgIconId: "mock-icon-id" } as SvgIconId;

test.describe("SvgIcon Component", () => {
	test("should render SVG icon with minimal content", async ({ mount }) => {
		const svg = await mount(<SvgIcon icon={mockIconId} />);
		await expect(svg).toHaveAttribute("role", "graphics-symbol");
		await expect(svg.locator("title")).not.toBeAttached();
	});

	test("should render SVG icon with all content", async ({ mount }) => {
		const svg = await mount(
			<SvgIcon icon={mockIconId} role="search" aria-hidden="true">
				Title
			</SvgIcon>
		);
		await expect(svg).toBeVisible();
		await expect(svg).toHaveAttribute("aria-hidden", "true");
		await expect(svg).toHaveAttribute("role", "search");
		const title = svg.locator("title");
		await expect(title).toBeAttached();
		await expect(title).toContainText("Title");
	});

	test("should render SVG icon within container maintaining accessibility", async ({ mount }) => {
		const component = await mount(
			<div>
				<SvgIcon icon={mockIconId} />
			</div>,
		);
		await expect(component).toBeVisible();
		const svg = component.getByRole("img");
		await expect(svg).toBeVisible();
	});

	test("should render SVG icon with semantic wrapper element", async ({ mount }) => {
		const component = await mount(
			<span>
				<SvgIcon icon={mockIconId} />
			</span>,
		);
		await expect(component).toBeVisible();
		const svg = component.getByRole("img");
		await expect(svg).toBeVisible();
	});

	test("should handle multiple SVG icons with proper isolation", async ({ mount }) => {
		const component = await mount(
			<div>
				<SvgIcon icon={mockIconId} aria-label="First icon" />
				<SvgIcon icon={mockIconId} aria-label="Second icon" />
			</div>,
		);
		const firstIcon = component.getByLabel("First icon");
		await expect(firstIcon).toBeVisible();
		const secondIcon = component.getByLabel("Second icon");
		await expect(secondIcon).toBeVisible();
	});

	test("should render SVG icon in complex layout with proper structure", async ({ mount }) => {
		const component = await mount(
			<div className="icon-container">
				<span>Icon:</span>
				<SvgIcon icon={mockIconId} aria-label="Decorative icon" />
			</div>,
		);
		await expect(component).toBeVisible();
		await expect(component).toContainText("Icon:");

		const icon = component.getByLabel("Decorative icon");
		await expect(icon).toBeVisible();
	});
});
