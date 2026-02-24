import styled from "styled-components";
import { color, borderRadius, cssFont } from "@/ui";

export const Form = styled.div`
	position: relative;
	height: 100%;
`;
import { Label as LabelBase } from "@/components";
import { svgIconArrowDownUrl } from "../../assets";
export const Label = styled(LabelBase)`
	padding: 0;
`;
export const Select = styled(LabelBase)`
	${cssFont.regular}
	cursor: pointer;
	color: ${color("black")};
	box-sizing: border-box;
	height: 100%;

	&::after {
		--_rotate-boolean: 1;
		content: "";
		font-size: .65em;
		display: block;
		width: 1em;
		height: 1em;
		background: url(${svgIconArrowDownUrl}) center no-repeat;
		position: absolute;
		top: 50%;
		right: 1em;
		transform: translateY(-50%) rotateX(calc(var(--_rotate-boolean) * 180deg));
		transition: transform .15s ease-in-out;
	}
	&[aria-expanded="false"]::after {
		--_rotate-boolean: 0;
	}
`;
export const Options = styled.ul`
	position: absolute;
	left: 0;
	top: 100%;
	display: block;
	min-width: fit-content;
	width: 100%;
	max-height: 25vmin;
	overflow: hidden auto;
	padding: 0;
	margin: 1px 0;
	${cssFont.regular}
	color: ${color("black")};
	background-color: ${color("white")};
	border-radius: ${borderRadius.var};
	cursor: pointer;
	transition: height .1s ease-in-out;

	&[aria-hidden="true"]{
		height: 0;
		display: none;
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
		box-sizing: border-box;

		&[data-highlighted="true"] {
			background-color: ${color("gray", 85)};
			border-radius: ${borderRadius.var};
		}
	}
	li + li {
		border-top: 1px solid ${color("gray", 85)};
	}
`;
