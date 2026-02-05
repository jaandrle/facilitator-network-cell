import { styled } from "styled-components";
import url_bg from "@/assets/bg.png";
import { cssVariable } from "@/core/cssVariable";
import { fontStep } from "./typography";

const padding = cssVariable("_padding", fontStep(1, "large"));
const bgBase = cssVariable("_bg-base", `url(${url_bg}) center / cover no-repeat`);

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
`;
