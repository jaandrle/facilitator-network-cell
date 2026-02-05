import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/";
import { useTranslation } from "@/core/";
import { LanguageForm, LayoutEntry, PartialIpForm } from "./components/";
import { Main, MainIp, MainIpHr } from "./index.css";
import { useFindSocketIp } from "@/api";

export const Route = createFileRoute("/")({
	component: Page,
});

export function Page() {
	const idForm = useId();
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const handleIp = useRef(async function handleIp(ip: string) {
		try {
			if (!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) throw new Error("Scanned QR code seems invalid");
			setIsLoading(false);
			navigate({ to: "/dashboard/$ip", params: { ip } });
		} catch (error) {
			setIsLoading(false);
			if (!(error instanceof Error)) return toast.error(`Unknown error: ${error}`);
			toast.error(error.message);
		}
	}).current;
	const ipFound = useFindSocketIp(); //TODO: test
	useEffect(() => {
		if (ipFound.state !== "success" || !ipFound.ip) return;
		handleIp(ipFound.ip);
	}, [ipFound, handleIp]);
	async function handleIpScan() {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const result = await CapacitorBarcodeScanner.scanBarcode({
				hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
			});
			let { ScanResult = "" } = result || {};
			ScanResult = ScanResult.trim();
			handleIp(ScanResult);
		} catch (error) {
			setIsLoading(false);
			if (!(error instanceof Error)) return toast.error(`Unknown error: ${error}`);
			if (error.message.includes("cancelled")) return;
			toast.error(error.message);
		}
	}
	return (
		<LayoutEntry title={t`homeTitle`} subtitle={t`homeSubtitle`}>
			<Main>
				<MainIp aria-busy={isLoading} aria-live="polite">
					<PartialIpForm id={idForm} onIp={handleIp} isLoading={isLoading} />
					<MainIpHr>{t`homeOr`}</MainIpHr>
					<Button onClick={handleIpScan} type="button">
						{t`homeScanQrCode`}
					</Button>
					<LanguageForm />
					<Button formTarget={idForm} type="submit">{t`homeConnect`}</Button>
				</MainIp>
			</Main>
		</LayoutEntry>
	);
}
