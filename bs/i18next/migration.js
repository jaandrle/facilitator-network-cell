#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";

const url_base = "https://github.com/IndigoMultimediaTeam/CIS-Foundation-Facilitator/";
const url_branch = "blob/translations/";
const url_path = "build/js/localization/lang/";
const url = url_base + url_branch + url_path; //lng.js
const getPath = $.pathFromURL(import.meta.url);

$.api()
	.describe(describeFromReadme())
	.command("url [lang]", "Generates a URL from where to download the translation file")
	.action(function getUrl(lang) {
		echo(`${url + lang}.js`);
		$.exit(0);
	})
	.command("file [path]", "Tranfroms/Migrates the translation file")
	.option("l, lang", "Language of the translation file (by default determined from file name)")
	.action(async function main(path, { lang }) {
		if (!lang) lang = path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
		const file = s.cat(path);
		// biome-ignore lint/security/noGlobalEval: you need to check translation file anyway
		const translation_orig = eval(`
		const translate= {
			add(o){ return o; }
		};
		const out= ${file};
		out;
	`);
		const translation = pipe(toI18n, stripHtml, (obj) => JSON.stringify(obj, null, "\t"))(translation_orig);
		s.echo(translation).to(getPath`../../src/translations/${lang}.json`);
		$.exit(0);
	})
	.parse();

/**
 * Handles two cases:
 * 1. `Subtitle <br> <strong>Title</strong>`
 * 1. `Connected <br> devices`
 * */
function stripHtml(obj) {
	const out = Object.entries(obj).flatMap(([key, value]) => {
		value = value.replace(/<strong>([^<]+)<\/strong>/g, "$1");
		return value
			.split(" <br> ")
			.reverse()
			.map(function titleSubtitle(v, i) {
				if (!i) return [key, v];
				return [key.replace("Title", "Subtitle"), v];
			});
	});
	return Object.fromEntries(out);
}
/**
 * Recursively merge deep object into one level with keys using camelCase
 * */
function toI18n(obj, prefix = "") {
	return Object.keys(obj).reduce((acc, k) => {
		const preK = prefix ? prefix + k[0].toUpperCase() + k.slice(1) : k;
		// to camelCase
		const K = preK.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
		if (typeof obj[k] === "object" && obj[k] !== null)
			// biome-ignore lint/performance/noAccumulatingSpread: this is fine (join key names)
			return Object.assign(acc, toI18n(obj[k], K));

		acc[K] = obj[k];
		return acc;
	}, {});
}
