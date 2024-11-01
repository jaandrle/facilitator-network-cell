#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
import { buildVite } from "./vite.js";
import { buildCapacitor } from "./capacitor.js";

$.api("", true)
.describe(describeFromReadme())
.action(async function main(){
	$.is_verbose= true;
	buildVite();
	await buildCapacitor($.slice(1));
	$.exit(0);
})
.parse();
