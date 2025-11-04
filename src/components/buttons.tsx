import { styled, css } from "styled-components";
import { cssVariable } from "@/core/cssVariable";

import { color } from "@/ui/colors";
import { cssFont, fontStep } from "@/ui/typography";

const shadowTopLeft= cssVariable("shadow-top-left", fontStep(-2, "small"));
const common= css`
	cursor: pointer;
	white-space: nowrap;
	vertical-align: middle;
	user-select: none;
	outline: none;
	border: 0;
	color: ${color("black")};
	background-color: ${color("secondary")};
	${cssFont.bold}
	text-transform: uppercase;
	${shadowTopLeft.def}
	box-shadow: ${shadowTopLeft.var} ${shadowTopLeft.var} 0 0 rgba(0, 0, 0, 0.18);
	border-radius: 100px;
	text-align: center;
	height: ${fontStep(2, "normal")};
	padding-inline: ${fontStep(1, "large")};
	transition: background-color 0.2s ease-out;

	&:hover { background-color: ${color("secondary", 40)}; }
	&:active { background-color: ${color("secondary", 60)}; }
`;
import { Link as LinkPure } from "@tanstack/react-router";
export const Link = styled(LinkPure)`
	display: inline-block;
	text-decoration: none;
	${common}
`;

export const Button = styled.button`
	${common}
`;
