import { css, type RuleSet } from "styled-components";

const style = document.createElement("style");
document.head.appendChild(style);

type Name = `--view-${string}`;
const key = "data-js-viev-transition";

const names = new Set<string>();
const store = new WeakMap<RuleSet, Name>();
export async function startViewTransition(target: RuleSet | "", update: () => void) {
	if (!target || !store.has(target)) return;
	const name = store.get(target);
	if (!name) return;
	const { documentElement } = document;
	documentElement.setAttribute(key, name);
	const transition = document.startViewTransition(update);
	await transition.finished;
	documentElement.removeAttribute(key);
}
/**
 * @param cssRules You can use `--_name` as an alias for the name
 * */
export function viewTransition(name: Name, cssRules: RuleSet) {
	if (names.has(name)) return "";
	names.add(name);
	const cssString = cssRules.join("").replaceAll("--_name", name);
	style.append(cssString);
	const out = css`
		@media not (prefers-reduced-motion: reduce) {
			html[${key}="${name}"] & {
				view-transition-name: ${name};
			}
		}
	`;
	store.set(out, name);
	return out;
}
