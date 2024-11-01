declare module 'translate-js' {
	type LangJsonValue = string | LangJsonObject;
	type LangJsonObject = { [member: string]: LangJsonValue };
	export type LangJson = Record<string, LangJsonValue>;

	interface Translate {
		(text: string): string;
		add(langJson: LangJson, lang: string): void;
		clear(): void;
		setLocale(text: string): void;
	}
	const translate: Translate;
	export default translate;
}
