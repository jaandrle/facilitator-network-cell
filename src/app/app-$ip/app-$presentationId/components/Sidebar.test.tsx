import { test, expect } from "@playwright/experimental-ct-react";
import { SidebarTest } from "./__components";

test.describe("Sidebar Component", () => {
	test("should render Sidebar component without crashing", async ({ mount }) => {
		const component = await mount(<SidebarTest />);
		expect(component.locator("h4")).toHaveCount(1);
		expect(component).toBeTruthy();
	});
});
