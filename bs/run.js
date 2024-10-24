#!/usr/bin/env -S npx nodejsscript
import { stdout } from "node:process";
import { describeFromReadme } from "./.common.js";
import { buildVite } from "./build/vite.js";

$.api("", true)
.describe(describeFromReadme())
.action(async function main(){
	buildVite();
	await s.runA`npx cap run android ${$.slice(1)}`.pipe(stdout);
	$.exit(0);
})
.parse();
