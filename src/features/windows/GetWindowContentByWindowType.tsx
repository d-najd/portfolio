import { ProjectsWindow } from "./projects/components/ProjectsWindow"
import type { ReactNode } from "react"
import React from "react"
import { WindowType } from "@/features/window-drawer/windowDrawerSlice"

interface Props {
	windowType: WindowType
}

export const GetWindowContentByWindowType = React.memo(
	({ windowType }: Props): ReactNode => {
		switch (windowType) {
			case WindowType.Projects:
				return <ProjectsWindow />
			default:
				return <>{windowType}</>
		}
	},
)
