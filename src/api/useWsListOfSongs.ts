import { IPAddress, useWebSocket } from "@/core/useWebSocket";
import { getState } from "./common";

const action= "getListSoundsData";
export function useWsListOfSongs(ip: IPAddress){
	const { lastJsonMessage: l, sendJsonMessage: s, readyState }= useWebSocket(ip);
	const isData= l && l.action === action;

	return {
		data: isData ? l.data : null,
		send: ()=> s({ action }),
		readyState: getState(readyState, isData)
	}
}

export default useWsListOfSongs;
