import "../../node_modules/cssremedy/css/remedy.css";
import "../../node_modules/cssremedy/css/quotes.css";
import { createGlobalStyle as css } from "styled-components";
import { cssOpacityFade, variables as variablesAnimations } from "./animations";
import { color, variables as variablesColors } from "./colors";
import { variables as variablesSizes } from "./sizes";
import { cssFontFaces, fontFamilyBase, fontFamilyHeadings, fontStep, variablesFontSizes } from "./typography";

export const GlobalStyle = css`
	*, ::before, ::after { box-sizing: unset; }
	${cssFontFaces}
	:root{
		--js-app-scale: 1;
		${variablesColors}
		${variablesFontSizes}
		${variablesSizes}
		${variablesAnimations}
	}
	html, body {
		height: 100%;
		min-height: 100%;
		overflow: hidden;
	}
	body {
		font-family: ${fontFamilyBase};
		font-size: ${fontStep(0)};
		-webkit-tap-highlight-color: transparent;
		interpolate-size: allow-keywords;
		transform: scale(var(--js-app-scale));
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
	input, button, a, [tabindex]{
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
