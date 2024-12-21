import { css } from "@emotion/react"
import { CurTheme } from "../theme/theme"
import type { DefaultProps } from "./common/CommonProps"

export const WindowsButton = ({ className, children }: DefaultProps) => {
	const style = css`
        background-color: ${CurTheme().colors.primaryBackground};
        box-shadow: 2px 2px ${CurTheme().colors.primaryBorderElevated};
		
        &:active {
            box-shadow: 1px 1px ${CurTheme().colors.primaryBorderDepressed};
        }
	`
	
	return (
		<button css={style} className={className}>
			{children}
		</button>
	)
}
