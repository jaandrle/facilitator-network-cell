#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
const path= $.pathFromURL(import.meta.url);
const css= echo.css`
	@counter-style server-time{
		system: extends --terminal-time;
		--terminal-mask: "01" "11111111"
	}
	.ws::before{
		content: counter(i, server-time) " [🔌] ";
		color: magenta;
	}
`;
const wsEcho= (msg, ...msgs)=> echo("%c"+msg, css.ws, ...msgs);

$.api("", true)
.describe(describeFromReadme())
.action(function main(){
	mockWebSocket();
	//$.exit(0);
})
.parse();

import { config } from "../helpers/.config.js";
import { createServer, Request } from "./.ws/createServer.js";
const actions_path= "./.ws/responses/";
const actions_files= s.ls(path(actions_path));
const actions= actions_files.map(file=> file.slice(0, file.lastIndexOf(".")));

export function mockWebSocket(){
	const server= createServer(function onClient(socket){
		socket.on("message", (/** @type {Request} */ request)=> {
			let actionId= -1, message;
			try{
				if(request.opcode === Request.CLOSE)
					return wsEcho("Client closed connection");
				if(request.opcode !== Request.TEXT)
					return wsEcho("Unsupported opcode:", request.opcode);
				message= JSON.parse(request.payload);
				actionId= actions.indexOf(message.action);
				if(actionId === -1) throw new Error();
			} catch(e){
				return wsEcho("Failed to decode message:", message);
			}
			wsEcho("Received data from client:", message);
			const action_file= actions_files[actionId];
			const response= s.cat(path`${actions_path}${action_file}`).xargs(JSON.parse);
			wsEcho("Sending data to client:", action_file);
			socket.emit("response", response);
		});

		wsEcho("New client", socket.address());
		socket.on("error", wsEcho.bind(null, "Error:"));
		socket.on("close", wsEcho.bind(null, "Close:"));
	});

	const port= config.wsPort;
	server.listen(
		{ port, host: "0.0.0.0", reuseAddress: true },
		wsEcho.bind(null, `${mockWebSocket.name} on port ${port}`)
	);
	server.on("close", wsEcho.bind(null, "Server Closed"));
	server.on("error", function(err){
		if(err.code === "EADDRINUSE")
			return wsEcho(err.message);
		wsEcho("Server Error:", err);
	});
}
