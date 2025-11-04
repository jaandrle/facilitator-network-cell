
import { useTranslation } from "@/core/translations";
import { Main, MainIpHr, MainIp } from "./components/index.css";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { Button } from "@/components/buttons";
import { PartialIpForm } from "./components/PartialIpForm";
import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { LanguageForm } from "./components/LanguageForm";
import { LayoutEntry } from "./components/layout";

export const Route = createFileRoute("/")({
	component: Page,
});

export function Page() {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
	async function handleIp(ip: string) {
		try {
			if (!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) throw new Error("Scanned QR code seems invalid");
			setIsLoading(false);
			navigate({ to: "/dashboard/$ip", params: { ip } });
		} catch (error) {
			setIsLoading(false);
			if (!(error instanceof Error)) return toast.error("Unknown error: " + error);
			toast.error(error.message);
		}
	}
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
			if (!(error instanceof Error)) return toast.error("Unknown error: " + error);
			if (error.message.includes("cancelled")) return;
			toast.error(error.message);
		}
	}
	return (
		<LayoutEntry title={t`homeTitle`} subtitle={t`homeSubtitle`}>
			<Main>
				<MainIp aria-busy={isLoading} aria-live="polite">
					<PartialIpForm onIp={handleIp} isLoading={isLoading} />
					<MainIpHr>{t`homeOr`}</MainIpHr>
					<Button onClick={handleIpScan} type="button">
						{t`homeScanQrCode`}
					</Button>
				</MainIp>
				<LanguageForm />
			</Main>
		</LayoutEntry>
	);
}
