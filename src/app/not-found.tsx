import { Link } from "react-router-dom";

export const route= "/*" as const;
export function Page(){
	return (
		<>
			<h1>Not Found</h1>
			<Link to="/">GO HOME</Link>
		</>
	);
}

export default Page;
