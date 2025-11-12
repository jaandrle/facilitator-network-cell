#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "./.common.js";
import { mockWebSocket } from "./dev/ws.js";

const wsOption = "--ws";
$.api("", true)
	.describe(describeFromReadme())
	.option(wsOption, "Start a simple WebSocket server mock", false)
	.action(async function main({ ws = false } = {}) {
		if (ws) mockWebSocket();

		const options = $.slice(1).filter((p) => p !== wsOption);
		await s.runA`npx vite ${options}`;
		$.exit(0);
	})
	.parse();
