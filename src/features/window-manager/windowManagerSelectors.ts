import type { BottomPanelSliceState } from "../bottom-panel/bottomPanelSlice"
import { windowManagerFromBottomManagerState } from "../bottom-panel/bottomPanelSlice"

// Exports are located in bottomPanelSlice.ts
export const windowManagerSelectors = {
	selectWindows: (bottomPanel: BottomPanelSliceState) =>
		windowManagerFromBottomManagerState(bottomPanel).windows,
}