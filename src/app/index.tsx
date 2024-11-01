// Pages
import * as home from "./home";
import * as ip from "./ip";
import * as notFound from "./not-found";

import { HashRouter, Route, Routes } from "react-router-dom";
import { useBackButtonRegister } from "@/core/useBackButton";
import { useTranslationsContext } from "@/core/translations";
import {useEffect} from "react";

export function App() {
	const translations= useTranslationsContext();
	useEffect(()=> {
		document.body.lang= translations.lang;
	}, [translations.lang]);
	useBackButtonRegister();
	return (
		<translations.Provider value={translations.lang}>
			<HashRouter>
				<Routes>
					<Route path={home.route} element={<home.Page />} />
					<Route path="/" element={<home.Page />} />
					<Route path={ip.route} element={<ip.Page />} />
					<Route path={notFound.route} element={<notFound.Page />} />
				</Routes>
			</HashRouter>
		</translations.Provider>
	);
}
export default App;
