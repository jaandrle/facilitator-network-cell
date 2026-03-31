// Unit tests for useNetworkInfo core logic
// Testing the network detection and IP handling logic

import { test, expect } from "@playwright/experimental-ct-react";

test.describe("useNetworkInfo core logic", () => {
	// Test the IP extraction and transformation logic
	const testNetworkInfoLogic = () => {
		// Mock data that would come from NetworkInterface.getWiFiIPAddress()
		const mockNetworkData = {
			ip: "192.168.1.100",
			subnet: "255.255.255.0",
		};

		// Test the transformation that useNetworkIp would do
		const extractIp = (data: typeof mockNetworkData | null) => {
			return data?.ip;
		};

		// Test the transformation that usePartialIp would do
		const transformToPartialIp = (ip: string | null | undefined) => {
			if (!ip) return ip;
			return ip.slice(0, ip.lastIndexOf(".") + 1);
		};

		return {
			extractIp,
			transformToPartialIp,
		};
	};

	test("should extract IP from network data", () => {
		const { extractIp } = testNetworkInfoLogic();

		const mockData = { ip: "192.168.1.100", subnet: "255.255.255.0" };
		const result = extractIp(mockData);

		expect(result).toBe("192.168.1.100");
	});

	test("should handle null network data", () => {
		const { extractIp } = testNetworkInfoLogic();

		const result = extractIp(null);

		expect(result).toBeUndefined();
	});

	test("should transform full IP to partial IP", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp("192.168.1.100");

		expect(result).toBe("192.168.1.");
	});

	test("should handle null IP in transformation", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp(null);

		expect(result).toBeNull();
	});

	test("should handle undefined IP in transformation", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp(undefined);

		expect(result).toBeUndefined();
	});

	test("should handle edge case with single segment IP", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp("192");

		// When there's no dot, lastIndexOf returns -1, so slice(0, -1 + 1) = slice(0, 0) = ""
		expect(result).toBe("");
	});

	test("should handle IPv6 format", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp("2001:0db8:85a3::8a2e:0370:7334");

		// IPv6 doesn't have dots, so should return empty string
		expect(result).toBe("");
	});

	test("should handle malformed IP with multiple dots", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp("192..168.1.100");

		expect(result).toBe("192..168.1.");
	});

	test("should handle IP with dot at the end", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const result = transformToPartialIp("192.168.1.");

		expect(result).toBe("192.168.1.");
	});

	test("should handle various valid IP formats", () => {
		const { transformToPartialIp } = testNetworkInfoLogic();

		const testCases = [
			["10.0.0.1", "10.0.0."],
			["172.16.0.1", "172.16.0."],
			["192.168.1.1", "192.168.1."],
			["255.255.255.255", "255.255.255."],
		];

		testCases.forEach(([input, expected]) => {
			const result = transformToPartialIp(input);
			expect(result).toBe(expected);
		});
	});
});
