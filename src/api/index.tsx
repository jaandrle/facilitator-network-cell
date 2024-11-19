import { IPAddress, useWebSocket } from "@/core/useWebSocket";
import { useWsConfigPresentation } from "./useWsConfigPresentation";

export { ReadyState } from "./common";
export type { IPAddress };
export type ApiState= ReturnType<typeof useAPI>;
export function useAPI(ip: IPAddress){
	const { readyState }= useWebSocket(ip);
	const presentation= useWsConfigPresentation(ip);

	return {
		readyState,
		presentation
	};
}
