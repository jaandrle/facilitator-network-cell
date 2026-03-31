import { useEffect } from "react";
import { useFindSocketIp } from "./useFindSocketIp";

export function FindSocketIp({
	onChange,
	onFinal,
}: {
	onChange?: ({ ip, state }: { ip?: string; state: "loading" | "success" | "error" }) => void;
	onFinal?: (value: unknown) => void;
}) {
	const { ip, state } = useFindSocketIp();
	useEffect(() => {
		if (onChange) onChange({ ip, state });
		if (state !== "loading" && onFinal) onFinal(undefined);
	}, [ip, state, onChange, onFinal]);
	// biome-ignore lint/complexity/noUselessFragments: test component wrapper
	return <></>;
}
