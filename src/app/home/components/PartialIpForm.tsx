import { Input, Form } from "../index.css";

import { Button } from "@/components/buttons";
import { usePartialIp } from "../core/usePartialIp";
import { toast } from "react-toastify";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/core/translations";

const lastIpName= "last-ip";

export function PartialIpForm({
	onIp
}: {
	onIp: (ip: string) => void;
}){
	const { t }= useTranslation();
	const [ ipEnding, setIpEnding ] = useState("");
	const ipBeginningAuto = usePartialIp();
	const disabled = ipBeginningAuto.error;
	const ip= ipBeginningAuto.loading ? "" : ipBeginningAuto.value + ipEnding;

	useEffect(() => {
		if(ipBeginningAuto.error){
			toast.error("Atomatic IP detection failed");
			return;
		}
		if(!ip || !ipEnding) return;
		onIp(ip);
	}, [ip, ipEnding, onIp]);
	const handleIpSubmit = useCallback(
		function (e: FormEvent<HTMLFormElement>){
			e.preventDefault();
			const lastIpElement= ( e.target as HTMLFormElement ).elements.namedItem(lastIpName) as HTMLInputElement;
			setIpEnding(lastIpElement.value);
		},
		[]
	);
	return (
		<Form onSubmit={handleIpSubmit} aria-disabled={disabled}>
			<Input
				name={lastIpName}
				type="text"
				pattern="[0-9]{1,4}"
				inputMode="numeric"
				placeholder={t`homeCodePlaceholder`}
				required
				disabled={disabled}
			/>
			<Button type="submit" disabled={disabled}>{t`homeConnect`}</Button>
		</Form>
	)
}
export default PartialIpForm;
