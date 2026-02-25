import { css, styled } from "styled-components";
import { color, cssFont, fontStep } from "@/ui";

const common = css`
	cursor: pointer;
	white-space: nowrap;
	vertical-align: middle;
	user-select: none;
	outline: none;
	border: 0;
	color: ${color("white")};
	background-color: ${color("primary")};
	${cssFont.bold}
	border-radius: 5px;
	text-align: center;
	box-sizing: content-box;
	height: fit-content;
	padding: ${fontStep(-1, "xsmall")} ${fontStep(1, "xsmall")};
	transition: background-color 0.2s ease-out;

	&:hover { background-color: ${color("primary", 40)}; }
	&:active { background-color: ${color("primary", 60)}; }
`;

import { Link as LinkPure } from "@tanstack/react-router";
export const Link = styled(LinkPure)`
	display: inline-block;
	text-decoration: none;
	${common}
` as typeof LinkPure;

export const Button = styled.button`
	${common}
`;
