import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
const path= fileURLToPath(new URL("../../package.json", import.meta.url));
const readJSONFile= (path) => JSON.parse(readFileSync(path, "utf8"));
export const pkg= readJSONFile(path, "utf8");

export const config= pkg.config;
export default config;
export function configJSONFileAssign(src, update) {
	const manifest= readJSONFile(src, "utf8");
	const todo= update(config);
	Object.assign(manifest, todo);
	writeFileSync(src, JSON.stringify(manifest, null, "\t"));
	console.log([
		`Synced configuration (keys ${Object.keys(todo).map(k => `"${k}"`).join(", ")})`,
		"- from package.json (config key)",
		`- to ${src}`
	].join("\n"));
}
