#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";

const path = $.pathFromURL(import.meta.url);
const css = echo.css`
	@counter-style server-time{
		system: extends --terminal-time;
		--terminal-mask: "01" "11111111"
	}
	.ws::before{
		content: counter(i, server-time) " [🔌] ";
		color: magenta;
	}
`;
const wsEcho = (msg, ...msgs) => echo(`%c${msg}`, css.ws, ...msgs);

if ($.isMain(import.meta))
	$.api("", true)
		.describe(describeFromReadme())
		.action(async function main() {
			await mockWebSocket();
			$.exit(0);
		})
		.parse();

import { config } from "../helpers/.config.js";

const actions_path = "./.ws-responses/";
const actions_files = s.ls(path(actions_path)).filter((f) => f.endsWith(".js"));
const actions = actions_files.map((file) => file.slice(0, file.lastIndexOf(".")));

export function mockWebSocket() {
	return Promise.all([mockWebSocketIo(), mockWebSocketPing()]);
}
import { Server } from "socket.io";
function mockWebSocketIo() {
	return new Promise((resolve, reject) => {
		const port = config.wsPort;
		const io = new Server(port, {
			cors: {
				origin: ["http://localhost:5173", "http://localhost/"],
				methods: ["GET", "POST"],
				credentials: true,
			},
		});
		io.on("connection", function onClient(socket) {
			wsEcho(`${mockWebSocketIo.name} on port ${port}`);
			for (let i = 0; i < actions_files.length; i++) {
				socket.on(actions[i], async (data, callback) => {
					wsEcho("Received data from client:", data);
					const handler = await import(path`${actions_path}${actions[i]}.js`);
					const response = handler.default(data);
					wsEcho("Sending data to client:", response);
					callback(response);
				});
			}

			socket.on("error", wsEcho.bind(null, "Error:"));
			socket.on("close", wsEcho.bind(null, "Close:"));
		});
		io.on("close", () => {
			wsEcho("Server Closed");
			resolve();
		});
		io.on("error", (err) => {
			wsEcho("Server Error:", err);
			reject();
		});
	});
}
import { createServer } from "node:http";
import { URL } from "node:url";
function createMockHttpServer() {
	const server = createServer();

	server.on("request", (req, res) => {
		const url = new URL(req.url || "/", `http://localhost:3029`);
		if (url.pathname === "/slide") {
			const num = url.searchParams.get("num") || "0";
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(`<!DOCTYPE html><h1>Hello slide ${num}</h1>`);
		} else {
			res.writeHead(404);
			res.end("Not Found");
		}
	});
	return server;
}

import { WebSocketServer } from "ws";
/** Used to find server port-1. */
function mockWebSocketPing() {
	return new Promise((resolve, reject) => {
		const server = createMockHttpServer();
		new WebSocketServer({ server });
		const port = config.wsPort - 1;
		server.listen(
			{ port, host: "0.0.0.0", reuseAddress: true },
			wsEcho.bind(null, `${mockWebSocketPing.name} on port ${port}`),
		);
		server.on("close", () => {
			wsEcho(`${mockWebSocketPing.name} Closed`);
			resolve();
		});
		server.on("error", (err) => {
			wsEcho(`${mockWebSocketPing.name} Error`, err.code === "EADDRINUSE" ? err.message : err);
			reject(err);
		});
	});
}
