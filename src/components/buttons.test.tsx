import { test, expect } from "@playwright/experimental-ct-react";
import { Button } from "./buttons";

test.describe("Button Components", () => {
	test("should render button with accessible text content", async ({ mount }) => {
		const button = await mount(<Button>Click Me</Button>);
		await expect(button).toBeVisible();
		await expect(button).toHaveText("Click Me");
	});

	test("should render button with outline variant and maintain accessibility", async ({ mount }) => {
		const button = await mount(<Button data-variant="outline">Outline Button</Button>);
		await expect(button).toBeVisible();
		await expect(button).toHaveText("Outline Button");
		await expect(button).toHaveAttribute("data-variant", "outline");
	});

	test("should render button with different action text", async ({ mount }) => {
		const button = await mount(<Button>Submit Form</Button>);
		await expect(button).toBeVisible();
		await expect(button).toHaveText("Submit Form");
	});

	test("should render button with nested content maintaining accessibility", async ({ mount }) => {
		const button = await mount(
			<Button>
				<span>Nested</span> Content
			</Button>,
		);
		await expect(button).toBeVisible();
		await expect(button).toContainText("Nested");
		await expect(button).toContainText("Content");
	});

	test("should be clickable and trigger events", async ({ mount }) => {
		let clicked = false;
		const button = await mount(
			<Button
				onClick={() => {
					clicked = true;
				}}
			>
				Clickable
			</Button>,
		);
		await button.click();
		expect(clicked).toBe(true);
	});
});
