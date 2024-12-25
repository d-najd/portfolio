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
