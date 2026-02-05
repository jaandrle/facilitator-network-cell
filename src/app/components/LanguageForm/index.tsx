import { useSelect } from "downshift";

import { useEffect } from "react";
import { useTranslation } from "@/core/translations";
import type { Language } from "@/translations";
import { languages as languagesObj } from "@/translations";
import { Form, Label, Options, Select } from "./index.css";

const languages = Object.entries(languagesObj) as [Language, string][];

export function LanguageForm() {
	const { t, language, changeLanguage } = useTranslation();
	const { isOpen, selectedItem, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } =
		useSelect({
			items: languages,
			itemToString: (lang) => (lang ? lang[1] : "-"),
			defaultSelectedItem: languages.find((lang) => lang[0] === language),
		});
	const inputValue = selectedItem ? selectedItem[0] : "";
	useEffect(() => {
		if (!inputValue || language === inputValue) return;
		changeLanguage(inputValue);
	}, [inputValue, language, changeLanguage]);

	return (
		<Form>
			<Label {...getLabelProps()}>
				{t`homeChooseLanguage`}
				<Select {...getToggleButtonProps()}>{selectedItem ? selectedItem[1] : "-"}</Select>
				<Options {...getMenuProps()} aria-hidden={!isOpen}>
					{languages.map((item, index) => (
						<li key={item[0]} {...getItemProps({ item, index })} data-highlighted={highlightedIndex === index}>
							{item[1]}
						</li>
					))}
				</Options>
			</Label>
		</Form>
	);
}

export default LanguageForm;
