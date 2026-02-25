import { useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
export * from "./useFindSocketIp";
import type { IPAddress, Endpoints } from "./types";
export type { IPAddress };

export type State = "connecting" | "connected" | "disconnected";
let socket: Socket | null = null;

export function useAPI(ipAddress: IPAddress) {
	if (socket === null) socket = io(`${ipAddress}:${VITE.config.wsPort}`, { withCredentials: true });
	const [state, setState] = useState<State>(
		socket.connected ? "connected" : socket.disconnected ? "disconnected" : "connecting",
	);
	useEffect(() => {
		const s: Socket = socket as Socket;
		const onConnect = () => setState("connected");
		const onDisconnect = () => setState("disconnected");
		s.on("connect", onConnect);
		s.on("disconnect", onDisconnect);

		return () => {
			s.off("connect", onConnect);
			s.off("disconnect", onDisconnect);
		};
	}, []);

	return useMemo(
		() => ({
			state,
			useEmit: useEmit.bind(null, state) as <T extends keyof Endpoints>(name: T) => ReturnType<typeof useEmit<T>>,
		}),
		[state],
	);
}
type StateEmit = "idle" | "pending" | "done" | "error";
export type UseEmit = ReturnType<typeof useEmit>;
function useEmit<T extends keyof Endpoints>(stateIo: State, name: T) {
	const s: Socket = socket as Socket;
	const [response, setResponse] = useState<Endpoints[T]["response"] | null>(null);
	const [stateEmit, setState] = useState<StateEmit>("idle");

	const emit = useRef((data: Endpoints[T]["request"]) => {
		setState("pending");
		s.emit(name, data, (response: Endpoints[T]["response"]) => {
			setResponse(response);
			setState("done");
		});
	}).current;
	const state: StateEmit | "disconnected" =
		stateIo === "connected" ? stateEmit : stateIo === "connecting" ? "pending" : "disconnected";

	return useMemo(
		() => ({
			response,
			state,
			emit,
		}),
		[response, state, emit],
	);
}
