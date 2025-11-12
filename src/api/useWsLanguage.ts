import { type IPAddress, useWebSocket } from "@/core/useWebSocket";
import { getState } from "./common";

const action = "server.getLang";
export function useWsLanguage(ip: IPAddress) {
	const { lastJsonMessage: l, sendJsonMessage: s, readyState } = useWebSocket(ip);
	const isData = l && l.action === action;

	return {
		data: isData ? l.lang : null,
		send: () => s({ action }),
		readyState: getState(readyState, isData),
	};
}

export default useWsLanguage;
