import useWS from "react-use-websocket";

export type IPAddress = string;
export type Response =
	| {
			action: "getConfigPresentation" | "getListSoundsData";
			// biome-ignore lint/complexity/noBannedTypes: TBD
			data: {};
	  }
	| {
			action: "server.getLang";
			lang: string;
	  };

export function useWebSocket(ip: IPAddress) {
	return useWS<Response>(`ws://${ip}:${VITE.config.wsPort}`, {
		share: true,
		shouldReconnect: () => true,
		//TODO onClose
	});
}
