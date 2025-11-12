import { type IPAddress, useWebSocket } from "@/core/useWebSocket";
import { useWsConfigPresentation } from "./useWsConfigPresentation";
import { useWsLanguage } from "./useWsLanguage";
import { useWsListOfSongs } from "./useWsListOfSongs";

export { ReadyState } from "./common";
export type { IPAddress };
export type ApiState = ReturnType<typeof useAPI>;
export function useAPI(ip: IPAddress) {
	const { readyState } = useWebSocket(ip);
	const presentation = useWsConfigPresentation(ip);
	const songs = useWsListOfSongs(ip);
	const language = useWsLanguage(ip);

	return {
		readyState,
		presentation,
		songs,
		language,
	};
}
