import { css } from "@emotion/react"
import { CurTheme } from "../theme/theme"
import type { DefaultProps } from "./common/CommonProps"

export const WindowsButton = ({ className, children }: DefaultProps) => {
	const style = css`
        background-color: ${CurTheme().colors.primaryBackground};
		
		border-bottom: 2px solid ${CurTheme().colors.primaryBorderElevated};
		border-right: 2px solid ${CurTheme().colors.primaryBorderElevated};
		border-top: 2px solid ${CurTheme().colors.primaryBorderDepressed};
		border-left: 2px solid ${CurTheme().colors.primaryBorderDepressed};
		
        &:active {
            border-bottom: 2px solid ${CurTheme().colors.primaryBorderDepressed};
            border-right: 2px solid ${CurTheme().colors.primaryBorderDepressed};
            border-top: 1px solid ${CurTheme().colors.primaryBorderElevated};
            border-left: 1px solid ${CurTheme().colors.primaryBorderElevated};
        }
	`
	
	return (
		<button css={style} className={className}>
			{children}
		</button>
	)
}
