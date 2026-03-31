// Unit tests for useFindSocketIp core logic
import { test, expect } from "@playwright/experimental-ct-react";
import { FindSocketIp } from "./__components";

test.describe("useFindSocketIp Core Logic", () => {
	test("Needs better cover of async background of useFindSocketIp", async ({ mount }) => {
		const results = [] as { ip?: string; state: "loading" | "success" | "error" }[];
		const onChange = ({ ip, state }: { ip?: string; state: "loading" | "success" | "error" }) => {
			results.push({ ip, state });
		};
		const { promise, resolve: onFinal } = Promise.withResolvers();
		promise.then(() => {
			expect(results).toEqual([
				{ ip: undefined, state: "loading" },
				{ ip: "172.20.124.132", state: "success" },
			]);
		});
		await mount(<FindSocketIp onChange={onChange} onFinal={onFinal} />);
		const timeout = new Promise((resolve) => setTimeout(resolve, 8_900, 1)).then(() => {
			expect(results[0]).toEqual({ ip: undefined, state: "loading" });
		});
		await Promise.race([promise, timeout]);
	});
});
