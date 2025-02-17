import myComputerIco
	from "../../resources/windows_95_icons/Computers/My Computer.ico"
import recycleBinIco
	from "../../resources/windows_95_icons/Recycle Bins/Empty Recycle Bin.ico"
import resumeIco
	from "../../resources/windows_95_icons/Notepads & Writing/Writing on sheet.ico"
import projectsIco
	from "../../resources/windows_95_icons/Folders/Documents Folder.ico"
import sendMailIco
	from "../../resources/windows_95_icons/Mail & Letters/Mail.ico"
import linkedInIco from "../../resources/icons/linkedin-pixel.png"
import githubIco from "../../resources/icons/github-pixel.png"
import msDosPromptIco from "../../resources/icons/MS-DOS logo.ico"
import type { AppDispatch } from "@/app/store"
import {
	onProjectsWindowOpened,
	onResumeWindowOpened,
	onSendMailWindowOpened,
} from "@/features/window/windowSlice"
import { openAndFocusTab } from "@/utils/openAndFocusTab"

/**
 * Contains list of all possible windows/icons, the string refers to the name of
 * the window/icon
 * @remarks this is done because windows and icons share the same name and
 * actions.
 * @remarks the window can have different name than what is in the window type
 */
export enum DesktopEntryType {
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
	GitHub = "GitHub",
	Terminal = "MS-DOS Prompt",
}

export interface DesktopEntry {
	type: DesktopEntryType
	icon: string
	executeAction: (dispatch: AppDispatch) => void
}

/**
 * Returns additional data associated with desktop entry, like the icon
 */
export const desktopEntryFactory = (entry: DesktopEntryType): DesktopEntry => {
	switch (entry) {
		case DesktopEntryType.Undefined:
			return {
				type: entry,
				icon: "",
				executeAction: () => {},
			}
		case DesktopEntryType.MyComputer:
			return {
				type: entry,
				icon: myComputerIco,
				executeAction: () => {},
			}
		case DesktopEntryType.RecycleBin:
			return {
				type: entry,
				icon: recycleBinIco,
				executeAction: () => {},
			}
		case DesktopEntryType.Resume:
			return {
				type: entry,
				icon: resumeIco,
				executeAction: dispatch => {
					dispatch(onResumeWindowOpened())
				},
			}
		case DesktopEntryType.Projects:
			return {
				type: entry,
				icon: projectsIco,
				executeAction: dispatch => {
					dispatch(onProjectsWindowOpened())
				},
			}
		case DesktopEntryType.SendMail:
			return {
				type: entry,
				icon: sendMailIco,
				executeAction: dispatch => {
					dispatch(onSendMailWindowOpened())
				},
			}
		case DesktopEntryType.LinkedIn:
			return {
				type: entry,
				icon: linkedInIco,
				executeAction: () => {
					openAndFocusTab(
						"https://www.linkedin.com/in/dimitar-najdovski/",
					)
				},
			}
		case DesktopEntryType.GitHub:
			return {
				type: entry,
				icon: githubIco,
				executeAction: () => {
					openAndFocusTab("https://github.com/d-najd")
				},
			}
		case DesktopEntryType.Terminal:
			return {
				type: entry,
				icon: msDosPromptIco,
				executeAction: () => {},
			}
		default:
			console.error("desktop entry not set " + entry)
			return {
				type: entry,
				icon: "",
				executeAction: () => {},
			}
	}
}
