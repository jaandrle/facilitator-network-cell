#!/usr/bin/env -S npx nodejsscript

if ($.isMain(import.meta))
	$.api("[method]", true)
		.describe([
			"Formats/Lints the codebase using Biome.",
			"",
			"Methods:",
			"– Formatting (default)",
			"– Linting",
			"– All",
		])
		.option("--fix", "Apply fixes", false)
		.option("--verbose", "Verbose output", false)
		.action(function main(method = "Formatting", { fix, verbose } = {}) {
			$.is_verbose = verbose;
			biome(method, fix);
			$.exit(0);
		})
		.parse();

/**
 * @param {"Linting" | "Formatting" | "All"} method
 * @param {boolean} fix
 */
export function biome(method = "Formatting", fix = false) {
	const head = `Biome ${method}`;
	const echoEnd = $.is_verbose ? () => ({}) : (ok = false) => echo(`${ok ? "✓" : "✗"} ${head}`);
	if (!$.is_verbose) echo.use("-R", `… ${head}`);
	try {
		const m = method === "Linting" ? "lint" : method === "Formatting" ? "format" : "check";
		const level = method === "Linting" ? "--diagnostic-level=error" : "";
		const f = fix ? "--write" : "";
		s.$("-FS").run`npx @biomejs/biome ${m} ${f} --colors=force ${level}`;
		echoEnd(true);
	} catch (e) {
		echoEnd(false);
		echo(e.toString());
		$.exit(e.exitCode || 1);
	}
}
