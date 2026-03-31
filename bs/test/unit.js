#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
import { genereateAssetsIndices } from "../dev/assets.js";
import { updateEnv } from "../helpers/.env.js";

if ($.isMain(import.meta))
	$.api("", true)
		.describe(describeFromReadme())
		.action(async function main() {
			const args = $.slice(1)
				.flatMap((arg) => (arg === "help" ? ["test", "--help"] : [arg]))
				.map((arg) => arg.replaceAll("$", "\\$"));
			genereateAssetsIndices();
			updateEnv("localhost");
			try {
				s.run`npx playwright test --config=playwright.unit.config.ts ${args}`;
			} catch (_) {
				return $.exit(1);
			}
		})
		.parse();
