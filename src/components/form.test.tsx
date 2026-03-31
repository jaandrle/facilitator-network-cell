import { test, expect } from "@playwright/experimental-ct-react";
import { Input, Label, InputWithLabel } from "./form";

test.describe("Form Components", () => {
	test("should render text input with proper accessibility attributes", async ({ mount }) => {
		const input = await mount(<Input type="text" aria-label="Username" />);
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("aria-label", "Username");
	});

	test("should render label with proper association to input", async ({ mount }) => {
		const label = await mount(<Label htmlFor="test-input">Username</Label>);
		await expect(label).toBeVisible();
		await expect(label).toHaveAttribute("for", "test-input");
	});

	test("should render InputWithLabel with proper label-input association", async ({ mount }) => {
		const component = await mount(
			<InputWithLabel id="username-input" type="text">
				Username
			</InputWithLabel>,
		);

		const label = component.getByLabel("Username");
		await expect(label).toBeVisible();

		const input = component.getByRole("textbox");
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute("id", "username-input");
	});

	test("should handle password input type with accessibility", async ({ mount }) => {
		const input = await mount(<Input type="password" aria-label="Password" />);
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute("type", "password");
	});

	test("should render form with multiple accessible components", async ({ mount }) => {
		const component = await mount(
			<form>
				<Label htmlFor="name-input">Name</Label>
				<Input id="name-input" type="text" aria-labelledby="name-label" />
			</form>,
		);

		const label = component.getByText("Name");
		await expect(label).toBeVisible();

		const input = component.getByRole("textbox");
		await expect(input).toBeVisible();
	});

	test("should allow user interaction with input field", async ({ mount }) => {
		const input = await mount(<Input type="text" aria-label="Test Input" />);
		await input.fill("Hello World");
		await expect(input).toHaveValue("Hello World");
	});
});
