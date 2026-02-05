import { HTMLNetworkCellCirclesElement } from "@indigomultimediateam/networkcell-circles";
import styled, { css } from "styled-components";
import { cssVariable } from "@/core/cssVariable";
import { color } from "@/ui/colors";
import { Layout as LayoutBase } from "@/ui/layout";
import { paddingPage } from "@/ui/sizes";
import { cssFont, fontStep } from "@/ui/typography";

const headingGap = cssVariable("_heading-gap", "1rem");
const headingSize = cssVariable("_heading-size", fontStep(2, "large"));
const widthLogo = cssVariable("_width-logo", `calc(${headingSize.var} / 2 + ${paddingPage.var})`);

export const Layout = styled(LayoutBase)`
	${headingGap.def}
	${headingSize.def}
	${widthLogo.def}
	display: grid;
	padding: ${paddingPage.var};
	/*
	 * areas:
	 * .			.			logo
	 * .			.			logo
	 * subheader	subheader	logo
	 * subheader	subheader	.
	 * header		header		.
	 * main			main		.
	 * footer		footer		footer
	 */
	--_grid-cols-left:
		[header-start] 0 [subheader-start] 0 [main-start]
		1fr
		[main-end] 0 [subheader-end] 0 [header-end];
	--_grid-col-logo: [logo-start] 10rem [logo-end];
	grid-template-columns:
		[footer-start] 1rem var(--_grid-cols-left) 1rem var(--_grid-col-logo) 0 [footer-end];
	--_grid-rows-top:
		[logo-start] 2.5rem
		[subheader-start] 7.5rem
		[logo-end] 5rem
		[subheader-end];
	--_grid-rows-body:
		[header-start] 5rem
		[header-end] ${headingGap.var}
		[main-start] 1fr
		[main-end];
	--_grid-rows-bottom:
		[footer-start] ${fontStep(2, "large")} [footer-end];
	grid-template-rows:
		var(--_grid-rows-top) ${headingGap.var}
		var(--_grid-rows-body) 1rem
		var(--_grid-rows-bottom);
`;
const Headers = css`
	text-transform: uppercase;
	color: ${color("white")};
	margin: 0;
	line-height: 1;
`;
export const Header = styled.h1`
	grid-area: header;
	font-size: calc(${headingSize.var} * 2 / 3);
	${cssFont.condensedlight}
	${Headers}
`;
export const SubHeader = styled.h2`
	grid-area: subheader;
	font-size: ${headingSize.var};
	${cssFont.boldCondensed}
	${Headers}
	align-self: end;
`;
export const Logo = styled.img`
	grid-area: logo;
`;
export const Main = styled.main`
	grid-area: main;
`;
export const Footer = styled.p`
	grid-area: footer;
	color: ${color("white")};
	text-align: center;
`;
export const NetworkcellCircles = styled(HTMLNetworkCellCirclesElement.tagName)`
	z-index: -1;

	position: absolute;
	inset-block-end: ${paddingPage.var};
	inset-inline-end: ${paddingPage.var};
	height: 80%;
	${Layout}:has(&) {
		position: relative;
	}
`;
