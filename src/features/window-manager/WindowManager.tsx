import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeWindow, selectWidows } from "./windowManagerSlice"

export const WindowManager = () => {
	const dispatch = useAppDispatch()
	const windowManager = useAppSelector(selectWidows)

	// Component that draws windows inside the bottom panel
	return (
		<>
		{windowManager.windows.map((window) => {
			return (<button 
				key = {"@@window-manager/" + window.id} 
				onClick={() => 
					dispatch(closeWindow(window.id))}>
				{window.name}
			</button>)
		})}
		</>
	)
}