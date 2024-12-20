import type { DefaultProps } from "./common/CommonProps"
import { css } from "@emotion/react"

/**
 * Replication (somewhat) of Jetpack compose since I prefer that way of doing stuff. Only contains ordering code
 */
export const Row = ({ className, children }: DefaultProps) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
			`}
			className={className}
		>
			{children}
		</div>
	)
}
