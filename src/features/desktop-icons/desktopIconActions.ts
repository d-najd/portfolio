import { openAndFocusTab } from "@/utils/openAndFocusTab"
import {
	onProjectsWindowOpened,
	onSendMailWindowOpened,
} from "@/features/window/windowSlice"
import type { AppDispatch } from "@/app/store"
import { WindowType } from "@/features/shared/windowType"

/**
 * Returns action based on the desktop icon clicked
 * @param iconType icon type
 * @param dispatch for executing actions which require app dispatch
 */
export const ExecuteActionByDesktopIconType = (
	iconType: WindowType,
	dispatch: AppDispatch,
) => {
	switch (iconType) {
		case WindowType.Projects: {
			dispatch(onProjectsWindowOpened())
			break
		}
		case WindowType.SendMail: {
			dispatch(onSendMailWindowOpened())
			break
		}
		case WindowType.Github: {
			openAndFocusTab("https://github.com/d-najd")
			// dispatch(onGithubWindowOpened())
			break
		}
		case WindowType.LinkedIn: {
			openAndFocusTab("https://www.linkedin.com/in/dimitar-najdovski/")
			break
		}
		default: {
			break
		}
	}
}
