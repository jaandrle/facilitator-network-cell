import useWS from "react-use-websocket";

export type IPAddress = string;

export function useWebSocket(ip: IPAddress) {
	return useWS(
		`ws://${ip}:${VITE.config.wsPort}`,
		{
			share: true,
			shouldReconnect: () => true,
		}
	);
}
