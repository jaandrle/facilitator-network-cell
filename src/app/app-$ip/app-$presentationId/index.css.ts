import { styled } from "styled-components";
import { cssFont, fontStep, Layout as LayoutBase } from "@/ui";
import { cssVariable } from "@/core";

const gap = cssVariable("_gap", "1rem");
export const Layout = styled(LayoutBase)`
	${gap.def}
	display: grid;
	grid-template-rows: fit-content(100%) 1fr;
	gap: ${gap.var};
`;

export const SlidesZone = styled.div`
	display: grid;
	grid-template-columns: repeat(2, calc(50% - ${gap.var} / 2));
	gap: ${gap.var};
`;

export const PanelsZone = styled.div`
	display: grid;
	grid-template-columns: calc(60% - ${gap.var} / 2) calc(40% - ${gap.var} / 2);
	gap: ${gap.var};
	font-size: ${fontStep(0, "normal")};
	overflow: hidden;
`;

import { Actions } from "./components/SlidePreview.css";
export const ActionsPrevNext = styled(Actions)`
	gap: 1rem;
	align-items: center;
	* { flex: 1; }
`;
export const ActionsTimer = styled(Actions)`
	gap: 1rem;
	justify-content: flex-end;
	align-items: center;
`;
