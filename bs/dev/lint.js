#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
import { biome } from "./biome.js";

if ($.isMain(import.meta))
	$.api("", true)
		.describe(describeFromReadme())
		.option("--fix", "Apply fixes", false)
		.option("--verbose", "Verbose output", false)
		.action(function main({ fix, verbose } = {}) {
			$.is_verbose = verbose;
			lintFE(fix);
			$.exit(0);
		})
		.parse();

export function lintFE(fix = false) {
	biome("Linting", fix);
	try {
		if (!$.is_verbose) echo.use("-R", "… Typechecking");
		s.$("-FS").run`npx tsc --noEmit`;
		if (!$.is_verbose) echo("✓ Typechecking");
	} catch (e) {
		if (!$.is_verbose) echo("✗ Typechecking");
		echo(e.toString());
		$.exit(e.exitCode || 1);
	}
}
