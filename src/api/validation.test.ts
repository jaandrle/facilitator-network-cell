// Unit tests for API validation utilities
import { test, expect } from "@playwright/test";
import { validateWebSocketRequest, validateWebSocketResponse } from "./validation";
import { after, before } from "node:test";

test.describe("API Validation Utilities", () => {
	const { error } = console;
	before(() => {
		console.error = () => {};
	});
	after(() => {
		console.error = error;
	});
	test("validateWebSocketRequest should validate valid request data", () => {
		const validData = { presentationId: "test123" };
		const result = validateWebSocketRequest("getPresentation", validData);
		expect(result).toEqual(validData);
	});

	test("validateWebSocketRequest should throw error for invalid request data", () => {
		const invalidData = { invalidField: "test" };
		expect(() => validateWebSocketRequest("getPresentation", invalidData)).toThrow();
	});

	test("validateWebSocketResponse should validate valid response data", () => {
		const validData = { day: 1, sessions: {} };
		const result = validateWebSocketResponse("getPresentation", validData);
		expect(result).toEqual(validData);
	});

	test("validateWebSocketResponse should throw error for invalid response data", () => {
		const invalidData = { invalidField: "test" };
		expect(() => validateWebSocketResponse("getPresentation", invalidData)).toThrow();
	});

	test("validateWebSocketRequest should handle undefined request", () => {
		const result = validateWebSocketRequest("server.getLang", undefined);
		expect(result).toBeUndefined();
	});

	test("validateWebSocketResponse should handle string response", () => {
		const result = validateWebSocketResponse("server.getLang", "en");
		expect(result).toBe("en");
	});
});
