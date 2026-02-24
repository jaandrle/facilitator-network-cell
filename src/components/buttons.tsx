import { css, styled } from "styled-components";
import { color, cssFont, fontStep } from "@/ui";

type Props = {
	"data-variant"?: "outline";
};
const common = css`
	cursor: pointer;
	white-space: nowrap;
	vertical-align: middle;
	user-select: none;
	border: 0;
	color: ${color("white")};
	background-color: ${color("primary")};
	${cssFont.bold}
	border-radius: 5px;
	text-align: center;
	box-sizing: content-box;
	height: fit-content;
	padding: ${fontStep(-2, "small")} ${fontStep(1, "xsmall")};
	transition: background-color 0.2s ease-out;

	&:hover, &:active {
		background-color: ${color("primary", 50)};
	}

	&[data-variant="outline"] {
		background-color: transparent;
		color: ${color("primary")};

		&:not(:focus-visible) {
			box-shadow: 0 0 0 2px currentColor inset;
		}
		&:hover, &:active {
			box-shadow: 0 0 0 2px ${color("black")} inset;
		}
	}
`;

import { Link as LinkPure } from "@tanstack/react-router";
export const Link = styled(LinkPure)<Props>`
	display: inline-block;
	text-decoration: none;
	${common}
` as typeof LinkPure;

export const Button = styled.button<Props>`
	${common}
`;
