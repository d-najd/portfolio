import type { defaultSliceStates } from "../../utils/sliceUtil"

export interface DesktopIcon {
	name: string
	url: string
}

export interface DesktopIconsState {
	data: DesktopIcon[]
	status: defaultSliceStates
}
