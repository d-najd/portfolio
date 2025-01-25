import { openAndFocusTab } from "../../utils/openAndFocusTab"
import {
	onGithubWindowOpened,
	onProjectsWindowOpened,
} from "../window/windowSlice"
import type { AppDispatch } from "../../app/store"

/**
 * Contains list of all the possible actions that can be executed for all icons
 */
export enum DesktopIconType {
	/**
	 * Does nothing if clicked
	 */
	Undefined = "Undefined",
	MyComputer = "My Computer",
	Projects = "Projects",
	Github = "Github",
	LinkedIn = "LinkedIn",
}

/**
 * Returns action based on the desktop icon clicked
 * @param iconType icon type
 * @param dispatch for executing actions which require app dispatch
 */
export const ExecuteActionByDesktopIconType = (
	iconType: DesktopIconType,
	dispatch: AppDispatch,
) => {
	switch (iconType) {
		case DesktopIconType.Projects: {
			dispatch(onProjectsWindowOpened())
			break
		}
		case DesktopIconType.Github: {
			dispatch(onGithubWindowOpened())
			break
		}
		case DesktopIconType.LinkedIn: {
			openAndFocusTab("https://www.linkedin.com/in/dimitar-najdovski/")
			break
		}
		default: {
			break
		}
	}
}
