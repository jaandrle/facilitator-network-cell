// Unit tests for mergeQueryStatuses utility
import { test, expect } from "@playwright/experimental-ct-react";
import { mergeTanStackStatuses } from "./mergeQueryStatuses";

test.describe("mergeQueryStatuses Utility", () => {
	test("should test query status merging logic", () => {
		expect(mergeTanStackStatuses("success", "success")).toBe("success");
		expect(mergeTanStackStatuses("pending", "success")).toBe("pending");
		expect(mergeTanStackStatuses("error", "pending")).toBe("error");
		expect(mergeTanStackStatuses("error", "success")).toBe("error");
		expect(mergeTanStackStatuses("error", "error")).toBe("error");
		expect(mergeTanStackStatuses("success", "error", "pending")).toBe("error");
	});
});
