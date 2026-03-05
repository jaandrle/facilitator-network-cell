import type { SVGAttributes } from "react";

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
		<svg role={role} {...props}>
			<title>{children}</title>
			<use href={`#${icon}`} />
		</svg>
	);
}
