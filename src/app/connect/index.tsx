import {Link} from "@/components/buttons";
import routes from "../routes-config";

export function ConnectPage() {
	return (
		<div>
			<h1>Connect</h1>
			<Link to={routes.presentation}>
				To Presentation
			</Link>
		</div>
	);
}
export default ConnectPage;
