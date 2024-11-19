import { Layout as LayoutRaw } from "@/ui/layout";
import { Outlet, useParams } from "react-router-dom";
import { useAPI } from "@/api";

export const route= "/dashboard/:ip/" as const;
export const path= "/dashboard/" as const;

export function Layout() {
	const { ip } = useParams() as { ip: string };
	const api= useAPI(ip);
	const isConnected= api.readyState === WebSocket.OPEN;

	return (
		<LayoutRaw aria-busy={!isConnected} aria-live="polite">
			<Outlet context={api} />
		</LayoutRaw>
	);
}
export default Layout;
