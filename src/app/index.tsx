// Pages
import ConnectPage from "./connect";
import PresentationPage from "./presentation";
import NotFound from "./not-found";

import routes from "./routes-config";

import { HashRouter, Route, Routes } from "react-router-dom";
import { useBackButtonRegister } from "@/core/useBackButton";

export function App() {
	useBackButtonRegister();
	return (
		<HashRouter>
			<Routes>
				<Route path={routes.connect} element={<ConnectPage />} />
				<Route path={routes.presentation+"/*"} element={<PresentationPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	);
}
export default App;
