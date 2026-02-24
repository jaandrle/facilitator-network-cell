import { css, styled } from "styled-components";
import { borderRadius, color, cssFont, fontStep, skeletonAnimation, viewTransition, type Anchor } from "@/ui";
import { SvgIcon } from "@/components";

export const Container = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	overflow: hidden;
`;
export const Header = styled.div`
	display: flex;
	flex-flow: column nowrap;
	overflow: hidden;
	justify-content: end;
	gap: 3px;
`;
export const Tab = styled.button<{ ariaPressed?: "true" | "false" }>`
	padding: .25rem 1rem;
	border: none;
	cursor: pointer;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	overflow: hidden;
	gap: .25em;

	--_opacity: .45;
	transition: background .25s;
	background-color: hsl(0 0% 100% / var(--_opacity));
	&:hover, &[aria-pressed="true"] {
		--_opacity: 1;
	}
	&:focus-visible { z-index: 1; }
`;
export const TabSvgIcon = styled(SvgIcon)`
	height: 50%;
	margin-inline: auto;
`;
export const Content = styled.div<{
	"aria-hidden"?: "true" | "false" | boolean;
	"data-state"?: "error" | "pending" | "success" | "idle";
}>`
	padding: .5rem 1rem;
	background: ${color("white")};
	overflow: hidden;
	content-visibility: auto;

	&[aria-hidden="true"] {
		display: none;
	}
	&[data-state="pending"] {
		position: relative;
		&::after {
			content: "";
			position: absolute;
			display: block;
			height: 100%;
			width: 100%;
			opacity: .5;
			${skeletonAnimation};
		}
	}
`;
const navCSS = css`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	min-height: 3rem;
	padding: .5rem 1rem;
	box-sizing: border-box;
	 /* Accessibility: see Li styling */
	text-decoration: none;
	color: inherit;
	font: inherit;
	${cssFont.bold}
`;
import { Link as LinkPure } from "@tanstack/react-router";
export const Link = styled(LinkPure)`
	${navCSS}
`;
export const Button = styled.button`
	${navCSS}
	background: none;
	border: none;
	cursor: pointer;
`;
export const Li = styled.li`
	width: 100%;
	border-radius: 5px;
	background-color: ${color("secondary")};
	transition: background-color .25s;

	&:has(${Link}:hover) {
		background-color: ${color("secondary", 60)};
	}
	&:has([aria-pressed="true"]) {
		background-color: ${color("secondary")};
	}
	&:has([aria-pressed="false"]) {
		background-color: ${color("secondary", 85)};
	}
`;
export const LiSvgIcon = styled(SvgIcon)`
	height: 1em;
`;
export const Ul = styled.ul`
	height: 100%;
	box-sizing: border-box;
	overflow: auto;
	margin: 0;
	padding: 1rem;
	li::marker {
		color: transparent;
	}
	${Li} + ${Li} {
		margin-block-start: .5rem;
	}
`;
export const viewTransitionUl = viewTransition(
	"--view-ulpreview",
	css`
		@keyframes --_name-ani {
			to { opacity: 0; }
		}
		::view-transition-old(--_name) {
			animation: .25s ease-in both --_name-ani;
		}
		::view-transition-new(--_name) {
			animation: .25s ease-in .25s both reverse --_name-ani;
		}
	`,
);
export const UlPreview = styled.div`
	${Content}[aria-hidden="false"]:has(&){
		display: grid;
		grid-template-columns: repeat(2, 50%);
	}
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	gap: 1em;
	padding-inline: 3em;
	${viewTransitionUl}
`;

const anchorNote: Anchor = "--anchor-notes";
export const NotesTextarea = styled.textarea`
	border: none;
	padding: 1.5rem;
	font-size: inherit;
	font-family: inherit;
	resize: none;

	anchor-name: ${anchorNote};
`;
export const NotesSaving = styled.span`
	position-anchor: ${anchorNote};
	position: fixed;
	bottom: calc(anchor(bottom) + .75em);
	right: calc(anchor(right) + .75em);
	padding: .25rem .5rem;
	border-radius: ${borderRadius.var};
	background-color: ${color("gray", 60)};
	color: ${color("white")};
	user-select: none;
	font-size: ${fontStep(-1, "small")};

	&:empty {
		opacity: 0;
	}
	transition: opacity .5s ease-in-out;
`;
