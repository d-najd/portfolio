import type { defaultSliceStates } from "../../utils/sliceUtil"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { WindowDrawerWindow } from "../window-drawer/WindowDrawerSlice";
import { selectWindowDrawerWindows } from "../window-drawer/WindowDrawerSlice"
import { createAppSlice } from "../../app/createAppSlice"
import { useAppSelector } from "../../app/hooks"

export interface BaseWindow {
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

export interface MyWindow extends BaseWindow, WindowDrawerWindow {}

/**
 * Due to redux functions needing to be completely pure a counter is used as the id for the window
 */
let windowIdCounter = 0

function getNextWindowId(): number {
	return windowIdCounter++
}

export interface WindowState {
	readonly data: BaseWindow[]
	readonly status: defaultSliceStates
}

const initialState: WindowState = {
	data: [
		{
			id: getNextWindowId(),
			name: "Window 1",
		},
		{
			id: getNextWindowId(),
			name: "Window 2",
		},
		{
			id: getNextWindowId(),
			name: "Window 3",
		},
	],
	status: "idle",
}

export const windowSlice = createAppSlice({
	name: "window",
	initialState,
	reducers: create => ({
		closeWindow: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter(o => o.id !== action.payload)
		},
	}),
	selectors: {
		selectWindowsStatus: state => state.status,
		selectBaseWindows: state => state.data,
	},
})


const combineWindows = (
	baseWindow: BaseWindow,
	windowDrawerWindow: WindowDrawerWindow,
): MyWindow => {
	return {
		...baseWindow,
		...windowDrawerWindow
	}
}

export const useWindows = (): MyWindow[] => {
	const windowDrawerWindows = useAppSelector(selectWindowDrawerWindows);
	const baseWindows = useAppSelector(selectBaseWindows)

	return baseWindows.map(baseWindow => {
		const windowDrawerWindow = windowDrawerWindows.find(o => o.id === baseWindow.id);
		if (windowDrawerWindow === undefined) {
			return undefined
		}
		return combineWindows(baseWindow, windowDrawerWindow); // Combine matches or return null
	}).filter((e): e is MyWindow => !!e)
}

export const { closeWindow } = windowSlice.actions

export const { selectBaseWindows } = windowSlice.selectors
