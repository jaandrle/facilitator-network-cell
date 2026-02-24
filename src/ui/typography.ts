import { css } from "styled-components";

import Delivery_W_Bd from "@/assets/fonts/Delivery_W_Bd.woff2";
import Delivery_W_BdIt from "@/assets/fonts/Delivery_W_BdIt.woff2";
import Delivery_W_CdBlk from "@/assets/fonts/Delivery_W_CdBlk.woff2";
import Delivery_W_CdLt from "@/assets/fonts/Delivery_W_CdLt.woff2";
import Delivery_W_It from "@/assets/fonts/Delivery_W_It.woff2";
import Delivery_W_Lt from "@/assets/fonts/Delivery_W_Lt.woff2";
import Delivery_W_LtIt from "@/assets/fonts/Delivery_W_LtIt.woff2";
import Delivery_W_Rg from "@/assets/fonts/Delivery_W_Rg.woff2";

export const fontFamilyBase = 'Delivery, "Hind", sans-serif';
export const fontFamilyHeadings = 'Delivery, "Hind", sans-serif';
export const fontFamilyQuotes = '"Playfair Display", sans-serif';

export const cssFont = {
	regular: css`
		font-weight: 400;
		font-stretch: normal;
		font-style: normal;
	`,
	bold: css`
		font-weight: 700;
		font-stretch: normal;
		font-style: normal;
	`,
	italic: css`
		font-weight: 400;
		font-stretch: normal;
		font-style: italic;
	`,
	light: css`
		font-weight: 100;
		font-stretch: normal;
		font-style: normal;
	`,
	italicLight: css`
		font-weight: 100;
		font-stretch: normal;
		font-style: italic;
	`,
	boldItalic: css`
		font-weight: 700;
		font-stretch: normal;
		font-style: italic;
	`,
	boldCondensed: css`
		font-weight: 800;
		font-stretch: condensed;
		font-style: normal;
	`,
	condensedlight: css`
		font-weight: 200;
		font-stretch: condensed;
		font-style: normal;
	`,
} as const;
const fontStepSizes = {
	xsmall: ".1rem",
	small: ".25rem",
	normal: ".75rem",
	large: "1rem",
	xlarge: "1.5rem",
} as const;
type FontStepSizes = typeof fontStepSizes;
type FontSteps = -2 | -1 | 0 | 1 | 2;
/**
 * 1rem +/- {@link FontSteps} * {@link fontStepSizes}
 * */
export function fontStep<N extends FontSteps, S extends keyof FontStepSizes>(
	n: N,
	size: S = "small" as S,
): `calc(var(--js-app-scale) * (1.25rem + var(--font-step-${S}) * ${N}))` {
	return `calc(var(--js-app-scale) * (1.25rem + var(--font-step-${size}) * ${n}))`;
}
export const variablesFontSizes = Object.entries(fontStepSizes)
	.map(([k, v]) => `--font-step-${k}: ${v};`)
	.join("\n");

export const cssFontFaces = css`
	@font-face {
		${cssFont.regular}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_Rg}) format('woff2');
	}
	@font-face {
		${cssFont.bold}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_Bd}) format('woff2');
	}
	@font-face {
		${cssFont.boldItalic}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_BdIt}) format('woff2');
	}
	@font-face {
		${cssFont.boldCondensed}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_CdBlk}) format('woff2');
	}
	@font-face {
		${cssFont.condensedlight}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_CdLt}) format('woff2');
	}
	@font-face {
		${cssFont.italic}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_It}) format('woff2');
	}
	@font-face {
		${cssFont.light}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_Lt}) format('woff2');
	}
	@font-face {
		${cssFont.italicLight}
		font-family: 'Delivery';
		font-display: block;
		src: url(${Delivery_W_LtIt}) format('woff2');
	}
`;
