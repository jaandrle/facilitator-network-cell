import { test, expect } from "@playwright/experimental-ct-react";
import { Timer } from "./Timer";

test.describe("Timer Component", () => {
	test("should render Timer component without props", async ({ mount }) => {
		// Timer component appears to be self-contained
		const component = await mount(<Timer />);
		expect(component).toBeTruthy();
		const time_el = component.locator("time");
		expect(time_el).toHaveAttribute("datetime", "PT0H0M0S");
		const btns = component.locator("button");
		expect(btns).toHaveCount(1);
		await btns.click();
		await new Promise((resolve) => setTimeout(resolve, 1001));
		expect(time_el).toHaveAttribute("datetime", "PT0H0M1S");
		expect(btns).toHaveCount(2);
		await btns.last().click();
		await new Promise((resolve) => setTimeout(resolve, 1001));
		expect(time_el).toHaveAttribute("datetime", "PT0H0M1S");
		await btns.first().click();
		expect(time_el).toHaveAttribute("datetime", "PT0H0M0S");
		expect(btns).toHaveCount(1);
	});
});
