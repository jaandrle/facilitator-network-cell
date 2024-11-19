/* <CSS> */
import styled from "styled-components";
import { cssFont, fontStep } from "@/ui/typography";
import { color } from "@/ui/colors";
import { borderRadius } from "@/ui/sizes";
const Form= styled.form`
	flex: 2;
`;
const Label= styled.label`
	display: flex;
	flex-flow: row nowrap;
	gap: .25rem;
	padding: ${fontStep(-1, "small")} ${fontStep(-1, "xsmall")};
	width: 100%;
	${cssFont.bold}
	color: ${color("black")};
	background-color: ${color("white")};
	border-radius: ${borderRadius.var};
`;
const Select= styled.select`
	border: none;
	color: inherit;
	background: transparent;
	${cssFont.regular}
`;
/* </CSS> */

import { ChangeEvent, useCallback } from "react";
import { useTranslation } from "@/core/translations";
import { languages } from "@/translations";
import type { Language } from "@/translations";
const propValue= "language";

export function LanguageForm(){
	const { t, language, changeLanguage }= useTranslation();
	const handleLanguageChange= useCallback((event: ChangeEvent<HTMLFormElement>)=> {
		event.preventDefault();
		const form= new FormData(event.currentTarget);
		changeLanguage(form.get(propValue) as Language);
	}, [ changeLanguage ]);

	return (
		<Form onSubmit={handleLanguageChange}>
			<Label>
				{t`homeChooseLanguage`}
				<Select
					name={propValue}
					value={language}
					onChange={ev=> ev.target.form?.requestSubmit()}
				>
					{Object.entries(languages).map(([ code, lang ])=>
						<option key={code} value={code}>{lang}</option>)}
				</Select>
			</Label>
		</Form>
	);
}

export default LanguageForm;
