import { ProjectsWindowContent } from "./projects/ProjectsWindowContent"
import type { ReactNode } from "react"
import type { MyWindow } from "../window/windowSlice"
import { WindowType } from "../window-drawer/windowDrawerSlice"

interface GetWindowContentByWindowTypeProps {
	myWindow: MyWindow
	/** px */
	contentWidth: number
	/** px */
	contentHeight: number
}

export const GetWindowContentByWindowType = ({
	myWindow,
	contentWidth,
	contentHeight
}: GetWindowContentByWindowTypeProps): ReactNode => {
	switch (myWindow.windowType) {
		case WindowType.Projects:
			return (
				<ProjectsWindowContent
					myWindow={myWindow}
					contentWidth={contentWidth}
					contentHeight={contentHeight}
				/>
			)
		default:
			return <>{myWindow.windowType}</>
	}
}
