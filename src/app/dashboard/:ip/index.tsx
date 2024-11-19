import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/buttons";
import { ApiState, ReadyState } from "@/api";

export const route= "" as const;
export const path= "/dashboard/" as const;

export function Page() {
	const { presentation }= useOutletContext<ApiState>();

	if(presentation.readyState === ReadyState.DATA)
		console.log(presentation.data);
	return (
		<>
			<Button onClick={()=> presentation.send()} type="button">
				Send
			</Button>
		</>
	);
}
export default Page;
