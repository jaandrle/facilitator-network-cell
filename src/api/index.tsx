import type { Endpoints, IPAddress } from "./types";
import { atom, useAtom, useAtomValue } from "jotai";
import { io, type Socket } from "socket.io-client";
import { useQuery as useQueryTanstack, useMutation as useMutationTanstack } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { validateWebSocketRequest, validateWebSocketResponse } from "./validation";

export type { IPAddress };
const sharedIp = atom<IPAddress | null>(null);
const sharedSocket = atom<Socket | null>(function computed(get, { signal }) {
	const ip = get(sharedIp);
	if (!ip) return null;
	const socket = io(`${ip}:${VITE.config.wsPort}`, { withCredentials: true });
	signal.addEventListener("abort", () => socket.disconnect());
	return socket;
});
export { sharedIp as serverIp };
export * from "./useFindSocketIp";

class RequestError extends Error {
	static get notConnected() {
		return new RequestError("not-connected");
	}
	static get aborted() {
		return new RequestError("aborted");
	}
}

function useSocket() {
	const { ip } = useParams({ strict: false }) as { ip?: IPAddress };
	const [serverIp, setServerIp] = useAtom(sharedIp);
	useEffect(() => {
		if (!ip) return;
		if (ip === serverIp) return;
		setServerIp(ip);
	}, [ip, serverIp, setServerIp]);
	return useAtomValue(sharedSocket);
}

const staleTime = 1.5 * 60 * 60 * 1000; //= 1.5h
export function useQuery<T extends keyof Endpoints>(name: T, data: Endpoints[T]["request"]) {
	const socket = useSocket();
	return useQueryTanstack({
		queryKey: [name, data] as const,
		async queryFn({ queryKey: [name, data], signal }) {
			if (!socket) throw RequestError.notConnected;

			// Validate request before sending
			const validatedRequest = validateWebSocketRequest(name, data);

			const response = await socket.emitWithAck(name, validatedRequest);
			if (signal.aborted) throw RequestError.aborted;

			// Validate response before returning
			return validateWebSocketResponse(name, response);
		},
		enabled: socket !== null,
		staleTime,
	});
}
import type { UseMutationOptions } from "@tanstack/react-query";
export function useMutation<T extends keyof Endpoints>(
	name: T,
	options?: UseMutationOptions<Endpoints[T]["response"], Error, Endpoints[T]["request"]>,
) {
	const socket = useSocket();
	return useMutationTanstack({
		...options,
		mutationKey: [name] as const,
		mutationFn(input: Endpoints[T]["request"]) {
			if (!socket) return Promise.reject(new Error("not connected"));

			// Validate request and response
			const validatedInput = validateWebSocketRequest(name, input);
			return socket.emitWithAck(name, validatedInput).then((response) => validateWebSocketResponse(name, response));
		},
	});
}
