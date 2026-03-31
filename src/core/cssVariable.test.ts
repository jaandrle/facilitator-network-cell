import { test, expect } from "@playwright/test";
import { cssVariable } from "./cssVariable";

test.describe("CSS Variable Utilities", () => {
	test("cssVariable should create CSS variable object with correct properties", () => {
		const result = cssVariable("test-var", "10px");
		expect(result).toHaveProperty("def");
		expect(result).toHaveProperty("redef");
		expect(result).toHaveProperty("var");
		expect(result).toHaveProperty("js");
		expect(result).toHaveProperty("reassign");
	});

	test("cssVariable def should return correct CSS variable definition", () => {
		const result = cssVariable("test-var", "10px");
		expect(result.def).toBe("--test-var: 10px;");
	});

	test("cssVariable var should return correct CSS variable reference", () => {
		const result = cssVariable("test-var", "10px");
		expect(result.var).toBe("var(--test-var)");
	});

	test("cssVariable js should return the original value", () => {
		const result = cssVariable("test-var", "10px");
		expect(result.js).toBe("10px");
	});

	test("cssVariable redef should return updated CSS variable definition", () => {
		const result = cssVariable<string>("test-var", "10px");
		expect(result.redef("20px")).toBe("--test-var: 20px;");
	});

	test("cssVariable reassign should return new cssVariable instance", () => {
		const result = cssVariable<string>("test-var", "10px");
		const reassigned = result.reassign("20px");
		expect(reassigned.def).toBe("--test-var: 20px;");
		expect(reassigned.js).toBe("20px");
	});

	test("cssVariable should work with numeric values", () => {
		const result = cssVariable("spacing", 10);
		expect(result.def).toBe("--spacing: 10;");
		expect(result.js).toBe(10);
	});

	test("cssVariable should work with boolean values", () => {
		const result = cssVariable("enabled", true);
		expect(result.def).toBe("--enabled: true;");
		expect(result.js).toBe(true);
	});
});
