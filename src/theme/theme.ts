import { useTheme } from "@emotion/react"

export interface ThemeType {
	colors: {
		primaryBackground: string,
		primaryText: string,
		primaryTextInverted: string,
		primaryBorderElevated: string,
		primaryBorderDepressed: string,
		windowTopBar: string,
	},
}

export const light: ThemeType = {
	colors: {
		primaryBackground: "#C3C3C3",
		primaryText: "#000000",
		primaryTextInverted: "#FFFFFF",
		primaryBorderElevated: "#555555",
		primaryBorderDepressed: "#FFFFFF",
		windowTopBar: "#00007C",
	},
}

// noinspection UnnecessaryLocalVariableJS
let theme = light
export default theme