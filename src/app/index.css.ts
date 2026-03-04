import styled, { css } from "styled-components";
import { cssOpacityFade, color, fontStep } from "@/ui";

import { Main as MainBase } from "./ui";
export const Main = styled(MainBase)`
	display: flex;
	flex-flow: row nowrap;
	gap: 15%;
`;
const MainContent = css`
	display: grid;
	grid-template-columns: 1fr 1fr .25fr;
	gap: 3px;
	background-color: ${color("white")};
`;
export type MainIpVariants = "nonauth" | "loading" | "fail";
export const MainIp = styled.div<{
	"aria-busy"?: boolean;
	"data-variant": MainIpVariants;
}>`
	height: fit-content;
	align-items: center;
	${MainContent}
	&[aria-busy=true]{
		${cssOpacityFade}
	}
	/* TODO */
	&[data-variant="fail"]{
		grid-template-columns: 1fr .25fr .25fr 1fr .25fr;
	}
	&[data-variant="loading"]{
		grid-template-columns: 1fr 1fr;
		padding-inline: 3%;
		min-width: 50%;
		gap: 0 3%;
	}
`;
export const MainIpHr = styled.span`
	display: inline-block;
	min-width: fit-content;
`;
export const Form = styled.form`
	${MainContent}
`;
export { LayoutEntry } from "./components/layout";

import { Input as InputBase, Label } from "@/components/form";
export { Label };
export const Input = styled(InputBase)`
	&[inputMode=numeric][pattern$="{1,3}"]{
		font-size: ${fontStep(0)};
		width: 7em;
		font-variant-numeric: tabular-nums;
	}
`;

import { Button } from "@/components";
export const ButtonConnect = styled(Button)`
	margin-inline: ${fontStep(0)};
`;
