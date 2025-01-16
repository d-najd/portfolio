import { ProjectsWindowContent } from "./projects/components/ProjectsWindowContent"
import type { ReactNode } from "react"
import type { MyWindow } from "../window/windowSlice"
import { WindowType } from "../window-drawer/windowDrawerSlice"
import type { Size } from "../../ui/transforms"

interface GetWindowContentByWindowTypeProps extends Size {
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
}: GetWindowContentByWindowTypeProps): ReactNode => {
	switch (myWindow.windowType) {
		case WindowType.Projects:
			return <ProjectsWindowContent width={width} height={height} />
		default:
			return <>{myWindow.windowType}</>
	}
}
