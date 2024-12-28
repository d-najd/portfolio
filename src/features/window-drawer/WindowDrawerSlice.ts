import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { closeWindow } from "../window/WindowSlice"

export interface WindowDrawer {
	windows: WindowDrawerWindow[]
	/**
	 * There can be no active windows so that's why the id is kept
	 */
	activeWindowId: number
	maximized: boolean
}

export interface WindowDrawerWindow {
	id: number
	/**
	 * Order of which the windows will get drawn, which one should be in front and which behind, order is ascending
	 * meaning 0 at top and n at bottom
	 */
	drawOrder: number
	/**
	 * Current state of the window, maximized is kept in the window drawer menu
	 * since only one window can be maximized, and it's always the active window
	 */
	state: "minimized" | "shown"
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
				drawOrder: 1,
				state: "shown",
				width: 20,
				height: 20,
				offsetX: 20,
				offsetY: 5,
			},
			{
				id: 1,
				drawOrder: 0,
				state: "shown",
				width: 20,
				height: 20,
				offsetX: 30,
				offsetY: 5,
			},
			{
				id: 2,
				drawOrder: 2,
				state: "shown",
				width: 20,
				height: 20,
				offsetX: 5,
				offsetY: 30,
			},
		],
		activeWindowId: 1,
		maximized: false,
	},
	status: "idle",
}

interface MoveWindowState {
	id: number
	offsetX: number,
	offsetY: number,
}

/**
 * Puts the window with given id at the top of the ordering meaning it will get
 * drawn on top of other windows
 * @param state state
 * @param id id of the window
 */
const reorderAtTopWindow = (state: WindowManagerState, id: number) => {
	const curWindow= state.data.windows.find(o => o.id === id)!
	
	state.data.windows.map(o => {
		if (o.drawOrder < curWindow.drawOrder) {
			o.drawOrder++
		}
		return o;
	})
	curWindow.drawOrder = 0
}

export const windowDrawerSlice = createAppSlice({
	name: "window-drawer",
	initialState,
	reducers: create => ({
		changeActiveWindow: (state, action: PayloadAction<number>) => {
			state.data.activeWindowId = action.payload
			
			const window = state.data.windows.find(o => o.id === action.payload)
			if (window !== undefined) {
				window.state = "shown"
			}
			
			reorderAtTopWindow(state, action.payload)
		},
		minimizeWindow: (state, action: PayloadAction<number>) => {
			const window = state.data.windows.find(o => o.id === action.payload)
			if (window !== undefined) {
				window.state = "minimized"
			}
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

			state.data.windows = state.data.windows.filter(o => o.id !== action.payload)
		})
	}
})

export const { changeActiveWindow, minimizeWindow, moveWindow } = windowDrawerSlice.actions

export const {
	selectWindowDrawer,
	selectWindowDrawerStatus,
	selectWindowDrawerWindows,
	selectActiveWindowId,
} = windowDrawerSlice.selectors
