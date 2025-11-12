type CssValue = string | number | boolean;
type CssVariable<T extends CssValue> = {
	/** Returns CSS variable defintion */
	def: `--${string}: ${T};`;
	/** Returns CSS variable defintion */
	redef: (value: T) => `--${string}: ${T};`;
	/** Returns CSS variable reference */
	var: T;
	/** Returns JS value */
	js: T;
	/** Returns reassigned CSS variable */
	reassign: (value: T) => CssVariable<T>;
};
export function cssVariable<T extends CssValue>(name: string, value: T): CssVariable<T> {
	return {
		def: `--${name}: ${value};`,
		redef: (value) => `--${name}: ${value};`,
		var: `var(--${name})` as T,
		js: value,
		reassign: (value) => cssVariable(name, value),
	};
}
