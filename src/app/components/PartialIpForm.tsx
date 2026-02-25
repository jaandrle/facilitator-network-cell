import { type SubmitEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "@/core";
import { usePartialIp } from "../core";
import { Form, Input, Label } from "../index.css";

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
			toast.error("Automatic IP detection failed", { toastId: lastIpName });
			return;
		}
		if (!ip || !ipEnding) return;
		onIp(ip);
	}, [ip, ipEnding, onIp, ipBeginningAuto.error]);
	function handleIpSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const lastIpElement = (e.target as HTMLFormElement).elements.namedItem(lastIpName) as HTMLInputElement;
		setIpEnding(lastIpElement.value);
	}
	return (
		<Form id={id} onSubmit={handleIpSubmit} aria-disabled={disabled}>
			<Label>
				Code
				<Input
					name={lastIpName}
					type="text"
					pattern="[0-9]{1,3}"
					inputMode="numeric"
					placeholder={t`homeCodePlaceholder`}
					onKeyDown={onInput}
					required
					disabled={disabled}>
				</Input>
			</Label>
		</Form>
	);
}
export default PartialIpForm;
