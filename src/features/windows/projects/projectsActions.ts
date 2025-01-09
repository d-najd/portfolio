import { openAndFocusTab } from "../../../components/openAndFocusTab"

/**
 * Contains list of all the projects that are planned to be listed in the
 * projects window
 */
export enum ProjectType {
	Portfolio = "Portfolio"
}

/**
 * Returns action based on the type of the project
 * @param projectType project type
 */
export const GetActionByProjectType = (
	projectType: ProjectType
): (() => void) => {
	switch (projectType) {
		case ProjectType.Portfolio: {
			return () => {
				openAndFocusTab("https://github.com")
			}
		}
		default:
			return () => {}
	}
}
