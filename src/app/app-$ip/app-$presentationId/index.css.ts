import { styled } from "styled-components";
import { Layout as LayoutBase } from "@/ui";

export const Layout = styled(LayoutBase)`
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100vh;
	gap: 8px;
	padding: 8px;
`;

export const SlidesZone = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
`;

export const PanelsZone = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 8px;
`;
