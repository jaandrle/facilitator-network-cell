import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
const path= fileURLToPath(new URL("../../package.json", import.meta.url));
const pkg= JSON.parse(readFileSync(path, "utf8"));

export const config= pkg.config;
export default config;
