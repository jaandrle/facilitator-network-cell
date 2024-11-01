import styled, { css } from "styled-components";
import { fontStep } from "@/ui/typography";
import { color } from "@/ui/colors";

import { Main as MainBase } from "./ui/layout.css";
export const Main= styled(MainBase)`
	columns: 2;
`;
const MainContent= css`
	display: inline-flex;
	flex-flow: column wrap;
	gap: ${fontStep(1, "small")};
	color: ${color("white")};
	align-items: start;
`;
export const MainIp= styled.div`
	${MainContent}
	&[aria-busy=true]{
		opacity: 0.5; /* TODO */
	}
`;
export const MainHr= styled.span`
	display: inline-block;
	width: 75%;
	min-width: 6em;
	text-align: center;
`;
export const Form= styled.form`
	${MainContent}
	&[aria-disabled="true"]{
		opacity: 0.5;
	}
`;
export { LayoutEntry } from "./ui/layout";

import { Input as InputBase } from "@/components/form";
export const Input= styled(InputBase)`
	&[inputMode=numeric][pattern$="{3,4}"]{
		font-size: ${fontStep(2, "small")};
		width: 8em;
		font-variant-numeric: tabular-nums;
	}
`;
