import { color } from "@/ui/colors";
import { borderRadius } from "@/ui/sizes";
import { styled } from "styled-components";

export const Input = styled.input`
	text-align: center;
	background: rgba(255, 253, 253, 1);
	border: 1px solid rgba(165, 165, 165, 0.4);
	border-radius: ${borderRadius.var};
	box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.51);
	padding: .5em;

	&::placeholder {
		color: ${color("gray", 60)};
		text-transform: uppercase;
	}
	&:focus{
		outline-width: 0;
	}
	&:focus-visible{
		outline-width: 1px;
	}
	&:not(:placeholder-shown):invalid{
		color: ${color("red", 40)}
	}
`;
