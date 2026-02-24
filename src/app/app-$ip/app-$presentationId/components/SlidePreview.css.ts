import { color, cssFont, skeletonAnimation, viewTransition } from "@/ui";
import { css, styled } from "styled-components";

export const Container = styled.div`
	display: grid;
	--_gap-label: .5rem;
	--_gap-actions: 1rem;
	gap: var(--_gap-label);
	--_gap-actions-computed: calc(var(--_gap-actions) - 2*var(--_gap-label));
	grid-template:
		"label		progress	."			1.75rem
		"media		media		media"		min-content
		".			.			."			var(--_gap-actions-computed)
		"actions	actions		actions"	3.5rem
		/ 1fr		1fr			1fr;
	overflow: hidden;
`;

export const Label = styled.span`
	grid-area: label;
`;

export const Progress = styled.span`
	grid-area: progress;
	text-align: center;
	${cssFont.bold}
`;

export const viewTransitionSlideNext = viewTransition(
	"--view-slide-next",
	css`
		@keyframes --_name-ani {
			from { transform: translateX(0); }
			  to { transform: translateX(-90%); }
		}
		::view-transition-old(--_name) {
			animation: .25s ease-in both --_name-ani;
			z-index: 100;
		}
		::view-transition-new(--_name) {
			animation: none;
		}
	`,
);
export const viewTransitionSlidePrev = viewTransition(
	"--view-slide-prev",
	css`
		@keyframes --_name-ani {
			from { transform: translateX(0); }
			  to { transform: translateX(90%); }
		}
		::view-transition-old(--_name) {
			animation: none;
		}
		::view-transition-new(--_name) {
			animation: .25s ease-in both --_name-ani;
			z-index: 100;
		}
	`,
);
export const Media = styled.iframe<{
	"data-variant": "pending" | "success" | "empty";
	"data-type": "current" | "next";
}>`
	grid-area: media;
	width: 100%;
	aspect-ratio: 16/9;
	border: none;
	background: ${color("gray", 90)};

	&[data-variant="pending"] {
		${skeletonAnimation}
	}
	&[data-variant="empty"] {
		background: ${color("gray", 60)};
	}
	&[data-type="next"] {
		${viewTransitionSlideNext}
	}
	&[data-type="current"] {
		${viewTransitionSlidePrev}
	}
`;

export const Actions = styled.div`
	grid-area: actions;
	display: flex;
	flex-flow: row nowrap;
`;
