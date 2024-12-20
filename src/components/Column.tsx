import type { DefaultProps } from "./common/CommonProps"
import { css } from "@emotion/react"

/**
 * Replication (somewhat) of Jetpack compose since I prefer that behaviour, only has ordering code
 */
export const Column = ({ className, children }: DefaultProps) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
			`}
			className={className}
		>
			{children}
		</div>
	)
}
