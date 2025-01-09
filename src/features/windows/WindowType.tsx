import { ProjectsWindowContent } from "./projects/ProjectsWindowContent"
import type { ReactNode } from "react"

/**
 * @see {GetWindowContentByWindowType}
 */
export enum WindowType {
	Undefined = "Undefined",
	Projects = "Projects"
}

export const GetWindowContentByWindowType = (
	windowType: WindowType
): ReactNode => {
	switch (windowType) {
		case WindowType.Projects:
			return ProjectsWindowContent()
		default:
			return <></>
	}
}
