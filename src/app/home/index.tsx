import { useTranslation } from "@/core/translations";
import { LayoutEntry, Main, MainHr, MainIp } from "./index.css";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { Button } from "@/components/buttons";
import { PartialIpForm } from "./components/PartialIpForm";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { path as pathIpPage } from "../ip";
import { toast } from "react-toastify";

export const route= "home" as const;
export const path= route;
export function Page() {
	const [ isLoading, setIsLoading ] = useState(false);
	const { t, language, changeLanguage } = useTranslation();
	const navigate= useNavigate();
	const handleIp= useCallback(async function (ip: string){
		try {
			if(!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip))
				throw new Error("Scanned QR code seems invalid");
			setIsLoading(false);
			navigate(pathIpPage + ip);
		} catch (error) {
			setIsLoading(false);
			if(!(error instanceof Error))
				return toast.error("Unknown error: " + error);
			toast.error(error.message);
		}
	}, [navigate]);
	const handleIpScan= useCallback(async function (){
		if(isLoading) return;
		setIsLoading(true);
		try {
			const result= await CapacitorBarcodeScanner.scanBarcode({
				hint: CapacitorBarcodeScannerTypeHint.QR_CODE
			});
			let { ScanResult= "" }= result || {};
			ScanResult= ScanResult.trim();
			handleIp(ScanResult);
		} catch (error) {
			setIsLoading(false);
			if(!(error instanceof Error))
				return toast.error("Unknown error: " + error);
			if(error.message.includes("cancelled"))
				return;
			toast.error(error.message);
		}
	}, [handleIp]);
	return (
		<LayoutEntry
			title={t`homeTitle`}
			subtitle={t`homeSubtitle`}
		>
			<Main>
				<MainIp aria-busy={isLoading} aria-live="polite">
					<PartialIpForm onIp={handleIp} isLoading={isLoading} />
					<MainHr>{t`homeOr`}</MainHr>
					<Button onClick={handleIpScan} type="button">
						{t`homeScanQrCode`}
					</Button>
				</MainIp>
			</Main>
		</LayoutEntry>
	);
}
export default Page;

