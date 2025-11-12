import i18next from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next, useTranslation as useTranslationReact } from "react-i18next";

export const key = "language";
const ns = "translation";
const fallbackLng = "en";
const lng = localStorage.getItem(key) || fallbackLng;
i18next.use(initReactI18next).init({
	lng,
	fallbackLng,
	defaultNS: ns,
	/*
	 * Normally, we want `escapeValue: true` as it
	 * ensures that i18next escapes any code in
	 * translation messages, safeguarding against
	 * XSS (cross-site scripting) attacks. However,
	 * React does this escaping itself, so we turn
	 * it off in i18next.
	 */
	interpolation: {
		escapeValue: false,
	},
	debug: false,
});

export function useTranslationInit() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Promise.all([changeLanguage(lng, true), lng !== fallbackLng && addTranslation(fallbackLng)])
			.catch(console.error)
			.then(() => setLoading(false));
	}, []);
	const out = useTranslation();
	return { loading, ...out };
}
export function useTranslation() {
	const { t, i18n } = useTranslationReact(ns);
	return {
		t,
		i18n,
		changeLanguage,
		language: i18n.language,
	};
}
/**
 * @throws {Error} Import error (if translation file is not found)
 * */
async function changeLanguage(lng: string | null, force = false) {
	if (!lng) lng = fallbackLng;
	if (!force && lng === i18next.language) return;
	await addTranslation(lng);
	i18next.changeLanguage(lng);
	localStorage.setItem(key, lng);
}
async function addTranslation(lng: string) {
	const { default: translation } = await import(`../translations/${lng}.json`);
	i18next.addResources(lng, ns, translation);
}
