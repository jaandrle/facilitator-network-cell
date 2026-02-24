/*
import {cssVariable} from "@/core";
*/
import { css, keyframes } from "styled-components";
import { color } from "./colors";

export const cssOpacityFade = css`
	transition: opacity .5s ease-in-out;
	opacity: 0.5;
`;

export const variables = [
	/*
	animationBlinking.def,
	blinkingKeyframes,
	*/
].join("\n");

const skeletonFrames = keyframes`
	0% { background-position: 200% 0; }
	100% { background-position: -200% 0; }
`;
export const skeletonAnimation = css`
	@media not (prefers-reduced-motion: reduce) {
		background: linear-gradient(45deg, ${color("gray", 85)} 0%, ${color("gray", 60)} 50%, ${color("gray", 85)} 100%);
		animation: ${skeletonFrames} 1.5s cubic-bezier(.65,.05,.36,1) .25s infinite;
		background-size: 200% 100%;
	}
`;
