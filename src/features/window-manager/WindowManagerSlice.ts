import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { closeWindow } from "../window/WindowSlice"

export interface WindowManager {
	activeWindowId: number
}

export interface WindowManagerState {
	readonly data: WindowManager
	readonly status: defaultSliceStates
}

const initialState: WindowManagerState = {
	data: {
		activeWindowId: 1,
	},
	status: "idle",
}

export const windowManagerSlice = createAppSlice({
	name: "window-manager",
	initialState,
	reducers: create => ({
		changeActiveWindow: (state, action: PayloadAction<number>) => {
			state.data.activeWindowId = action.payload
		},
	}),
	selectors: {
		selectWindowManager: state => state.data,
		selectWindowManagerStatus: state => state.status,
		selectActiveWindowId: state => state.data.activeWindowId,
	},
	extraReducers: builder => {
		builder.addCase(closeWindow, (state, action) => {
			if (action.payload === state.data.activeWindowId) {
				state.data.activeWindowId = -1
			}
		})
	}
})

export const { changeActiveWindow } = windowManagerSlice.actions

export const {
	selectWindowManager,
	selectWindowManagerStatus,
	selectActiveWindowId,
} = windowManagerSlice.selectors
