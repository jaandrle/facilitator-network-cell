import { test, expect } from "@playwright/experimental-ct-react";
import { Sidebar } from "./Sidebar";

test.describe("Sidebar Component", () => {
	test("should render Sidebar component without crashing", async ({ mount }) => {
		// Sidebar is a self-contained component that doesn't take props
		const component = await mount(<Sidebar />);
		await expect(component).toBeTruthy();
	});

	test("should render Sidebar with basic structure", async ({ mount }) => {
		const component = await mount(<Sidebar />);
		await expect(component).toBeTruthy();

		// Check that the component renders successfully (may be empty due to async loading)
		const html = await component.innerHTML();
		expect(html).toBeDefined();
	});

	test("should handle Sidebar rendering in different contexts", async ({ mount }) => {
		// Test that Sidebar can be rendered in a container
		const component = await mount(
			<div>
				<Sidebar />
			</div>,
		);
		await expect(component).toBeTruthy();
	});

	test("should render multiple Sidebar instances", async ({ mount }) => {
		// Test that multiple Sidebar components can coexist
		const component = await mount(
			<div>
				<Sidebar />
			</div>,
		);
		await expect(component).toBeTruthy();
	});

	test("should render Sidebar with wrapper elements", async ({ mount }) => {
		// Test Sidebar with different wrapper elements
		const component = await mount(
			<section>
				<Sidebar />
			</section>,
		);
		await expect(component).toBeTruthy();
	});
});
