/**
 * Contains list of all possible windows/icons, the string refers to the name of
 * the window/icon
 * @remarks this is done because windows and icons share the same name and
 * actions.
 * @remarks the window can have different name than what is in the window type
 */
export enum WindowType {
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
