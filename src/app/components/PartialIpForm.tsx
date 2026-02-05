import { type FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "@/core/translations";
import { usePartialIp } from "../core/usePartialIp";
import { Form, Input } from "../index.css";

const lastIpName = "last-ip";

export function PartialIpForm({
	id,
	onIp,
	onInput,
	isLoading,
}: {
	id?: string;
	onIp: (ip: string) => void;
	onInput?: () => void;
	isLoading?: boolean;
}) {
	const { t } = useTranslation();
	const [ipEnding, setIpEnding] = useState("");
	const ipBeginningAuto = usePartialIp();
	const disabled = ipBeginningAuto.error || isLoading;
	const ip = ipBeginningAuto.loading ? "" : ipBeginningAuto.value + ipEnding;

	useEffect(() => {
		if (ipBeginningAuto.error) {
			toast.error("Atomatic IP detection failed", { toastId: lastIpName });
			return;
		}
		if (!ip || !ipEnding) return;
		onIp(ip);
	}, [ip, ipEnding, onIp, ipBeginningAuto.error]);
	function handleIpSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const lastIpElement = (e.target as HTMLFormElement).elements.namedItem(lastIpName) as HTMLInputElement;
		setIpEnding(lastIpElement.value);
	}
	return (
		<Form id={id} onSubmit={handleIpSubmit} aria-disabled={disabled}>
			<Input
				name={lastIpName}
				type="text"
				pattern="[0-9]{1,3}"
				inputMode="numeric"
				placeholder={t`homeCodePlaceholder`}
				onKeyDown={onInput}
				required
				disabled={disabled}
			/>
		</Form>
	);
}
export default PartialIpForm;
