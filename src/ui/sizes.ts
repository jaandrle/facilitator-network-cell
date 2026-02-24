import { cssVariable } from "@/core";

export const paddingPage = cssVariable("padding-page", "1.9rem");
export const borderRadius = cssVariable("border-radius-button", "4px");

export const variables = [paddingPage.def, borderRadius.def].join("\n");

export const referential = {
	width: 1920,
	height: 1164,
} as const;
export const isScaled = "(max-height: 500px) and (orientation: landscape)";
