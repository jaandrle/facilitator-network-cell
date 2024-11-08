import { Layout as LayoutBase } from "@/ui/layout";
import styled, { css } from "styled-components";
import { color } from "@/ui/colors";
import { cssFont, fontStep } from "@/ui/typography";
import { cssVariable } from "@/core/cssVariable";
import { paddingPage } from "@/ui/sizes";

const headingSize= cssVariable("_heading-size", fontStep(2, "normal"));
const widthLogo= cssVariable("_width-logo", `calc(${headingSize.var} + ${paddingPage.var})`);
const widthLogoHalf= `calc(${widthLogo.var} / 2)`;

export const Layout= styled(LayoutBase)`
	${headingSize.def}
	${widthLogo.def}
	display: grid;
	padding-inline: ${paddingPage.var};
	padding-top: ${paddingPage.var};
	padding-bottom: 0;
	grid-template:
		"subheader	logo"	${widthLogoHalf}
		"header		logo"	${widthLogoHalf}
		"main		main"	1fr
		"footer		footer"	${fontStep(2, "large")}
		/
		1fr ${widthLogo.var};
`;
const Headers= css`
	text-transform: uppercase;
	color: ${color("primary")};
	font-size: ${headingSize.var};
	margin: 0;
	line-height: 1;
`;
export const Header = styled.h1`
	grid-area: header;
	${cssFont.boldCondensed}
	${Headers}
`;
export const SubHeader = styled.h2`
	grid-area: subheader;
	${cssFont.condensedlight}
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
