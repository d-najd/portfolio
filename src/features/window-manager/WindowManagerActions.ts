import type { BottomPanelSliceState } from "../bottom-panel/bottomPanelSlice"
import { windowManagerFromBottomManagerState } from "../bottom-panel/bottomPanelSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

// Exports are located in bottomPanelSlice.ts
export const windowManagerActions = {
	closeWindow: (
		state: BottomPanelSliceState,
		action: PayloadAction<number>,
	) => {
		windowManagerFromBottomManagerState(state).windows =
			windowManagerFromBottomManagerState(state).windows.filter(
				o => o.id !== action.payload,
			)
	},
}
