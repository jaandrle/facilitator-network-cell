// Pages
import * as home from "./home";
import * as dashboard from "./dashboard";
import * as ip from "./dashboard/:ip";
import * as notFound from "./not-found";

import { HashRouter, Route, Routes } from "react-router-dom";
import { useBackButtonRegister } from "@/core/useBackButton";
import {useEffect} from "react";
import { useTranslationInit } from "@/core/translations";

export function App() {
	const { loading, language: lang, i18n }= useTranslationInit();
	useEffect(()=> {
		Object.assign(document.documentElement, { lang, dir: i18n.dir() });
	}, [lang]);
	useEffect(()=> {
		document.body.dataset.js_state= loading ? "loading" : "ready";
	}, [loading]);
	useBackButtonRegister();
	return (
		<HashRouter>
			<Routes>
				<Route path={home.route} element={<home.Page />} />
				<Route path="/" element={<home.Page />} />
				<Route path={dashboard.route} element={<dashboard.Layout />}>
					<Route path={ip.route} element={<ip.Page />} />
					{/* … routest for activities */}
				</Route>
				<Route path={notFound.route} element={<notFound.Page />} />
			</Routes>
		</HashRouter>
	);
}
export default App;
