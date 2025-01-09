import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { WindowDrawerWindow } from "../window-drawer/windowDrawerSlice"
import { selectWindowDrawerWindows } from "../window-drawer/windowDrawerSlice"
import { createAppSlice } from "../../app/createAppSlice"
import { useAppSelector } from "../../app/hooks"
import { ProjectType } from "../windows/projects/projectsActions"

interface BaseWindow {
	/**
	 * Window id is being used instead of index because the index will be pain to update in every part of the app which
	 * may alter it
	 */
	id: number
	/**
	 * Name of the window
	 */
	name: string
}

/**
 * Used as return type
 */
export interface MyWindow extends BaseWindow, WindowDrawerWindow {}

/**
 * Due to redux functions needing to be completely pure a counter is used as the id for the window
 */
export let windowIdCounter = -1

function getNextWindowId(): number {
	windowIdCounter++
	return windowIdCounter
}

interface WindowState {
	windows: BaseWindow[]
	status: defaultSliceStates
}

const initialState: WindowState = {
	windows: [
		{
			id: getNextWindowId(),
			name: "Window 1"
		},
		{
			id: getNextWindowId(),
			name: "Window 2"
		},
		{
			id: getNextWindowId(),
			name: "Window 3"
		}
	],
	status: "idle"
}

export const windowSlice = createAppSlice({
	name: "window",
	initialState,
	reducers: create => ({
		closeWindow: (state, action: PayloadAction<number>) => {
			state.windows = state.windows.filter(o => o.id !== action.payload)
		},
		onProjectsWindowOpened: state => {
			state.windows.push({
				id: getNextWindowId(),
				name: ProjectType.Portfolio
			})
		}
	}),
	selectors: {
		selectWindowsStatus: state => state.status,
		selectBaseWindows: state => state.windows
	}
})

/**
 * @returns list of combined (all window subtypes mixed into one) opened windows, invalid windows will not be returned
 * @see useWindow
 */
export const useWindows = (): MyWindow[] => {
	const windowDrawerWindows = useAppSelector(selectWindowDrawerWindows)
	const baseWindows = useAppSelector(selectBaseWindows)

	return baseWindows
		.map(baseWindow => {
			const windowDrawerWindow = windowDrawerWindows.find(
				o => o.id === baseWindow.id
			)
			return combineWindows(baseWindow, windowDrawerWindow) // Combine matches or return null
		})
		.filter((e): e is MyWindow => !!e) // Filter invalid windows instead of crashing the app
}

/**
 * @returns combined (all window subtypes mixed into one) opened window, if invalid
 * @param id id of the window to be combined and returned
 * @see useWindows
 */
export const useWindow = (id: number): MyWindow => {
	const windowDrawerWindows = useAppSelector(selectWindowDrawerWindows)
	const baseWindows = useAppSelector(selectBaseWindows)

	const baseWindow = baseWindows.find(baseWindow => baseWindow.id === id)
	const windowDrawerWindow = windowDrawerWindows.find(
		o => o.id === baseWindow?.id
	)

	return combineWindows(baseWindow, windowDrawerWindow)!
}

/**
 * @returns combined window types into one type or undefined if something went wrong
 */
const combineWindows = (
	baseWindow: BaseWindow | undefined,
	windowDrawerWindow: WindowDrawerWindow | undefined
): MyWindow | undefined => {
	if (baseWindow === undefined || windowDrawerWindow === undefined) {
		console.error(
			"Invalid window passed for combining, seems that not all subtypes exist for the window " +
				"or the window does not exist at all",
			[baseWindow, windowDrawerWindow]
		)
		return undefined
	}

	return {
		...baseWindow,
		...windowDrawerWindow
	}
}

export const { closeWindow, onProjectsWindowOpened } = windowSlice.actions

export const { selectBaseWindows } = windowSlice.selectors
