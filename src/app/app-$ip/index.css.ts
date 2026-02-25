import styled from "styled-components";
import { color, skeletonAnimation } from "@/ui";

export const H1 = styled.h1`
	color: ${color("primary")};
	text-transform: uppercase;
`;
export const Ul = styled.div`
	display: grid;
	grid-template-rows: repeat(auto-fill, auto);
	gap: 1rem;
`;
export const Li = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: start;
	align-items: center;
	gap: clamp(1rem, 100% / 3, 6vw);
	background: hsl(0 0% 100% / .6);
	padding: .5rem 1rem;
	min-height: 3rem;

	strong { flex: 1; }
	a { flex: .25; }

	[aria-busy=true] & {
		${skeletonAnimation};
		animation-delay: calc(.25s * (sibling-count() - 1));
	}
`;
export { Link } from "@/components/buttons";
