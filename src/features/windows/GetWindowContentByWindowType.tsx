import { ProjectsWindow } from "./projects/components/ProjectsWindow"
import type { ReactNode } from "react"
import React from "react"
import type { Size } from "@/ui/transforms"
import { WindowType } from "@/features/window-drawer/windowDrawerSlice"

interface Props extends Size {
	windowType: WindowType
	/** px */
	width: number
	/** px */
	height: number
}

export const GetWindowContentByWindowType = React.memo(
	({ windowType, width, height }: Props): ReactNode => {
		switch (windowType) {
			case WindowType.Projects:
				return <ProjectsWindow width={width} height={height} />
			default:
				return <>{windowType}</>
		}
	},
)
