import { useAppSelector } from "../../app/hooks"
import { selectWidows } from "../window-manager/windowManagerSlice"

export const WindowDrawer = () => {
	const windowManager = useAppSelector(selectWidows)

	return (<>
		
	</>)
}