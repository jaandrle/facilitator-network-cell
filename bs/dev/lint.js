#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";

if($.isMain(import.meta))
	$.api("", true)
	.describe(describeFromReadme())
	.action(function main(){
		$.is_verbose= true;
		lintFE();
		$.exit(0);
	})
	.parse();

export function lintFE(){
	if(!$.is_verbose)
		echo.use("-R", "Linting (`tsc` and `.editorconfig`)...");
	try{
		s.run`npx tsc --noEmit`;
		s.run`npx editorconfig-checker -format gcc`;
		if(!$.is_verbose)
			echo("✓ Linting");
	} catch(e){
		if(!$.is_verbose)
			echo("✗ Linting");
		echo(e.toString());
		$.exit(e.exitCode || 1);
	}
}
