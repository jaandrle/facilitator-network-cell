/*
import {cssVariable} from "@/core/cssVariable";
*/
import { css } from "styled-components";

export const cssOpacityFade = css`
	transition: opacity .5s ease-in-out;
	opacity: 0.5;
`;
/*
const blinking= `---blinking-ani`;
const blinkingKeyframes= `
@keyframes ${blinking} {
	0% { opacity: .5; opacity: unset; }
	50% { opacity: .25; }
	100% { opacity: .5; opacity: unset; }
}
`;
export const animationBlinking= cssVariable<string>(
	"animation-blinking",
	`${blinking} 2s infinite cubic-bezier(.86,0,.07,1)`
);
export const cssAnimationBlinking= css`
opacity: .5;
transition: opacity .5s ease-in-out;
@media not (prefers-reduced-motion: reduce) {
	animation: ${animationBlinking.var};
}
`;
*/

export const variables = [
	/*
	animationBlinking.def,
	blinkingKeyframes,
	*/
].join("\n");
