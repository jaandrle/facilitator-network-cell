import type { IPAddress } from "./types";
import { useState, useEffect, useMemo } from "react";
import { useNetworkIp } from "@/core";

let ip_find: Promise<void> | null = null;
let ip_result: number | null = null;
type SearchListener = (result: IPAddress | Error) => unknown;
const listeners = new Set<SearchListener>();
const timeout = 5_000;
const maxConcurrency = 24;
// not-found — tablet: ~36.278 s, pc: ~15.228 s
export function useFindSocketIp() {
	const thisIp = useNetworkIp();
	const ip_start = !thisIp.value ? thisIp.value : thisIp.value.slice(0, thisIp.value.lastIndexOf("."));
	const [state, setState] = useState<"loading" | "success" | "error">("loading");
	const [ip, setIp] = useState<IPAddress>();
	useEffect(() => {
		if (!ip_start) return;

		let alive = true;
		const listener: SearchListener = (result) => {
			if (!alive) return;
			if (result instanceof Error) return setState("error");

			setIp(result);
			setState("success");
		};
		listeners.add(listener);

		if (!ip_find) {
			const abort = new AbortController();
			ip_find = (function findIpConcurrent() {
				const ips = createProbIpList(thisIp.value);
				let index_ip = 0,
					active = 0;

				return new Promise<IPAddress>((resolve, reject) => {
					let id_timeout: number | null = null;
					function next() {
						if (abort.signal.aborted) return;
						if (index_ip >= ips.length) {
							if (active === 0) reject(new Error("not found"));
							else if (id_timeout === null) id_timeout = setTimeout(next, timeout) as unknown as number; // ★
							/* ★
							 * not strictly correct (promise can resolve earlier) but
							 * timeout is small enough that it doesn't matter
							 * */
							return;
						}
						if (active >= maxConcurrency || index_ip >= ips.length) return;

						const ip = ips[index_ip++];
						active++;

						ping(`${ip_start}.${ip}`, { signal: abort.signal })
							.then((result) => {
								abort.abort(); // stop all others
								resolve(result);
							})
							.catch(() => {
								active--;
								next(); // refill slot immediately
							});

						next(); // fill window
					}

					next();
				});
			})()
				.then((ip) => {
					ip_result = Number(ip.slice(ip.lastIndexOf(".") + 1));
					for (const listener of listeners) listener(ip);
				})
				.catch(() => {
					ip_result = null;
					for (const listener of listeners) listener(new Error("not found"));
				})
				.finally(() => {
					listeners.clear();
					ip_find = null;
				});
		}

		return () => {
			alive = false;
			listeners.delete(listener);
		};
	}, [ip_start, thisIp.value]);

	return useMemo(
		() => ({
			ip,
			state: thisIp.error ? "error" : state,
		}),
		[ip, state, thisIp.error],
	);
}
// Tablet: ~15±5s; PC:~2.5 average for 100 tries
function ping<IP extends IPAddress>(ip: IP, { signal }: { signal: AbortSignal }) {
	signal = AbortSignal.any([AbortSignal.timeout(timeout), signal]);
	const once = (
		(settled = false) =>
		(cb: (input: unknown) => void) => {
			return (input: unknown) => {
				if (settled) return;
				settled = true;
				cb(input);
			};
		}
	)();
	return new Promise<IP>((resolve, reject) => {
		const ws = new WebSocket(`ws://${ip}:${VITE.config.wsPort - 1}`);
		const onAbort = once(() => {
			ws.close();
			reject(new Error("aborted"));
		});
		ws.onopen = once(() => {
			signal.removeEventListener("abort", onAbort);
			resolve(ip);
			ws.close();
		});
		ws.onerror = once(reject);
		signal.addEventListener("abort", onAbort);
	});
}
/**
 * Creates random batches 0…255:
 * 1. batch 5 ⇒ [ [ 2, 15, 58, 200, 78 ], [ 5, … ], … ]
 * 2. each number is presented only once
 * 3. sorted by likelihood of being a real user device on Wi-Fi
 */
function createProbIpList(ip?: IPAddress): number[] {
	const nearby = !ip ? () => 0 : ipNearby(ip);
	return Array.from({ length: 256 }, (_, i) => i)
		.map((i) => ({
			ip: i,
			score: ipProbabilityScore(i, nearby(i)),
		}))
		.toSorted((a, b) => {
			// higher probability first, then slight randomness
			if (a.score !== b.score) return b.score - a.score;
			return Math.random() - 0.5;
		})
		.map((v) => v.ip);
}
const scoreSteps = 25;
/** Ideally ⅓ of the maxConcurrency and ½ for smaller/½ for larger neighborhood ips */
const near_limit = Math.max(Math.round(maxConcurrency / 2), Math.round(maxConcurrency / 6));
function ipNearby(ip: IPAddress) {
	const ip_end = Number(ip.slice(ip.lastIndexOf(".") + 1));

	return (i: number) => {
		if (VITE.RUN_MODE === "localhost" && i === ip_end) return scoreSteps;
		const diff = Math.abs(ip_end - i);
		return diff <= near_limit ? scoreSteps : 0;
	};
}

/** Heuristic probability scoring for consumer Wi-Fi IPs */
function ipProbabilityScore(i: number, nearby: number): number {
	if (ip_result === i) return 255;
	let score = 0;
	// light noise so batches are not deterministic
	score += Math.random() * 2 * scoreSteps;

	// typical DHCP pools
	if (i >= 2 && i <= 50) score += scoreSteps + nearby;
	else if (i >= 100 && i <= 200) score += scoreSteps + nearby;
	// reserved / unlikely
	else if (i === 0 || i === 1 || i === 254 || i === 255) score -= scoreSteps;

	return score;
}
