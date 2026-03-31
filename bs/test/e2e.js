#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
import { genereateAssetsIndices } from "../dev/assets.js";
import { updateEnv } from "../helpers/.env.js";

if ($.isMain(import.meta))
	$.api("", true)
		.describe(describeFromReadme())
		.action(async function main() {
			const args = $.slice(1).flatMap((arg) => (arg === "help" ? ["test", "--help"] : [arg]));
			genereateAssetsIndices();
			updateEnv("localhost");
			s.run`npx playwright test --config=playwright.e2e.config.ts ${args}`;
		})
		.parse();
