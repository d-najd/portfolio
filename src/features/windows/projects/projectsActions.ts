import { openAndFocusTab } from "../../../components/openAndFocusTab"
import type { AppDispatch } from "../../../app/store"

/**
 * Contains list of all the projects that are planned to be listed in the
 * projects window
 */
export enum ProjectType {
	Portfolio = "Windows 95 Inspired Portfolio",
	BugTracker = "Bugtracker"
}

/**
 * Returns action based on the type of the project
 * @param projectType project type
 * @param dispatch for executing actions which require app dispatch
 */
export const GetActionByProjectType = (
	projectType: ProjectType,
	dispatch: AppDispatch
) => {
	switch (projectType) {
		case ProjectType.Portfolio: {
			openAndFocusTab("https://github.com")
			break
		}
		default:
			break
	}
}
