import { ProjectsWindow } from "./projects/ProjectsWindow"
import type { ReactNode } from "react"
import React from "react"
import { WindowType } from "@/features/window-drawer/windowDrawerSlice"

interface Props {
	windowType: WindowType
}

/**
 * @see WindowContentContainer.tsx each content container must extend this style
 */
export const GetWindowContentByWindowType = React.memo(
	({ windowType }: Props): ReactNode => {
		switch (windowType) {
			/*
			case WindowType.Github:
				return <GithubWindow />
			 */
			case WindowType.Projects:
				return <ProjectsWindow />
			default:
				return <>{windowType}</>
			// return <>{windowType}</>
		}
	},
)
