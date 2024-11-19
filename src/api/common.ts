import { ReadyState as WebSocketReadyState } from "react-use-websocket";
export enum ReadyState{
	UNINSTANTIATED = -1,
	CONNECTING = 0,
	OPEN = 1,
	CLOSING = 2,
	CLOSED = 3,
	DATA = 4,
};
export function getState(state: WebSocketReadyState, isData: boolean){
	return state === WebSocketReadyState.OPEN && isData ? ReadyState.DATA : state;
}
