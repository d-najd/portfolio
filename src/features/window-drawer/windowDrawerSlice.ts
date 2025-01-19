import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import {
	closeWindow,
	onProjectsWindowOpened,
	windowIdCounter,
} from "../window/windowSlice"

export enum WindowState {
	Minimized = 1 << 0,
	/**
	 * If false shown, if true maximized
	 */
	ShownOrMaximized = 1 << 1,
}

/**
 * @see {GetWindowContentByWindowType}
 */
export enum WindowType {
	Undefined = "Undefined",
	Projects = "Projects",
}

export interface WindowDrawerWindow {
	id: number
	/**
	 * Order of which the windows will get drawn, which one should be in front and which behind, order is ascending
	 * meaning 0 at top and n at bottom
	 */
	drawOrder: number
	/**
	 * Necessary for determining which content to draw for which window
	 */
	windowType: WindowType
	/**
	 * Current state of the window, maximized is kept in the window drawer menu since only one window can be maximized,
	 * and it's always the active window
	 */
	state: WindowState
	width: number
	height: number
	offsetY: number
	offsetX: number
}

interface WindowManagerState {
	windows: WindowDrawerWindow[]
	/**
	 * There can be no active windows so that's why the id is kept
	 */
	activeWindowId: number
	status: defaultSliceStates
}

const initialState: WindowManagerState = {
	windows: [
		{
			id: 0,
			drawOrder: 1,
			windowType: WindowType.Undefined,
			state: WindowState.ShownOrMaximized,
			width: 320,
			height: 320,
			offsetX: 320,
			offsetY: 80,
		},
		{
			id: 1,
			drawOrder: 0,
			windowType: WindowType.Undefined,
			state: WindowState.ShownOrMaximized,
			width: 320,
			height: 320,
			offsetX: 480,
			offsetY: 80,
		},
		{
			id: 2,
			drawOrder: 2,
			windowType: WindowType.Undefined,
			state: WindowState.ShownOrMaximized,
			width: 320,
			height: 320,
			offsetX: 80,
			offsetY: 480,
		},
	],
	activeWindowId: 1,
	status: "idle",
}

interface MoveWindowState {
	id: number
	offsetX: number
	offsetY: number
}

/**
 * Puts the window with given id at the top of the ordering meaning it will get
 * drawn on top of other windows
 * @param state state
 * @param id id of the window
 */
const reorderAtTopWindow = (state: WindowManagerState, id: number) => {
	const curWindow = state.windows.find(o => o.id === id)!

	state.windows.map(o => {
		if (o.drawOrder < curWindow.drawOrder) {
			o.drawOrder++
		}
		return o
	})
	curWindow.drawOrder = 0
}

/**
 * unfocuses the currently focused window if there is one
 * @param state
 */
const unfocusWindowInternal = (state: WindowManagerState) => {
	state.activeWindowId = -1
}

export const windowDrawerSlice = createAppSlice({
	name: "window-drawer",
	initialState,
	reducers: create => ({
		changeActiveWindow: (state, action: PayloadAction<number>) => {
			state.activeWindowId = action.payload
			const window = state.windows.find(o => o.id === action.payload)
			if (window === undefined) {
				console.log("Invalid window id", action.payload)
				return
			}

			window.state &= ~WindowState.Minimized
			reorderAtTopWindow(state, action.payload)
		},
		minimizeWindow: (state, action: PayloadAction<number>) => {
			state.activeWindowId = -1
			const window = state.windows.find(o => o.id === action.payload)

			if (window === undefined) {
				console.log("Invalid window id", action.payload)
				return
			}
			window.state |= WindowState.Minimized
		},
		toggleMaximizeWindow: (state, action: PayloadAction<number>) => {
			const window = state.windows.find(o => o.id === action.payload)
			if (window === undefined) {
				console.log("Invalid window id", action.payload)
				return
			}

			state.activeWindowId = action.payload
			window.state ^= WindowState.ShownOrMaximized
		},
		moveWindow: (state, action: PayloadAction<MoveWindowState>) => {
			state.windows.map(o => {
				if (o.id === action.payload.id) {
					o.offsetX = action.payload.offsetX
					o.offsetY = action.payload.offsetY

					return o
				}
				return o
			})
		},
		unfocusWindow: state => {
			unfocusWindowInternal(state)
		},
	}),
	selectors: {
		selectWindowDrawerStatus: state => state.status,
		selectActiveWindowId: state => state.activeWindowId,
		selectWindowDrawerWindows: state => state.windows,
	},
	extraReducers: builder => {
		builder
			.addCase(closeWindow, (state, action) => {
				if (action.payload === state.activeWindowId) {
					unfocusWindowInternal(state)
				}

				state.windows = state.windows.filter(
					o => o.id !== action.payload,
				)
			})
			.addCase(onProjectsWindowOpened, state => {
				state.windows.push({
					id: windowIdCounter,
					drawOrder: 0,
					windowType: WindowType.Projects,
					state: WindowState.ShownOrMaximized,
					width: 950,
					height: 500,
					offsetX: 480,
					offsetY: 80,
				})
				state.activeWindowId = windowIdCounter
			})
	},
})

export const {
	changeActiveWindow,
	minimizeWindow,
	toggleMaximizeWindow,
	moveWindow,
	unfocusWindow,
} = windowDrawerSlice.actions

export const {
	selectWindowDrawerStatus,
	selectWindowDrawerWindows,
	selectActiveWindowId,
} = windowDrawerSlice.selectors
