import theme from "../theme/theme"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { lighten } from "polished"

export const WindowsButtonIdleStyle = css`
    pointer-events: auto;
    color: ${theme.colors.primaryText};
    background-color: ${theme.colors.primaryBackground};
    border-bottom: 0.2em outset ${theme.colors.primaryBorderElevated};
    border-right: 0.2em outset ${theme.colors.primaryBorderElevated};
    border-top: 0.2em outset ${theme.colors.primaryBorderDepressed};
    border-left: 0.2em outset ${theme.colors.primaryBorderDepressed};
`

export const WindowsButtonPressedStyle = css`
	background-color: ${theme.colors.primaryBackgroundActive};
    border-bottom: 0.2em inset ${theme.colors.primaryBorderDepressed};
    border-right: 0.2em inset ${theme.colors.primaryBorderDepressed};
    border-top: 0.2em inset ${theme.colors.primaryBorderElevated};
    border-left: 0.2em inset ${theme.colors.primaryBorderElevated};
`

export const WindowsButton =
	styled.button`
		${WindowsButtonIdleStyle}
		
        &:active {
			${WindowsButtonPressedStyle}
        }
	`