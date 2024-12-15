import type { WindowManager } from "../window-manager/windowManagerSlice";
import { getNextWindowId } from "../window-manager/windowManagerSlice"
import type { defaultSliceStates } from "../../utils/sliceUtil"
import { createAppSlice } from "../../app/createAppSlice"

export interface BottomPanel {
	windowManager: WindowManager
}

export interface BottomPanelSliceState {
	readonly data: BottomPanel
	readonly status: defaultSliceStates
}

const initialState: BottomPanelSliceState = {
	data: {
		windowManager: {
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
	},
	status: "idle"
}

export const bottomPanelSlice = createAppSlice({
	name: "bottom-panel",
	initialState,
	reducers: create => ({
		
	}),
	selectors: {
		
	}
})
