import { styled } from "styled-components";
import { color, fontStep } from "@/ui";

export const Input = styled.input`
	background: ${color("white")};
	border: 0;
	padding: 0;

	&::placeholder {
		color: ${color("gray", 60)};
		text-transform: uppercase;
	}
	&:focus {
		outline-width: 0;
	}
	&:not(:placeholder-shown):invalid{
		color: ${color("red", 40)}
	}
`;
export const Label = styled.label`
	display: flex;
	flex-flow: column nowrap;
	gap: ${fontStep(-1, "normal")};
	padding: ${fontStep(-1, "small")} ${fontStep(-1, "xsmall")};
	color: ${color("gray", 60)};
	cursor: pointer;

	transition: outline .25s ease-out;
	outline: 3px solid transparent;
	&:has(${Input}:focus-visible) {
		outline-color: hsla(211, 100%, 58%, 1);
	}
`;

import type { InputHTMLAttributes } from "react";
export function InputWithLabel({
	children,
	...props
}: InputHTMLAttributes<HTMLInputElement> & { children: string }) {
	return (
		<Label>
			{children}
			<Input {...props} />
		</Label>
	);
}
