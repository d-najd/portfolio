import type { DefaultProps } from "./common/CommonProps"
import { css } from "@emotion/react"

export const VerticallyCentered = ({ className, children }: DefaultProps) => {
	return (
		<div
			css={css`
                display: flex;
                justify-content: center;
                align-items: center;
			`}
			className={className}
		>
			{children}
		</div>
	)
}
