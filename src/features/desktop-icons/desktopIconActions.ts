import { openAndFocusTab } from "@/utils/openAndFocusTab"
import { onProjectsWindowOpened } from "@/features/window/windowSlice"
import type { AppDispatch } from "@/app/store"

/**
 * Contains list of all the possible actions that can be executed for all icons
 */
export enum DesktopIconType {
	/**
	 * Does nothing if clicked
	 */
	Undefined = "Undefined",
	MyComputer = "My Computer",
	RecycleBin = "Recycle Bin",
	Resume = "Résumé",
	Projects = "Projects",
	SendMail = "Send Mail",
	LinkedIn = "LinkedIn",
	Github = "Github",
	Terminal = "MS-DOS Prompt",
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
			openAndFocusTab("https://github.com/d-najd")
			// dispatch(onGithubWindowOpened())
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
