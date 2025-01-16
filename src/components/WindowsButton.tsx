import theme from "../theme/theme"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

export const WindowsButtonIdleStyle = css`
	pointer-events: auto;
	color: ${theme.colors.primaryText};
	background-color: ${theme.colors.primaryBackground};
	border-bottom: 2px outset ${theme.colors.primaryBorderElevated};
	border-right: 2px outset ${theme.colors.primaryBorderElevated};
	border-top: 2px outset ${theme.colors.primaryBorderDepressed};
	border-left: 2px outset ${theme.colors.primaryBorderDepressed};
`

export const WindowsButtonPressedStyle = css`
	background-color: ${theme.colors.primaryBackgroundActive};
	border-bottom: 2px inset ${theme.colors.primaryBorderDepressed};
	border-right: 2px inset ${theme.colors.primaryBorderDepressed};
	border-top: 2px inset ${theme.colors.primaryBorderElevated};
	border-left: 2px inset ${theme.colors.primaryBorderElevated};
`

/**
 * Default Windows Button
 */
export const WindowsButton = styled.button`
	${WindowsButtonIdleStyle}
	&:active {
		${WindowsButtonPressedStyle}
	}
`
