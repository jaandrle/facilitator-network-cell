import { useTranslation } from "@/core/translations";
import { LayoutEntry, Main, MainHr, MainIp } from "./index.css";

import { Button } from "@/components/buttons";
import { PartialIpForm } from "./components/PartialIpForm";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { path as pathIpPage } from "../ip";

export const route= "home" as const;
export const path= route;
export function Page() {
	const [ isLoading, setIsLoading ] = useState(false);
	const { t, lang, setLang } = useTranslation();
	const navigate= useNavigate();
	const handleIp= useCallback(function (ip: string){
		navigate(pathIpPage + ip);
	}, [navigate]);
	const handleIpScan= useCallback(async function (){
		setIsLoading(true);
		await new Promise(resolve => setTimeout(resolve, 1000));
		// TODO scan qr
		handleIp("999.999.999.999");
		setLang(lang==="en" ? "cs" : "en");
		setIsLoading(false);
	}, [handleIp]);
	return (
		<LayoutEntry
			title={t`home.title`}
			subtitle={t`home.subtitle`}
		>
			<Main>
				<MainIp aria-busy={isLoading} aria-live="polite">
					<PartialIpForm onIp={handleIp} />
					<MainHr>{t`home.or`}</MainHr>
					<Button onClick={handleIpScan} type="button">
						{t`home.scanQrCode`}
					</Button>
				</MainIp>
			</Main>
		</LayoutEntry>
	);
}
export default Page;

