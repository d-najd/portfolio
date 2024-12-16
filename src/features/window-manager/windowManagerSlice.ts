import { createAppSlice } from "../../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { defaultSliceStates } from "../../utils/sliceUtil"

export interface WindowManager {
	windows: Window[]
	// May contain stuff like action window and stuff that's why its separated
}

/**
 * TODO move this to another module
 */
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
}

export interface WindowManagerSliceState {
	readonly data: WindowManager
	readonly status: defaultSliceStates
}

/**
 * Due to redux functions needing to be completely pure a counter is used as the id for the window
 */
let windowIdCounter = 0
export function getNextWindowId(): number { 
	return windowIdCounter++
}

const initialState: WindowManagerSliceState = {
	data: {
		windows: [
			{
				id: getNextWindowId(),
				index: 0,
				name: "Window 1"
			},
			{
				id: getNextWindowId(),
				index: 1,
				name: "Window 2"
			},
			{
				id: getNextWindowId(),
				index: 2,
				name: "Window 3"
			}
		]
	},
	status: "idle",
}

export const windowManagerSlice = createAppSlice({
	name: "window-manager",
	initialState,
	reducers: create => ({
		closeWindow: create.reducer((state, action: PayloadAction<number>) => {
			state.data.windows = state.data.windows.filter(o => o.id !== action.payload)
		}),
	}),
	selectors: {
		selectWidows: windowManager => windowManager.data,
		selectStatus: windowManager => windowManager.status,
	}
})

export const { closeWindow } = windowManagerSlice.actions

export const { selectWidows, selectStatus } = windowManagerSlice.selectors