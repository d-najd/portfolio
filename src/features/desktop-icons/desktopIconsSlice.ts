import type { defaultSliceStates } from "@/utils/sliceUtil"
import { createAppSlice } from "@/app/createAppSlice"
import myComputerIco from "../../resources/windows_95_icons/Computers/My Computer.ico"
import recycleBinIco from "../../resources/windows_95_icons/Recycle Bins/Empty Recycle Bin.ico"
import resumeIco from "../../resources/windows_95_icons/Notepads & Writing/Writing on sheet.ico"
import projectsIco from "../../resources/windows_95_icons/Folders/Documents Folder.ico"
import sendMailIco from "../../resources/windows_95_icons/Mail & Letters/Mail.ico"
import linkedInIco from "../../resources/icons/linkedIn.ico"
import githubIco from "../../resources/icons/GitHub_Invertocat_Light.svg"
import msDosPromptIco from "../../resources/icons/MS-DOS logo.ico"
import type { PayloadAction } from "@reduxjs/toolkit"
import { unfocus } from "@/features/window/windowSlice"
import { changeActiveWindow } from "@/features/window-drawer/windowDrawerSlice"
import { WindowType } from "@/features/shared/windowType"

export interface DesktopIcon {
	id: number
	iconUrl: string
	iconType: WindowType
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
			iconUrl: myComputerIco,
			iconType: WindowType.MyComputer,
		},
		{
			id: getNextIconId(),
			iconUrl: recycleBinIco,
			iconType: WindowType.RecycleBin,
		},
		{
			id: getNextIconId(),
			iconUrl: resumeIco,
			iconType: WindowType.Resume,
		},
		{
			id: getNextIconId(),
			iconUrl: projectsIco,
			iconType: WindowType.Projects,
		},
		{
			id: getNextIconId(),
			iconUrl: sendMailIco,
			iconType: WindowType.SendMail,
		},
		{
			id: getNextIconId(),
			iconUrl: linkedInIco,
			iconType: WindowType.LinkedIn,
		},
		{
			id: getNextIconId(),
			iconUrl: githubIco,
			iconType: WindowType.Github,
		},
		{
			id: getNextIconId(),
			iconUrl: msDosPromptIco,
			iconType: WindowType.Terminal,
		},
	],
	selectedIcon: -1,
	status: "idle",
}

const unfocusIcons = (state: DesktopIconsState) => {
	state.selectedIcon = -1
}

export const desktopIconsSlice = createAppSlice({
	name: "desktop-icons",
	initialState,
	reducers: create => ({
		onSelectDesktopIcon: (state, action: PayloadAction<number>) => {
			state.selectedIcon = action.payload
		},
		onProjectsClicked: state => {},
	}),
	selectors: {
		selectDesktopIconsStatus: state => state.status,
		selectDesktopIcon: (state, id: number) =>
			state.icons.find(o => o.id === id)!,
		selectDesktopIcons: state => state.icons,
		selectSelectedDesktopIcon: state => state.selectedIcon,
	},
	extraReducers: builder => {
		builder
			.addCase(unfocus, state => {
				unfocusIcons(state)
			})
			.addCase(changeActiveWindow, state => {
				unfocusIcons(state)
			})
	},
})

export const { onSelectDesktopIcon, onProjectsClicked } =
	desktopIconsSlice.actions

export const {
	selectDesktopIconsStatus,
	selectDesktopIcons,
	selectDesktopIcon,
	selectSelectedDesktopIcon,
} = desktopIconsSlice.selectors
