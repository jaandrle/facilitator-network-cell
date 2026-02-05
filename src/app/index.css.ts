import styled, { css } from "styled-components";
import { cssOpacityFade } from "@/ui/animations";
import { color } from "@/ui/colors";
import { fontStep } from "@/ui/typography";

import { Main as MainBase } from "./ui/layout.css";
export const Main = styled(MainBase)`
	display: flex;
	flex-flow: row nowrap;
	gap: 15%;
`;
const MainContent = css`
	display: inline-flex;
	flex-flow: row wrap;
	gap: ${fontStep(1, "small")};
	background-color: ${color("white")};
`;
export const MainIp = styled.div`
	height: fit-content;
	align-items: center;
	padding-inline: ${fontStep(0)};
	${MainContent}
	&[aria-busy=true]{
		${cssOpacityFade}
	}
`;
export const MainIpHr = styled.span`
	display: inline-block;
	min-width: fit-content;
	text-align: center;
`;
export const Form = styled.form`
	${MainContent}
`;
export { LayoutEntry } from "./components/layout";

import { Input as InputBase } from "@/components/form";
export const Input = styled(InputBase)`
	&[inputMode=numeric][pattern$="{1,3}"]{
		font-size: ${fontStep(0)};
		width: 7em;
		font-variant-numeric: tabular-nums;
	}
`;
