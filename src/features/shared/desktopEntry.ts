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
import linkedInIco from "../../resources/icons/linkedIn.ico"
import githubIco from "../../resources/icons/GitHub_Invertocat_Light.svg"
import msDosPromptIco from "../../resources/icons/MS-DOS logo.ico"

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
	Github = "Github",
	Terminal = "MS-DOS Prompt",
}

export interface DesktopEntry {
	type: DesktopEntryType
	icon: string
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
			}
		case DesktopEntryType.MyComputer:
			return {
				type: entry,
				icon: myComputerIco,
			}
		case DesktopEntryType.RecycleBin:
			return {
				type: entry,
				icon: recycleBinIco,
			}
		case DesktopEntryType.Resume:
			return {
				type: entry,
				icon: resumeIco,
			}
		case DesktopEntryType.Projects:
			return {
				type: entry,
				icon: projectsIco,
			}
		case DesktopEntryType.SendMail:
			return {
				type: entry,
				icon: sendMailIco,
			}
		case DesktopEntryType.LinkedIn:
			return {
				type: entry,
				icon: linkedInIco,
			}
		case DesktopEntryType.Github:
			return {
				type: entry,
				icon: githubIco,
			}
		case DesktopEntryType.Terminal:
			return {
				type: entry,
				icon: msDosPromptIco,
			}
		default:
			console.error("desktop entry not set " + entry)
			return {
				type: entry,
				icon: "",
			}
	}
}
