import type { WindowManager } from "./windowManagerSlice"
import type { BottomPanelSliceState } from "../bottom-panel/bottomPanelSlice"

const windowManager = (bottomPanel: BottomPanelSliceState): WindowManager => {
	return bottomPanel.data.windowManager
}

// Exports are located in bottomPanelSlice.ts
export const windowManagerSelectors = {
	selectWindows: (bottomPanel: BottomPanelSliceState) => windowManager(bottomPanel).windows,
};
