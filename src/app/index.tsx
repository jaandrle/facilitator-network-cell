// Pages
import * as home from "./home";
import * as ip from "./ip";
import * as notFound from "./not-found";

import { HashRouter, Route, Routes } from "react-router-dom";
import { useBackButtonRegister } from "@/core/useBackButton";
import {useEffect} from "react";
import { useTranslationInit } from "@/core/translations";

export function App() {
	const { loading, language }= useTranslationInit();
	useEffect(()=> {
		document.documentElement.lang= language;
	}, [language]);
	useEffect(()=> {
		document.body.dataset.js_state= loading ? "loading" : "ready";
	}, [loading]);
	useBackButtonRegister();
	return (
		<HashRouter>
			<Routes>
				<Route path={home.route} element={<home.Page />} />
				<Route path="/" element={<home.Page />} />
				<Route path={ip.route} element={<ip.Page />} />
				<Route path={notFound.route} element={<notFound.Page />} />
			</Routes>
		</HashRouter>
	);
}
export default App;
