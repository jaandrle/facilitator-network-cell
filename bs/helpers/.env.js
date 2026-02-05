import { readFileSync, writeFileSync } from "node:fs";
import { networkInterfaces } from "node:os";

export function updateEnv(mode= "localhost") {
	const path = new URL("../../.env", import.meta.url);
	const env = readEnv(path);

	updateEnvVar(
		env,
		"VITE_IP_ADDRESSES_AUTO",
		mode === "localhost"
			? Object.values(networkInterfaces()).flat().find((i) => !i?.internal && i?.family === "IPv4")?.address
			: undefined
	);
	updateEnvVar(env, "VITE_RUN_MODE", mode);

	writeFileSync(path, env.join("\n"), "utf-8");
}
function updateEnvVar(env, key, value){
	const index = env.findIndex((e) => e.startsWith(key));
	if(typeof value==="undefined"){
		if(index!==-1) env.splice(index, 1);
	} else {
		env[index===-1 ? env.length : index] = `${key}=${value}`;
	}
}
function readEnv(path) {
	try {
		return readFileSync(path, "utf-8").toString().split("\n");
	} catch {
		return [];
	}
}
