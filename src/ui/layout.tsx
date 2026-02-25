import { styled } from "styled-components";
import url_bg from "@/assets/bg.png";
import { cssVariable } from "@/core";
import { paddingPage } from "./sizes";
import type { ReactNode } from "react";

const bgBase = cssVariable("_bg-base", `url(${url_bg}) center / cover no-repeat`);

export type LayoutProps = {
	"data-variant"?: "entry";
	children?: ReactNode;
};
/** This is the base page element styles */
const LayoutStyle = styled.div<LayoutProps>`
	${bgBase.def}
	width: 100%;
	height: 100%;
	position: relative;
	padding: ${paddingPage.var};
	box-sizing: border-box;

	&[data-variant="entry"]::before{
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
import { HTMLNetworkCellCirclesElement } from "@indigomultimediateam/networkcell-circles";
export const NetworkcellCircles = styled(HTMLNetworkCellCirclesElement.tagName)`
	z-index: -1;
	position: absolute;
	inset-block-end: ${paddingPage.var};
	inset-inline-end: ${paddingPage.var};
	height: 80%;
	${LayoutStyle}:has(&) {
		position: relative;
	}
	${LayoutStyle}[data-variant="entry"] &{
	}
`;
export function Layout({ children, ...props }: LayoutProps) {
	return (
		<LayoutStyle {...props}>
			{children}
			<NetworkcellCircles />
		</LayoutStyle>
	);
}
