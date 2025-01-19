import { lighten } from "polished"

export interface ThemeType {
	colors: {
		primaryBackground: string
		primaryBackgroundActive: string
		primaryText: string
		primaryTextInverted: string
		primaryBorderElevated: string
		primaryBorderDepressed: string
		windowTopBarActive: string
		windowTopBarInactive: string
	}
}

export const light: ThemeType = {
	colors: {
		primaryBackground: "#C3C3C3",
		primaryBackgroundActive: "placeholder",
		primaryText: "#000000",
		primaryTextInverted: "#FFFFFF",
		primaryBorderElevated: "#555555",
		primaryBorderDepressed: "#FFFFFF",
		windowTopBarActive: "#00007C",
		windowTopBarInactive: "#7B7D7B",
	},
}

// Color overrides
light.colors.primaryBackgroundActive = lighten(
	0.15,
	light.colors.primaryBackground,
)

// noinspection UnnecessaryLocalVariableJS
let theme = light
export default theme
