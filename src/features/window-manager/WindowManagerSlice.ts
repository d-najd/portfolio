import type { defaultSliceStates } from "../../utils/sliceUtil"
import { createAppSlice } from "../../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface WindowManager {
	windows: Window[]
	// May contain stuff like action window and stuff that's why its separated
}

export interface Window {
	/**
	 * Window id is being used instead of index because the index will be pain to update in every part of the app which
	 * may alter it
	 */
	id: number
	/**
	 * Refers to the position of the current window in the bottom bar
	 */
	index: number
	/**
	 * Name of the window
	 */
	name: string
	width: number
	height: number
	offsetY: number
	offsetX: number
}

/**
 * Due to redux functions needing to be completely pure a counter is used as the id for the window
 */
let windowIdCounter = 0

export function getNextWindowId(): number {
	return windowIdCounter++
}

export interface WindowManagerState {
	readonly data: WindowManager
	readonly status: defaultSliceStates
}

const initialState: WindowManagerState = {
	data: {
		windows: [
			{
				id: getNextWindowId(),
				index: 0,
				name: "Window 1",
				width: 20,
				height: 20,
				offsetX: 20,
				offsetY: 5,
			},
			{
				id: getNextWindowId(),
				index: 1,
				name: "Window 2",
				width: 20,
				height: 20,
				offsetX: 30,
				offsetY: 5,
			},
			{
				id: getNextWindowId(),
				index: 2,
				name: "Window 3",
				width: 20,
				height: 20,
				offsetX: 5,
				offsetY: 30,
			},
		],
	},
	status: "idle",
}

export const windowManagerSlice = createAppSlice({
	name: "bottom-panel",
	initialState,
	reducers: create => ({
		closeWindow: (state, action: PayloadAction<number>) => {
			state.data.windows = state.data.windows.filter(o => o.id !== action.payload)
		}
	}),
	selectors: {
		selectWindowManager: state => state.data,
		selectWindowManagerStatus: state => state.status,
		selectWindows: state => state.data.windows
	},
})


export const { closeWindow } = windowManagerSlice.actions

export const { selectWindowManager, selectWindowManagerStatus, selectWindows } =
	windowManagerSlice.selectors
