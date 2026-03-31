import { color } from "@/ui";
import type { SVGAttributes } from "react";
import styled from "styled-components";

const Svg = styled.svg`
	max-height: 100%;
	aspect-ratio: 1;
	object-fit: contain;
	color: ${color("primary")};
`;

export type SvgIconId = string & { __SvgIconId: never };
export function SvgIcon({
	icon,
	role = "graphics-symbol",
	children,
	...props
}: {
	icon: SvgIconId;
	role?: SVGAttributes<SVGElement>["role"];
	children?: string;
} & Omit<SVGAttributes<SVGElement>, "role">) {
	return (
		<Svg role={role} {...props}>
			{children && <title>{children}</title>}
			<use href={`#${icon}`} />
		</Svg>
	);
}
