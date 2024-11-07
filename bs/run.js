#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "./.common.js";
import { buildVite } from "./build/vite.js";
import { buildConfig } from "./build/capacitor.js";

$.api("", true)
.describe(describeFromReadme())
.option("--target", "Target device (see `adb devices`) — `--target <device>`")
.option("--lint", "Force lint before build", false)
.action(async function main({ lint, _: options, ..._ }){
	options= options.concat(restoreArgs(_));
	try{
		buildVite({ lint });
		buildConfig();
		await s.$("-V").runA(
			"npx cap run android ::options::",
			{ options },
			{ stdio: "inherit" }
		);
	} catch(e){
		echo(e);
		$.exit(e.exitCode || 1);
	}
	$.exit(0);
})
.parse();

function restoreArgs(__){
	return Object.entries(__)
		.flatMap(([ k, v ])=> {
			k= ( k.length>1 ? "--" : "-" ) + k;
			if(v===true) return [ k ];
			return [ k, v ];
		})
}
