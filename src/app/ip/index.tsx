import { Layout } from "@/ui/layout";
import {useParams} from "react-router-dom";

export const route= "/ip/:ip" as const;
export const path= "/ip/" as const;
/**
 * @todo implement
 * */
export function Page() {
	const { ip } = useParams();
	console.log(ip);
	return (
		<Layout>
			<h1>Facilitator Network Cell</h1>
		</Layout>
	);
}
export default Page;
