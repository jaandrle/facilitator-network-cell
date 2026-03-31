#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "./.common.js";
import { mockWebSocket } from "./dev/ws.js";
import { genereateAssetsIndices } from "./dev/assets.js";
import { updateEnv } from "./helpers/.env.js";

const wsOption = "--ws";
$.api("", true)
	.describe(describeFromReadme())
	.option(wsOption, "Start a simple WebSocket server mock", false)
	.option("--silent", "Silent mode", false)
	.action(async function main({ ws = false, silent } = {}) {
		if (ws) mockWebSocket(silent);

		genereateAssetsIndices();
		updateEnv("localhost");
		const options = $.slice(1).filter((p) => p !== wsOption && p !== "--silent");
		await s.runA`npx vite ${options}`;
		$.exit(0);
	})
	.parse();
