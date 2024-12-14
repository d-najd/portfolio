import type { OnTestFailedHandler } from "vitest"
import { createAppSlice } from "../../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface WindowManager {
	windows: Window[]
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
}

export interface WindowManagerSliceState {
	readonly data: WindowManager
	readonly status: "idle" | "loading" | OnTestFailedHandler
	/**
	 * Due to redux functions needing to be completely pure a counter is used as the id for the window
	 */
	readonly windowIdCounter: number
}

const initialState: WindowManagerSliceState = {
	data: {
		windows: [
			{
				id: 0,
				index: 0,
				name: "Window 1"
			},
			{
				id: 1,
				index: 1,
				name: "Window 2"
			},
			{
				id: 2,
				index: 2,
				name: "Window 3"
			}
		]
	},
	status: "idle",
	windowIdCounter: 1
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