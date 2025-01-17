import { ProjectsWindow } from "./projects/components/ProjectsWindow"
import type { ReactNode } from "react"
import type { MyWindow } from "../window/windowSlice"
import { WindowType } from "../window-drawer/windowDrawerSlice"
import type { Size } from "../../ui/transforms"

interface Props extends Size {
	myWindow: MyWindow
	/** px */
	width: number
	/** px */
	height: number
}

export const GetWindowContentByWindowType = ({
	myWindow,
	width,
	height
}: Props): ReactNode => {
	switch (myWindow.windowType) {
		case WindowType.Projects:
			return <ProjectsWindow width={width} height={height} />
		default:
			return <>{myWindow.windowType}</>
	}
}
