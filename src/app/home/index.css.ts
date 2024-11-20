import styled, { css } from "styled-components";
import { fontStep } from "@/ui/typography";
import { color } from "@/ui/colors";
import { cssOpacityFade } from "@/ui/animations";

import { Main as MainBase } from "./ui/layout.css";
export const Main= styled(MainBase)`
	display: flex;
	flex-flow: row wrap;
	gap: 15%;
`;
const MainContent= css`
	display: inline-flex;
	flex-flow: column wrap;
	gap: ${fontStep(1, "small")};
	color: ${color("white")};
	align-items: start;
`;
export const MainIp= styled.div`
	flex: 1;
	${MainContent}
	&[aria-busy=true]{
		${cssOpacityFade}
	}
`;
export const MainIpHr= styled.span`
	display: inline-block;
	width: 75%;
	min-width: fit-content;
	text-align: center;
`;
export const Form= styled.form`
	${MainContent}
`;
export { LayoutEntry } from "./ui/layout";

import { Input as InputBase } from "@/components/form";
export const Input= styled(InputBase)`
	&[inputMode=numeric][pattern$="{1,3}"]{
		font-size: ${fontStep(2, "small")};
		width: 8em;
		font-variant-numeric: tabular-nums;
	}
`;
