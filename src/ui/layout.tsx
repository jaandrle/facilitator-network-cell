import { styled } from "styled-components";
import url_bg from "@/assets/bg.png";
import { cssVariable } from "@/core/cssVariable";
import { fontStep } from "./typography";

const padding = cssVariable("_padding", fontStep(1, "large"));
const bgBase = cssVariable("_bg-base", `url(${url_bg}) center / cover no-repeat`);
const width = cssVariable("_w", `calc(100% - ${padding.var} * 2)`);

export type LayoutProps = {
	"data-variant"?: "entry";
};
/**
 * This is the base page element
 * */
export const Layout = styled.div<LayoutProps>`
	${padding.def}
	${bgBase.def}
	width: 100%;
	height: 100%;
	position: relative;
	padding: ${padding.var};
	box-sizing: border-box;

	&::before{
		z-index: -1;
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		background: ${bgBase.var};

		[dir=rtl] &{
			transform: scaleX(-1);
		}
	}
	&[data-variant="${"entry" as LayoutProps["data-variant"]}"]::before {
		${width.def}
		background:
			linear-gradient(-180deg, rgba(255, 204, 0, 0.7) 12%, rgba(255, 204, 0, 0) 100%)
				${padding.var} ${padding.var} / ${width.var} ${width.var} no-repeat,
			${bgBase.var};
	}
`;
