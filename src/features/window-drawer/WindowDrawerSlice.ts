import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { closeWindow } from "../window/WindowSlice"

export interface WindowDrawer {
	windows: WindowDrawerWindow[]
	activeWindowId: number
}

export interface WindowDrawerWindow {
	id: number
	width: number
	height: number
	offsetY: number
	offsetX: number
}

export interface WindowManagerState {
	readonly data: WindowDrawer
	readonly status: defaultSliceStates
}

const initialState: WindowManagerState = {
	data: {
		windows: [
			{
				id: 0,
				width: 20,
				height: 20,
				offsetX: 20,
				offsetY: 5,
			},
			{
				id: 1,
				width: 20,
				height: 20,
				offsetX: 30,
				offsetY: 5,
			},
			{
				id: 2,
				width: 20,
				height: 20,
				offsetX: 5,
				offsetY: 30,
			},
		],
		activeWindowId: 1,
	},
	status: "idle",
}

interface MoveWindowState {
	id: number
	offsetX: number,
	offsetY: number,
}

export const windowDrawerSlice = createAppSlice({
	name: "window-drawer",
	initialState,
	reducers: create => ({
		changeActiveWindow: (state, action: PayloadAction<number>) => {
			state.data.activeWindowId = action.payload
		},
		moveWindow: (state, action: PayloadAction<MoveWindowState>) => {
			state.data.windows.map(o => {
				if (o.id === action.payload.id) {
					o.offsetX = action.payload.offsetX
					o.offsetY = action.payload.offsetY
					
					return o;
				}
				return o
			})
		}
	}),
	selectors: {
		selectWindowDrawer: state => state.data,
		selectWindowDrawerStatus: state => state.status,
		selectActiveWindowId: state => state.data.activeWindowId,
		selectWindowDrawerWindows: state => state.data.windows
	},
	extraReducers: builder => {
		builder.addCase(closeWindow, (state, action) => {
			if (action.payload === state.data.activeWindowId) {
				state.data.activeWindowId = -1
			}
		})
	}
})

export const { changeActiveWindow, moveWindow } = windowDrawerSlice.actions

export const {
	selectWindowDrawer,
	selectWindowDrawerStatus,
	selectWindowDrawerWindows,
	selectActiveWindowId,
} = windowDrawerSlice.selectors
