import type { defaultSliceStates } from "@/utils/sliceUtil"
import { createAppSlice } from "@/app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import { unfocus } from "@/features/window/windowSlice"
import { DesktopEntryType } from "@/features/shared/desktopEntry"

export interface DesktopIcon {
	id: number
	iconType: DesktopEntryType
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
			iconType: DesktopEntryType.MyComputer,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.RecycleBin,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.Resume,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.Projects,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.SendMail,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.LinkedIn,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.GitHub,
		},
		{
			id: getNextIconId(),
			iconType: DesktopEntryType.Terminal,
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
	}),
	selectors: {
		selectDesktopIconsStatus: state => state.status,
		selectDesktopIcon: (state, id: number) =>
			state.icons.find(o => o.id === id)!,
		selectDesktopIcons: state => state.icons,
		selectSelectedDesktopIcon: state => state.selectedIcon,
	},
	extraReducers: builder => {
		builder.addCase(unfocus, state => {
			unfocusIcons(state)
		})
	},
})

export const { onSelectDesktopIcon } = desktopIconsSlice.actions

export const {
	selectDesktopIconsStatus,
	selectDesktopIcons,
	selectDesktopIcon,
	selectSelectedDesktopIcon,
} = desktopIconsSlice.selectors
