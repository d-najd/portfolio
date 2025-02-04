import { openAndFocusTab } from "@/utils/openAndFocusTab"
import {
	onProjectsWindowOpened,
	onSendMailWindowOpened,
} from "@/features/window/windowSlice"
import type { AppDispatch } from "@/app/store"
import { DesktopEntryType } from "@/features/shared/desktopEntry"

/**
 * Returns action based on the desktop icon clicked
 * @param iconType icon type
 * @param dispatch for executing actions which require app dispatch
 */
export const ExecuteActionByDesktopIconType = (
	iconType: DesktopEntryType,
	dispatch: AppDispatch,
) => {
	switch (iconType) {
		case DesktopEntryType.Projects: {
			dispatch(onProjectsWindowOpened())
			break
		}
		case DesktopEntryType.SendMail: {
			dispatch(onSendMailWindowOpened())
			break
		}
		case DesktopEntryType.Github: {
			openAndFocusTab("https://github.com/d-najd")
			// dispatch(onGithubWindowOpened())
			break
		}
		case DesktopEntryType.LinkedIn: {
			openAndFocusTab("https://www.linkedin.com/in/dimitar-najdovski/")
			break
		}
		default: {
			break
		}
	}
}
