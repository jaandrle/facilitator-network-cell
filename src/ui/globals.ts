import "../../node_modules/cssremedy/css/remedy.css";
import "../../node_modules/cssremedy/css/quotes.css";
import { createGlobalStyle as css } from "styled-components";
import { cssFontFaces, fontFamilyBase, fontFamilyHeadings, fontStep, variablesFontSizes } from "./typography";
import { variables as variablesColors } from "./colors";
import { variables as variablesSizes } from "./sizes";
import { variables as variablesAnimations, cssOpacityFade } from "./animations";

export const GlobalStyle = css`
	${cssFontFaces}
	:root{
		interpolate-size: allow-keywords;
		${variablesColors}
		${variablesFontSizes}
		${variablesSizes}
		${variablesAnimations}
	}
	html, body {
		height: 100%;
		min-height: 100%;
	}
	body {
		font-family: ${fontFamilyBase};
		font-size: ${fontStep(0)};
		-webkit-tap-highlight-color: transparent;
	}
	#root { display: contents; }
	/* category: typography */
	html { line-height: 1.5; }
	h1, h2, h3, h4, h5, h6 {
		font-family: ${fontFamilyHeadings};
		line-height: 1.25;
	}
	input, button, a{
		font-size: inherit;
		&:focus { outline: none; }
		&:focus-visible { outline: 1px solid currentColor; }
	}
	caption, figcaption, label, legend { line-height: 1.375; }

	[disabled], [aria-disabled="true"]{
		${cssOpacityFade}
	}
	/* category: accessibility */
	@media (prefers-reduced-motion: reduce) {
		*, ::before, ::after {
			animation-delay: -1s !important;
			animation-duration: 1s !important;
			animation-iteration-count: 1 !important;
			background-attachment: initial !important;
			scroll-behavior: auto !important;
			transition-duration: 0s !important;
		}
	}
`;
