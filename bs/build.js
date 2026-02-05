#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "./.common.js";
import { buildCapacitor } from "./build/capacitor.js";
import { updateEnv } from "./helpers/.env.js";
import { buildVite } from "./build/vite.js";

$.api("", true)
	.describe(describeFromReadme())
	.option("--lint", "Force lint before build", false)
	.action(async function main({ lint }) {
		$.is_verbose = true;
		updateEnv("device");
		buildVite({ lint });
		await buildCapacitor($.slice(1));
		$.exit(0);
	})
	.parse();
