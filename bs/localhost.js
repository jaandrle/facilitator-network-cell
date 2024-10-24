#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "./.common.js";

$.api("", true)
.describe(describeFromReadme())
.action(function main(){
	s.run`npx vite ${$.slice(1)}`;
	$.exit(0);
})
.parse();
