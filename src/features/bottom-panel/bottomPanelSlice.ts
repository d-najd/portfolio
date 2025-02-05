import type { defaultSliceStates } from "@/utils/sliceUtil"
import { createAppSlice } from "@/app/createAppSlice"
import { unfocus } from "@/features/window/windowSlice"

interface BottomPanelState {
	startMenuSelected: boolean
	status: defaultSliceStates
}

const initialState: BottomPanelState = {
	startMenuSelected: false,
	status: "idle",
}

export const bottomPanelSlice = createAppSlice({
	name: "bottom-panel",
	initialState,
	reducers: create => ({
		onSelectStartMenu: state => {
			state.startMenuSelected = !state.startMenuSelected
		},
	}),
	selectors: {
		selectStartMenuSelected: state => state.startMenuSelected,
	},
	extraReducers: builder => {
		builder.addCase(unfocus, state => {
			state.startMenuSelected = false
		})
	},
})

export const { onSelectStartMenu } = bottomPanelSlice.actions

export const { selectStartMenuSelected } = bottomPanelSlice.selectors
