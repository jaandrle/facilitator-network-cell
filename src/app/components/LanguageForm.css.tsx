import styled from "styled-components";
import { cssFont, fontStep } from "@/ui/typography";
import { color } from "@/ui/colors";
import { borderRadius } from "@/ui/sizes";
import { isOneColumn } from "../ui/layout.css";
export const Form= styled.div`
	flex: 2;
`;
export const Label= styled.label`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: 0 ${fontStep(-1, "xsmall")};
	width: 100%;
	${cssFont.bold}
	color: ${color("black")};
	background-color: ${color("white")};
	border-radius: ${borderRadius.var};
	position: relative;
`;
export const Select= styled.div`
	${cssFont.regular}
	padding: .5em 1.5em .5em .25em;
	cursor: pointer;
	position: relative;

	&::after {
		content: "";
		font-size: .65em;
		display: block;
		width: 1em;
		height: 1em;
		background: url(assets/icon/fa-angle-up.svg) no-repeat;
		position: absolute;
		top: 50%;
		right: 1em;
		transform: translateY(-50%);
	}
	&[aria-expanded="false"]::after {
		background: url(assets/icon/fa-angle-down.svg) no-repeat;
	}
`;
export const Options= styled.ul`
	position: absolute;
	left: 0;
	top: 100%;
	display: block;
	width: 100%;
	padding: 0;
	margin: 1px 0;
	${cssFont.regular}
	color: ${color("black")};
	background-color: ${color("white")};
	border-radius: ${borderRadius.var};
	cursor: pointer;
	max-height: 25vmin;
	overflow-y: auto;
	transition: height .1s ease-in-out;

	[aria-expanded="false"] + &{
		height: 0;
	}
	@media ${isOneColumn}{
		top: unset;
		bottom: 100%;
		max-height: 50vmin;
	}

	li {
		display: block;
		width: 100%;
		line-height: 2.25em;
		list-style: " ";
		padding-left: 1em;
		padding-inline: 1em;
		margin: 0;
		transition: background-color .15s ease-in-out;

		&[data-highlighted="true"] {
			background-color: ${color("gray", 80)};
			border-radius: ${borderRadius.var};
		}
	}
	li + li {
		border-top: 1px solid ${color("gray", 80)};
	}
`;
