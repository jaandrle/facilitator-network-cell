export const lightness = {
	30: "31%",
	40: "41%",
	50: "50%",
	60: "59%",
	75: "75%",
	85: "85%",
	90: "92%",
} as const;
type Lightness = keyof typeof lightness;
const hs = {
	gray: "0 0%",
	green: "112 65%",
	red: "0 100%",
	/** DHL Red color */
	primary: "357 95%",
	/** DHL Yellow color */
	secondary: "48 100%",
} as const;
type HS = keyof typeof hs;
const hsl = {
	black: "0 0% 0%",
	white: "0 0% 100%",
	green: `${hs.green} 44%`,
	/** DHL Red color */
	primary: `${hs.primary} 43%`,
	/** DHL Yellow color */
	secondary: `${hs.secondary} 50%`,
} as const;
type HSL = keyof typeof hsl;

export const variables = [
	...Object.entries(hs).map(([k, v]) => `--hs-${k}: ${v};`),
	...Object.entries(lightness).map(([k, v]) => `--l-${k}: ${v};`),
	...Object.entries(hsl).map(([k, v]) => `--hsl-${k}: ${v};`),
].join("\n");
/**
 * Creates a CSS color:
 * ```js
 * color("primary"); //=> hsl(var(--hsl-primary))
 * color("primary", 40); //=> hsl(var(--hsl-primary) var(--l-40))
 * ```
 * */
export function color<lHS extends HS, lL extends Lightness>(hs: lHS, l: lL): `hsl(var(--hs-${lHS}) var(--l-${lL}))`;
export function color<lHSL extends HSL>(hs: lHSL): `hsl(var(--hsl-${lHSL}))`;
export function color(hs: HS | HSL, l?: Lightness) {
	if (l) return `hsl(var(--hs-${hs}) var(--l-${l}))`;
	return `hsl(var(--hsl-${hs}))`;
}
