import type { defaultSliceStates } from "@/utils/sliceUtil"
import { createAppSlice } from "@/app/createAppSlice"
import { unfocus } from "@/features/window/windowSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

interface BottomPanelState {
	startMenuSelected: boolean
	status: defaultSliceStates
}

const initialState: BottomPanelState = {
	startMenuSelected: false,
	status: "idle",
}

const unfocusStartMenu = (state: BottomPanelState) => {
	state.startMenuSelected = false
}

export const bottomPanelSlice = createAppSlice({
	name: "bottom-panel",
	initialState,
	reducers: create => ({
		onSetStartMenuSelected: (state, action: PayloadAction<boolean>) => {
			state.startMenuSelected = action.payload
		},
	}),
	selectors: {
		selectStartMenuSelected: state => state.startMenuSelected,
	},
	extraReducers: builder => {
		builder.addCase(unfocus, state => {
			unfocusStartMenu(state)
		})
	},
})

export const { onSetStartMenuSelected } = bottomPanelSlice.actions

export const { selectStartMenuSelected } = bottomPanelSlice.selectors
