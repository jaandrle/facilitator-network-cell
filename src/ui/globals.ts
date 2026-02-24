import "../../node_modules/cssremedy/css/remedy.css";
import "../../node_modules/cssremedy/css/quotes.css";
import { createGlobalStyle as css } from "styled-components";
import { cssOpacityFade, variables as variablesAnimations } from "./animations";
import { color, variables as variablesColors } from "./colors";
import { variables as variablesSizes } from "./sizes";
import { cssFontFaces, fontFamilyBase, fontFamilyHeadings, fontStep, variablesFontSizes } from "./typography";

export const cssVariables = {
	appScale: "--js-app-scale",
	appDh: "--js-app-dh",
} as const;
export const GlobalStyle = css`
	*, ::before, ::after { box-sizing: unset; }
	${cssFontFaces}
	:root{
		${cssVariables.appScale}: 1;
		${cssVariables.appDh}: 100%;
		${variablesColors}
		${variablesFontSizes}
		${variablesSizes}
		${variablesAnimations}
	}
	html, body {
		height: var(${cssVariables.appDh});
		overflow: hidden;
	}
	html[data-js-keyboard-open="true"]{
		&, body {
			overflow: hidden auto;
		}
	}
	body {
		font-family: ${fontFamilyBase};
		font-size: ${fontStep(0)};
		-webkit-tap-highlight-color: transparent;
		interpolate-size: allow-keywords;
		transform: scale(var(${cssVariables.appScale}));
		transform-origin: 0 0;
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
	}
	input, button, a, textarea, [tabindex]{
		outline: none;
		&:focus-visible {
			box-shadow: 0 0 0 2px ${color("black")} inset;
			transition: box-shadow .2s ease-in-out;
		}
	}
	label:has(input:focus-visible) {
		box-shadow: 0 0 0 2px ${color("black")} inset;
		transition: box-shadow .2s ease-in-out;
		input { box-shadow: none; outline: none; }
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
