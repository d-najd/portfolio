import { css } from "@emotion/react"
import { CurTheme } from "../theme/theme"
import type { DefaultProps } from "./common/CommonProps"

export const WindowsButton = ({ className, children }: DefaultProps) => {
	const style = css`
		color: ${CurTheme().colors.primaryText}
        background-color: ${CurTheme().colors.primaryBackground};
		border-bottom: 0.2em outset ${CurTheme().colors.primaryBorderElevated};
		border-right: 0.2em outset ${CurTheme().colors.primaryBorderElevated};
		border-top: 0.2em outset ${CurTheme().colors.primaryBorderDepressed};
		border-left: 0.2em outset ${CurTheme().colors.primaryBorderDepressed};
		
        &:active {
            border-bottom: 0.2em inset ${CurTheme().colors.primaryBorderDepressed};
            border-right: 0.2em inset ${CurTheme().colors.primaryBorderDepressed};
            border-top: 0.2em inset ${CurTheme().colors.primaryBorderElevated};
            border-left: 0.2em inset ${CurTheme().colors.primaryBorderElevated};
        }
	`
	
	return (
		<button css={style} className={className}>
			{children}
		</button>
	)
}
