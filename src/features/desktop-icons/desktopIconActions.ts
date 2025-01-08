import { openAndFocusTab } from "../../components/openAndFocusTab"

/**
 * Contains list of all the possible actions that can be executed for all icons
 */
export enum DesktopIconType {
	/**
	 * Does nothing if clicked
	 */
	Undefined = "Undefined",
	Github = "Github",
	LinkedIn = "LinkedIn"
}

export const GetActionByDesktopIcon = (
	iconType: DesktopIconType
): (() => void) => {
	switch (iconType) {
		case DesktopIconType.Github: {
			return () => {
				openAndFocusTab("https://github.com/d-najd")
			}
		}
		case DesktopIconType.LinkedIn: {
			return () => {
				openAndFocusTab(
					"https://www.linkedin.com/in/dimitar-najdovski/"
				)
			}
		}
		default: {
			return () => {}
		}
	}
}
