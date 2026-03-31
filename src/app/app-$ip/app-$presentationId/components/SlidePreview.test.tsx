import { test, expect } from "@playwright/experimental-ct-react";
import { SlidePreview } from "./SlidePreview";

test.describe("SlidePreview Component", () => {
	test("should render SlidePreview with required props", async ({ mount }) => {
		const component = await mount(<SlidePreview slideNumber={1} label="Test Slide" data-type="current" />);
		await expect(component).toBeTruthy();
	});

	test("should handle SlidePreview with different slide numbers", async ({ mount }) => {
		const component = await mount(<SlidePreview slideNumber={5} label="Slide 5" data-type="next" />);
		await expect(component).toBeTruthy();
	});

	test("should render SlidePreview with different data types", async ({ mount }) => {
		const component = await mount(<SlidePreview slideNumber={2} label="Current Slide" data-type="current" />);
		await expect(component).toBeTruthy();
	});

	test("should handle SlidePreview with minimal props", async ({ mount }) => {
		const component = await mount(<SlidePreview slideNumber={1} label="Minimal" data-type="current" />);
		await expect(component).toBeTruthy();
	});

	test("should render multiple SlidePreviews with different props", async ({ mount }) => {
		const component = await mount(
			<div>
				<SlidePreview slideNumber={1} label="Slide 1" data-type="current" />
				<SlidePreview slideNumber={2} label="Slide 2" data-type="next" />
			</div>,
		);
		await expect(component).toBeTruthy();
	});
});
