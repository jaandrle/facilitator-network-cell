import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/buttons";
import { ApiState, ReadyState } from "@/api";
import { useTranslation } from "@/core/translations";

export const route= "" as const;
export const path= "/dashboard/" as const;

export function Page() {
	const { t }= useTranslation();
	const { presentation }= useOutletContext<ApiState>();

	if(presentation.readyState === ReadyState.DATA)
		console.log(presentation.data);
	return (
		<>
			<Button onClick={()=> presentation.send()} type="button">
				{t`dashboardButtonMenu`}
			</Button>
		</>
	);
}
export default Page;
