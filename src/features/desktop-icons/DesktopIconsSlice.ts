import type { defaultSliceStates } from "../../utils/sliceUtil"
import { createAppSlice } from "../../app/createAppSlice"

export interface DesktopIcon {
	id: number
	name: string
	iconUrl: string
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
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Recycle Bin",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Resume",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "My Work",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Send Mail",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Linkedin",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Github",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},

			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},

			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},
			{
				id: getNextIconId(),
				name: "Terminal",
				iconUrl: ""
			},
		],
		selectedIcon: -1
	},
	status: "idle",
}

export const desktopIconsSlice = createAppSlice({
	name: "desktop-icons",
	initialState,
	reducers: create => ({
		
	}),
	selectors: {
		selectDesktopIconsStatus: state => state.status,
		selectDesktopIcons: state => state.data.icons,
		selectSelectedDesktopIcon: state => state.data.selectedIcon,
	}
})

export const { selectDesktopIconsStatus, selectDesktopIcons, selectSelectedDesktopIcon, } = desktopIconsSlice.selectors