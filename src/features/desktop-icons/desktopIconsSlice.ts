import type { defaultSliceStates } from "../../utils/sliceUtil"
import { createAppSlice } from "../../app/createAppSlice"

import myComputerIco from "../../resources/windows_95_icons/Computers/My Computer.ico"
import recycleBinIco from "../../resources/windows_95_icons/Recycle Bins/Empty Recycle Bin.ico"
import resumeIco from "../../resources/windows_95_icons/Notepads & Writing/Writing on sheet.ico"
import projectsIco from "../../resources/windows_95_icons/Folders/Documents Folder.ico"
import sendMailIco from "../../resources/windows_95_icons/Mail & Letters/Mail.ico"
import linkedInIco from "../../resources/icons/linkedIn.ico"
import githubIco from "../../resources/icons/GitHub_Invertocat_Light.svg"
import msDosPromptIco from "../../resources/icons/MS-DOS logo.ico"
import type { PayloadAction } from "@reduxjs/toolkit"
import { DesktopIconType } from "./desktopIconActions"

export interface DesktopIcon {
	id: number
	name: string
	iconUrl: string
	iconType: DesktopIconType
}

interface DesktopIconsState {
	icons: DesktopIcon[]
	selectedIcon: number
	status: defaultSliceStates
}

let iconIdCounter = 0

function getNextIconId(): number {
	return iconIdCounter++
}

const initialState: DesktopIconsState = {
	icons: [
		{
			id: getNextIconId(),
			name: "My Computer",
			iconUrl: myComputerIco,
			iconType: DesktopIconType.Undefined
		},
		{
			id: getNextIconId(),
			name: "Recycle Bin",
			iconUrl: recycleBinIco,
			iconType: DesktopIconType.Undefined
		},
		{
			id: getNextIconId(),
			name: "Resume",
			iconUrl: resumeIco,
			iconType: DesktopIconType.Undefined
		},
		{
			id: getNextIconId(),
			name: "Projects",
			iconUrl: projectsIco,
			iconType: DesktopIconType.Projects
		},
		{
			id: getNextIconId(),
			name: "Send Mail",
			iconUrl: sendMailIco,
			iconType: DesktopIconType.Undefined
		},
		{
			id: getNextIconId(),
			name: "LinkedIn",
			iconUrl: linkedInIco,
			iconType: DesktopIconType.LinkedIn
		},
		{
			id: getNextIconId(),
			name: "Github",
			iconUrl: githubIco,
			iconType: DesktopIconType.Github
		},
		{
			id: getNextIconId(),
			name: "MS-DOS Prompt",
			iconUrl: msDosPromptIco,
			iconType: DesktopIconType.Undefined
		}
	],
	selectedIcon: -1,
	status: "idle"
}

export const desktopIconsSlice = createAppSlice({
	name: "desktop-icons",
	initialState,
	reducers: create => ({
		onSelectDesktopIcon: (state, action: PayloadAction<number>) => {
			state.selectedIcon = action.payload
		},
		onProjectsClicked: state => {}
	}),
	selectors: {
		selectDesktopIconsStatus: state => state.status,
		selectDesktopIcon: (state, id: number) =>
			state.icons.find(o => o.id === id)!,
		selectDesktopIcons: state => state.icons,
		selectSelectedDesktopIcon: state => state.selectedIcon
	}
})

export const { onSelectDesktopIcon, onProjectsClicked } =
	desktopIconsSlice.actions

export const {
	selectDesktopIconsStatus,
	selectDesktopIcons,
	selectDesktopIcon,
	selectSelectedDesktopIcon
} = desktopIconsSlice.selectors
