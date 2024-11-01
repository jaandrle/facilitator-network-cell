import translations, { LangJson } from "translate-js";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

// fallback
import fallback from "@/translations/en.json";
import {toast} from "react-toastify";
const langFallback = "en";
let setLangState: Dispatch<SetStateAction<string>> = () => {};
const change = (data: LangJson, lang: string)=> {
	translations.add(data, lang);
	translations.setLocale(lang);
	setLangState(lang);
};
change(fallback, langFallback);

const context = createContext(langFallback);

export const setLang = async (lang: string) => {
	try{
		const { default: json }= await import(`../translations/${lang}.json`);
		translations.clear();
		change(json, lang);
	} catch (error){
		toast.error(`Loading translations ${lang} failed`);
		throw error;
	}
}
type T= (template: { raw: readonly string[] | ArrayLike<string>; }, ...substitutions: any[])=> string;
export const t: T = (template, ...substitutions) => translations(String.raw(template, ...substitutions));

export function useTranslation() {
	const lang = useContext(context);
	return { t, lang, setLang };
}
export function useTranslationsContext() {
	const [ lang, setLang ] = useState<string>(langFallback);
	setLangState = setLang;
	return {
		lang,
		Provider: context.Provider
	}
}
