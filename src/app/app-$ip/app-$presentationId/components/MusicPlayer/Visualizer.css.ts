import { styled, keyframes } from "styled-components";

const equalize = keyframes`
	0%, 100% {
		height: 10%;
	}
	50% {
		height: 100%;
	}
`;

import { useRef } from "react";
import { color } from "@/ui";
export function useFallback(length: number) {
	const count = useRef(() => ({}));
	const index = useRef((_: number) => ({}));
	if (!CSS.supports("flex", "sibling-count()")) {
		count.current = () => ({ "--__count": length });
		index.current = (index: number) => ({ "--__index": index + 1 });
	}
	return { count, index };
}

export const Container = styled.div<{ "data-is-playing": boolean | "true" | "false" }>`
	display: flex;
	align-items: flex-end;
	height: 15%;
	width: 100%;
	gap: 2px;
	--__count: sibling-count();
`;

export const Bar = styled.div`
	--_duration: 1.25s;
	--_color-top-playing: ${color("primary")};
	--_color-top-paused: ${color("gray", 75)};
	width: 0;
	flex: 1;
	background-color: ${color("gray", 90)};
	position: relative;
	--__index: sibling-index();
	--__color-top: var(--_color-top-paused);

	${Container}[data-is-playing="true"] & {
		animation: ${equalize} var(--_duration) infinite cubic-bezier(0.39, 0.575, 0.565, 1);
		animation-delay: calc((var(--__index) - var(--__count) / 4) * var(--_duration) / var(--__count));
		@media (prefers-reduced-motion: reduce) {
			--_duration: 1ms;
			animation-play-state: paused;
			/* tries gaussian (rotated U) */
			height: calc(100% - 1% * var(--__count) * abs((var(--__count) / 2) - (var(--__index) - 1)));
		}
		--__color-top: var(--_color-top-playing);
	}

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background-color: var(--__color-top);
	}
`;
