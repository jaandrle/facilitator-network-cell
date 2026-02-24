import { styled } from "styled-components";
import { color } from "@/ui";

export const Slider = styled.input.attrs({ type: "range" })`
	appearance: none;
	width: 0;
	flex: 1;
	height: 6px;
	background: ${color("gray", 85)};
	border-radius: 10px;
	outline: none;
	cursor: pointer;

	&::-webkit-slider-thumb {
		appearance: none;
	}

	&::-webkit-slider-thumb,
	&::-moz-range-thumb {
		width: 28px;
		height: 28px;
		background: ${color("gray", 40)};
		border-radius: 50%;
		border: none;
	}
`;
export const Container = styled.fieldset`
	border: none;
	padding: 0;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	width: 100%;
	gap: .25em;
`;

export const Button = styled.button`
	border: none;
	background: transparent;
	cursor: pointer;
`;
import { SvgIcon as SvgIconRaw } from "@/components";
export const SvgIcon = styled(SvgIconRaw)`
	width: 1em;
	color: ${color("gray", 40)};
`;
