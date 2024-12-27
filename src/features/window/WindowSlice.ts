import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

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

function getNextWindowId(): number {
	return windowIdCounter++
}

export interface WindowState {
	readonly data: Window[]
	readonly status: defaultSliceStates
}

const initialState: WindowState = {
	data: [
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
	status: "idle",
}

export const windowSlice = createAppSlice({
	name: "window",
	initialState,
	reducers: create => ({
		closeWindow: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter(
				o => o.id !== action.payload,
			)
		},
	}),
	selectors: {
		selectWindowsStatus: state => state.status,
		selectWindows: state => state.data,
	},
})

export const { closeWindow } = windowSlice.actions

export const { selectWindows } = windowSlice.selectors
