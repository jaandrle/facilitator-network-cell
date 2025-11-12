import { type FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/buttons";
import { useTranslation } from "@/core/translations";
import { Form, Input } from "./index.css";
import { usePartialIp } from "./usePartialIp";

const lastIpName = "last-ip";

export function PartialIpForm({ onIp, isLoading }: { onIp: (ip: string) => void; isLoading?: boolean }) {
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
		<Form onSubmit={handleIpSubmit} aria-disabled={disabled}>
			<Input
				name={lastIpName}
				type="text"
				pattern="[0-9]{1,3}"
				inputMode="numeric"
				placeholder={t`homeCodePlaceholder`}
				required
				disabled={disabled}
			/>
			<Button type="submit" disabled={disabled}>{t`homeConnect`}</Button>
		</Form>
	);
}
export default PartialIpForm;
