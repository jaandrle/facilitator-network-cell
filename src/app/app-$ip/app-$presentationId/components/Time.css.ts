import styled, { keyframes } from "styled-components";
import { cssFont, fontStep, paddingPage } from "@/ui";

export const Container = styled.time`
	position: absolute;
	inset-block-start: 0;
	inset-inline-end: ${paddingPage.var};
	padding: .05em .5em;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 5px;
	color: black;
	${cssFont.bold}
	font-size: ${fontStep(1, "normal")};
	z-index: 100;
`;
const blink = keyframes`
	0%, 100% {
		opacity: .5;
	}
	50% {
		opacity: .75;
	}
`;
export const Literal = styled.span`
	@media not (prefers-reduced-motion: reduce) {
		animation: 1s ${blink} ease-in-out infinite;
	}
`;
