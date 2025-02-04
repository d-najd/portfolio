import type { defaultSliceStates } from "@/utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@/app/createAppSlice"
import {
	closeWindow,
	onGithubWindowOpened,
	onProjectsWindowOpened,
	onSendMailWindowOpened,
	unfocus,
	windowIdCounter,
} from "../window/windowSlice"
import type { Position } from "@/ui/transforms"
import type { Size } from "re-resizable"
import { DesktopEntryType } from "@/features/shared/desktopEntry"

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
	desktopEntry: DesktopEntryType
	/**
	 * Current state of the window, maximized is kept in the window drawer menu since only one window can be maximized,
	 * and it's always the active window
	 */
	minimized: boolean
	width: number
	height: number
	minWidth: number
	minHeight: number
	offsetY: number
	offsetX: number
}

type WindowFactoryParams = {
	id: number
	drawOrder: number
	width?: number
	height?: number
	offsetX?: number
	offsetY?: number
	desktopEntry?: DesktopEntryType
	minimized?: boolean
	minWidth?: number
	minHeight?: number
}

let windowFactory = ({
	id,
	drawOrder,
	width = 950,
	height = 550,
	offsetX = 480,
	offsetY = 80,
	desktopEntry = DesktopEntryType.Undefined,
	minimized = false,
	minWidth = 300,
	minHeight = 200,
}: WindowFactoryParams): WindowDrawerWindow => ({
	id: id,
	drawOrder: drawOrder,
	desktopEntry: desktopEntry,
	minimized: minimized,
	width: width,
	height: height,
	minWidth: minWidth,
	minHeight: minHeight,
	offsetX: offsetX,
	offsetY: offsetY,
})

interface WindowManagerState {
	windows: WindowDrawerWindow[]
	/**
	 * There can be no active windows so that's why the id is kept
	 */
	activeWindowId: number
	maximizedWindowId: number
	status: defaultSliceStates
}

const initialState: WindowManagerState = {
	windows: [
		windowFactory({
			id: 0,
			drawOrder: 1,
			width: 320,
			height: 320,
			offsetX: 320,
			offsetY: 80,
		}),
		windowFactory({
			id: 1,
			drawOrder: 0,
			width: 320,
			height: 320,
			offsetX: 480,
			offsetY: 80,
		}),
		windowFactory({
			id: 2,
			drawOrder: 2,
			width: 320,
			height: 320,
			offsetX: 80,
			offsetY: 480,
		}),
	],
	activeWindowId: 1,
	maximizedWindowId: -1,
	status: "idle",
}

interface MoveWindowState {
	id: number
	offsetX: number
	offsetY: number
}

interface ResizeProps extends Size, Position {
	id: number
	width: number
	height: number
	x: number
	y: number
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

			window.minimized = false
			reorderAtTopWindow(state, action.payload)
		},
		minimizeWindow: (state, action: PayloadAction<number>) => {
			state.activeWindowId = -1
			const window = state.windows.find(o => o.id === action.payload)

			if (window === undefined) {
				console.log("Invalid window id", action.payload)
				return
			}
			window.minimized = true
		},
		toggleMaximizeWindow: (state, action: PayloadAction<number>) => {
			const window = state.windows.find(o => o.id === action.payload)
			if (window === undefined) {
				console.log("Invalid window id", action.payload)
				return
			}

			state.activeWindowId = action.payload

			if (state.maximizedWindowId === action.payload) {
				state.maximizedWindowId = -1
			} else {
				state.maximizedWindowId = action.payload
			}
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
		onWindowResize: (state, action: PayloadAction<ResizeProps>) => {
			const window = state.windows.find(o => o.id === action.payload.id)

			if (window === undefined) {
				console.log("Invalid window id", action.payload)
				return
			}

			window.width = action.payload.width
			window.height = action.payload.height
			window.offsetX = action.payload.x
			window.offsetY = action.payload.y
		},
	}),
	selectors: {
		selectWindowDrawerStatus: state => state.status,
		selectActiveWindowId: state => state.activeWindowId,
		selectMaximizedWindowId: state => state.maximizedWindowId,
		selectWindowDrawerWindows: state => state.windows,
	},
	extraReducers: builder => {
		builder
			.addCase(unfocus, state => {
				unfocusWindowInternal(state)
			})
			.addCase(closeWindow, (state, action) => {
				if (action.payload === state.activeWindowId) {
					unfocusWindowInternal(state)
				}

				state.windows = state.windows.filter(
					o => o.id !== action.payload,
				)
			})
			.addCase(onProjectsWindowOpened, state => {
				state.windows.push(
					windowFactory({
						id: windowIdCounter,
						drawOrder: state.windows.length,
						desktopEntry: DesktopEntryType.Projects,
						offsetX: 700,
						minWidth: 480,
						minHeight: 340,
					}),
				)
				reorderAtTopWindow(state, windowIdCounter)
				state.activeWindowId = windowIdCounter
			})
			.addCase(onGithubWindowOpened, state => {
				state.windows.push(
					windowFactory({
						id: windowIdCounter,
						drawOrder: state.windows.length,
						desktopEntry: DesktopEntryType.Github,
						minWidth: 480,
						minHeight: 340,
					}),
				)
				reorderAtTopWindow(state, windowIdCounter)
				state.activeWindowId = windowIdCounter
			})
			.addCase(onSendMailWindowOpened, state => {
				state.windows.push(
					windowFactory({
						id: windowIdCounter,
						drawOrder: state.windows.length,
						desktopEntry: DesktopEntryType.SendMail,
						offsetX: 25,
						minWidth: 275,
						minHeight: 525,
						width: 600,
					}),
				)
				reorderAtTopWindow(state, windowIdCounter)
				state.activeWindowId = windowIdCounter
			})
	},
})

export const {
	changeActiveWindow,
	minimizeWindow,
	toggleMaximizeWindow,
	moveWindow,
	onWindowResize,
} = windowDrawerSlice.actions

export const {
	selectWindowDrawerStatus,
	selectWindowDrawerWindows,
	selectActiveWindowId,
	selectMaximizedWindowId,
} = windowDrawerSlice.selectors
