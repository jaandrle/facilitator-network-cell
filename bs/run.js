#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "./.common.js";
import { buildVite } from "./build/vite.js";
import { buildConfig } from "./build/capacitor.js";

$.api("", true)
.describe(describeFromReadme())
.option("--target [device]", "Target device (see `adb devices`)")
.action(async function main(){
	try{
		buildVite();
		buildConfig();
		await s.$("-V").runA(
			"npx cap run android ::options::",
			{ options: $.slice(1) },
			{ stdio: "inherit" }
		);
	} catch(e){
		echo(e);
		$.exit(e.exitCode || 1);
	}
	$.exit(0);
})
.parse();
