import { useTheme } from "@emotion/react"

export interface ThemeType {
	colors: {
		primaryBackground: string,
		primaryText: string,
		primaryBorderElevated: string,
		primaryBorderDepressed: string,
	},
}

export const light: ThemeType = {
	colors: {
		primaryBackground: "#C3C3C3",
		primaryText: "#FFFF",
		primaryBorderElevated: "#222222",
		primaryBorderDepressed: "#DDDDDD",
	},
}

// noinspection UnnecessaryLocalVariableJS
const theme = light
export default theme
export function CurTheme() {
	return useTheme() as ThemeType;
}