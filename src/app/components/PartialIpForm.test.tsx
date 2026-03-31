import { test, expect } from "@playwright/experimental-ct-react";
import { PartialIpForm } from "./PartialIpForm";

test.describe("PartialIpForm", () => {
	test("should render the form with required fields", async ({ mount }) => {
		const mockOnSubmit = () => {};
		const component = await mount(<PartialIpForm onIp={mockOnSubmit} />);

		// Check that the form renders
		await expect(component).toBeVisible();

		// Check that the input field is present
		const input = component.getByLabel("Code");
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("pattern", "[0-9]{1,3}");
		await expect(input).toHaveAttribute("inputMode", "numeric");
	});

	test("should call onIp when form is submitted with valid input", async ({ mount }) => {
		let submittedValue = "";
		const handleIp = (ip: string) => {
			submittedValue = ip;
		};
		const component = await mount(<PartialIpForm onIp={handleIp} />);
		const input = component.getByRole("textbox");

		// Fill in a valid IP ending
		await input.fill("100", { force: true, timeout: 1000 });
		await expect(input).toHaveValue("100");

		// Submit the form
		await component.dispatchEvent("submit");

		// Check that onIp was called with the expected value
		expect(submittedValue.slice(submittedValue.lastIndexOf(".") + 1)).toBe("100");
	});

	test("should disable form submission when isLoading is true", async ({ mount }) => {
		const component = await mount(<PartialIpForm onIp={() => {}} isLoading={true} />);

		await expect(component).toHaveAttribute("aria-disabled", "true");
	});
});
