import { css } from "@emotion/react"
import { CurTheme } from "../theme/theme"
import type { DefaultProps } from "./common/CommonProps"

export const WindowsButton = ({ className, children }: DefaultProps) => {
	const style = css`
        background-color: ${CurTheme().colors.primaryBackground};
		
		border-bottom: 2px outset ${CurTheme().colors.primaryBorderElevated};
		border-right: 2px outset ${CurTheme().colors.primaryBorderElevated};
		border-top: 2px outset ${CurTheme().colors.primaryBorderDepressed};
		border-left: 2px outset ${CurTheme().colors.primaryBorderDepressed};
		
        &:active {
            border-bottom: 2px inset ${CurTheme().colors.primaryBorderDepressed};
            border-right: 2px inset ${CurTheme().colors.primaryBorderDepressed};
            border-top: 2px inset ${CurTheme().colors.primaryBorderElevated};
            border-left: 2px inset ${CurTheme().colors.primaryBorderElevated};
        }
	`
	
	return (
		<button css={style} className={className}>
			{children}
		</button>
	)
}
