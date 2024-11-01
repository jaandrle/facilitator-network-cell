export const lightness= {
	40: "40%",
	60: "60%",
	80: "80%",
	90: "90%",
} as const;
type Lightness= keyof typeof lightness;
const hs= {
	gray: "0 0%",
	/** DHL Red color */
	primary: "356 100%",
	/** DHL Yellow color */
	secondary: "48 100%",
} as const;
type HS= keyof typeof hs;
const hsl= {
	black: "0 0% 0%",
	white: "0 0% 100%",
	green: "120 100% 50%",
	/** DHL Red color */
	primary: hs.primary+" 35%",
	/** DHL Yellow color */
	secondary: hs.secondary+" 50%",
} as const;
type HSL= keyof typeof hsl;

export const variables= [
	...Object.entries(hs).map(([k, v])=>`--hs-${k}: ${v};`),
	...Object.entries(lightness).map(([k, v])=>`--l-${k}: ${v};`),
	...Object.entries(hsl).map(([k, v])=>`--hsl-${k}: ${v};`),
].join("\n");
/**
 * Creates a CSS color:
 * ```js
 * color("primary"); //=> hsl(var(--hsl-primary))
 * color("primary", 40); //=> hsl(var(--hsl-primary) var(--l-40))
 * ```
 * */
export function color(hs: HS, l: Lightness): string
export function color(hs: HSL): string
export function color(hs: HS | HSL, l?: Lightness): string {
	if(l) return `hsl(var(--hs-${hs}) var(--l-${l}))`;
	return `hsl(var(--hsl-${hs}))`;
}
