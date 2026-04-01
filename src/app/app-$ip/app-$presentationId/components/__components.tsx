import { Sidebar } from "./Sidebar";
import atoms from "../core/atoms";
import { useSetAtomsFromPage, useTranslationInit } from "@/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();
export function SidebarTest() {
	useSetAtomsFromPage(atoms, { ip: VITE.IP_ADDRESSES_AUTO, presentationId: "1", slide: 1 });
	const { language: lang, i18n } = useTranslationInit();
	useEffect(() => {
		Object.assign(document.documentElement, { lang, dir: i18n.dir() });
	}, [lang, i18n.dir]);
	return (
		<QueryClientProvider client={queryClient}>
			<Sidebar />
		</QueryClientProvider>
	);
}
