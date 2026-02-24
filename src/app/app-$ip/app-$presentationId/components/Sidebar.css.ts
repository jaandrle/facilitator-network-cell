import { styled } from "styled-components";
import { color, cssFont, fontStep } from "@/ui";

export const SidebarLayout = styled.div<{
	"data-state": "open" | "closed";
}>`
	position: fixed;
	inset-inline-start: 0;
	inset-block: 0;
	width: 25%;
	background: ${color("white")};
	color: ${color("black")};
	backdrop-filter: blur(10px);
	display: flex;
	flex-direction: column;
	z-index: 100;
	transition: transform .3s ease;
	padding: 2rem;
	box-shadow: 4px 0px 4px 0px hsla(0, 0%, 0%, 0.25);

	--_hide: 1;
	[dir="rtl"] & {
		--_hide: -1;
	}
	&[data-state="closed"] {
		transform: translateX(calc(var(--_hide) * (-100% + .25rem)));
	}
`;
export const Content = styled.div`
	display: contents;
	content-visibility: auto;
`;
export const Header = styled.div`
	padding: 1rem;
	text-transform: uppercase;
	line-height: 100%;

	h3, h4 {
		font-size: ${fontStep(2, "small")};
		margin: 0;
	}
	h4 {
		${cssFont.condensedlight}
	}
	h3 {
		${cssFont.bold}
		color: ${color("primary")};
	}
`;

export const SessionList = styled.ul`
	flex: 1;
	overflow-y: auto;
	padding: .5rem 0;
`;

export const SessionItem = styled.li`
	padding: .75rem 1rem;

	&:has(+ &) {
		border-block-end: 1px solid ${color("gray", 85)};
	}
	span {
		color: ${color("black")};
		font-weight: normal;
	}
	button {
		background: none;
		border: none;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		font-weight: bold;
		cursor: pointer;

		&:hover {
			color: ${color("primary", 40)};
		}
		&[aria-pressed="true"] {
			color: ${color("primary")};
		}
	}
`;

export const Footer = styled.div`
	padding-block-start: 1rem;
`;

export const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: .5rem;
`;

import { Button, SvgIcon as SvgIconRaw } from "@/components";
export const ToggleButton = styled(Button)<{ "data-open": boolean }>`
	position: fixed;
	inset-inline-start: calc(100% - .5rem);
	top: 50%;
	transform: translateY(-50%);
	width: 1.25rem;
	height: 3rem;
	transition: background .2s;
	padding: .25rem .5rem;
	box-shadow: 4px 0px 4px 0px hsla(0, 0%, 0%, 0.25);

`;
export const SvgIcon = styled(SvgIconRaw)`
	height: 40%;
	transition: transform .3s;
	color: ${color("white")};

	--_initial: 0deg;
	[dir="rtl"] & {
		--_initial: 180deg;
	}
	--_rotate: 0deg;
	transform: rotate(calc(var(--_initial) + var(--_rotate, 0deg)));
	${ToggleButton}[data-open="true"] & {
		--_rotate: 180deg;
	}
`;
