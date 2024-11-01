import { Layout, Header, SubHeader, Logo, Main, Footer } from "./layout.css";

import { ReactElement, useLayoutEffect, useState } from "react";
import logoSrc from "@/assets/cis-logo.png";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import {useTranslation} from "@/core/translations";

export function LayoutEntry({
	title,
	subtitle,
	children
}: {
	title: string;
	subtitle: string;
	children: ReactElement<typeof Main>;
}){
	const { t } = useTranslation();
	const [ version, setVersion ]= useState(Capacitor.getPlatform()==="web" ? "web" : "…");
	useLayoutEffect(() => {
		App.getInfo().then(info => setVersion(info.version)).catch(()=> {});
	}, []);
	return (
		<Layout data-variant="entry">
			<Header>{title}</Header>
			<SubHeader>{subtitle}</SubHeader>
			<Logo src={logoSrc} alt="CIS Logo" />
			{children}
			<Footer>{t`home.version`} {version}</Footer>
		</Layout>
	);
}
