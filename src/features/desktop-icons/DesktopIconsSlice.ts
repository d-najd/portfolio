import type { defaultSliceStates } from "../../utils/sliceUtil"
import { createAppSlice } from "../../app/createAppSlice"

import myComputerIco from "../../resources/windows_95_icons/Computers/My Computer.ico"
import recycleBinIco from "../../resources/windows_95_icons/Recycle Bins/Empty Recycle Bin.ico"
import resumeIco from "../../resources/windows_95_icons/Notepads & Writing/Writing on sheet.ico"
import myWorkIco from "../../resources/windows_95_icons/Folders/Documents Folder.ico"
import sendMailIco from "../../resources/windows_95_icons/Mail & Letters/Mail.ico"
import linkedInIco from "../../resources/icons/linkedIn.ico"
import githubIco from "../../resources/icons/GitHub_Invertocat_Light.svg"
import msDosPromptIco from "../../resources/icons/MS-DOS logo.ico"
import { openAndFocusTab } from "../../components/openAndFocusTab"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface DesktopIcon {
	id: number
	name: string
	iconUrl: string
	action: () => void
}

export interface DesktopIcons {
	icons: DesktopIcon[]
	selectedIcon: number
}

export interface DesktopIconsState {
	data: DesktopIcons
	status: defaultSliceStates
}

let iconIdCounter = 0

function getNextIconId(): number {
	return iconIdCounter++
}

const initialState: DesktopIconsState = {
	data: {
		icons: [
			{
				id: getNextIconId(),
				name: "My Computer",
				iconUrl: myComputerIco,
				action: () => {}
			},
			{
				id: getNextIconId(),
				name: "Recycle Bin",
				iconUrl: recycleBinIco,
				action: () => {}
			},
			{
				id: getNextIconId(),
				name: "Resume",
				iconUrl: resumeIco,
				action: () => {}
			},
			{
				id: getNextIconId(),
				name: "My Work",
				iconUrl: myWorkIco,
				action: () => {}
			},
			{
				id: getNextIconId(),
				name: "Send Mail",
				iconUrl: sendMailIco,
				action: () => {}
			},
			{
				id: getNextIconId(),
				name: "LinkedIn",
				iconUrl: linkedInIco,
				action: () =>
					openAndFocusTab(
						"https://www.linkedin.com/in/dimitar-najdovski/"
					)
			},
			{
				id: getNextIconId(),
				name: "Github",
				iconUrl: githubIco,
				action: () => openAndFocusTab("https://github.com/d-najd")
			},
			{
				id: getNextIconId(),
				name: "MS-DOS Prompt",
				iconUrl: msDosPromptIco,
				action: () => {}
			}
		],
		selectedIcon: -1
	},
	status: "idle"
}

export const desktopIconsSlice = createAppSlice({
	name: "desktop-icons",
	initialState,
	reducers: create => ({
		selectIcon: (state, action: PayloadAction<number>) => {
			state.data.selectedIcon = action.payload
		},
		onMyWorkClicked: state => {}
	}),
	selectors: {
		selectDesktopIconsStatus: state => state.status,
		selectDesktopIcons: state => state.data.icons,
		selectSelectedDesktopIcon: state => state.data.selectedIcon
	}
})

export const { selectIcon: selectDesktopIcon, onMyWorkClicked } =
	desktopIconsSlice.actions

export const {
	selectDesktopIconsStatus,
	selectDesktopIcons,
	selectSelectedDesktopIcon
} = desktopIconsSlice.selectors
