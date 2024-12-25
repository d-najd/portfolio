import type { WindowManager } from "../window-manager/windowManager"
import { getNextWindowId } from "../window-manager/windowManager"
import type { defaultSliceStates } from "../../utils/sliceUtil"
import { createAppSlice } from "../../app/createAppSlice"
import { windowManagerSelectors } from "../window-manager/windowManagerSelectors"
import { windowManagerActions } from "../window-manager/WindowManagerActions"

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
		},
	},
	status: "idle",
}

export const bottomPanelSlice = createAppSlice({
	name: "bottom-panel",
	initialState,
	reducers: create => ({
		...windowManagerActions
	}),
	selectors: {
		selectWindowManager: bottomSlice => bottomSlice.data.windowManager,
		selectBottomPanelStatus: bottomSlice => bottomSlice.status,
		...windowManagerSelectors,
	},
})

export const windowManagerFromBottomManagerState = (
	bottomPanel: BottomPanelSliceState,
): WindowManager => {
	return bottomPanel.data.windowManager
}

export const { closeWindow } = bottomPanelSlice.actions

export const { selectWindowManager, selectBottomPanelStatus, selectWindows } =
	bottomPanelSlice.selectors
