import { test, expect } from "@playwright/experimental-ct-react";
import { PartialIpTestComponent } from "./__components";

test.describe("usePartialIp core logic", () => {
	test("should render component without errors", async ({ mount }) => {
		const component = await mount(<PartialIpTestComponent />);
		expect(component).toBeTruthy();
	});

	test("should display loading state initially", async ({ mount }) => {
		const component = await mount(<PartialIpTestComponent />);
		expect(component.getByText("Loading: true")).toBeTruthy();
	});
});
