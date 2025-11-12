import { cssVariable } from "@/core/cssVariable";

export const paddingPage = cssVariable("padding-page", "5rem");
export const borderRadius = cssVariable("border-radius-button", "4px");

export const variables = [paddingPage.def, borderRadius.def].join("\n");

export const isScaled = "(max-height: 500px) and (orientation: landscape)";
