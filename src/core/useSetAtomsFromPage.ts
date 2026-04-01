import { useSetAtom, type Atom } from "jotai";

export function useSetAtomsFromPage<P extends Record<string, unknown>, S extends Record<string, unknown>>(
	atoms: Record<string, Atom<unknown>>,
	params: P,
	search?: S,
) {
	for (const [atom, value] of Object.entries(atoms)) {
		const isParam = Object.hasOwn(params, atom);
		const isSearch = search && Object.hasOwn(search, atom);
		if (!isParam && !isSearch) continue;
		// @ts-expect-error TS2769
		// biome-ignore lint/correctness/useHookAtTopLevel: `atoms` must be static
		const setter = useSetAtom(value);
		setter((isSearch ? search : params)[atom]);
	}
	return { ...params, ...search };
}
