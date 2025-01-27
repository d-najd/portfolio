import styled from "@emotion/styled"
import theme from "@/theme/theme"

interface Props {
	width?: number
	elevated?: boolean
}

/**
 * Divider for separating actions in some window or content, example of this is
 * the separator next to the start button in the bottom bar
 * @param width defaults to 4px
 * @param elevated defaults to elevated
 */
export const ContentSeparator = styled.div<Props>`
	border-width: ${o => o.width || "3"}px;
	border-top-color: ${o =>
		o.elevated === false
			? theme.colors.primaryBorderElevated
			: theme.colors.primaryBorderDepressed};
	border-left-color: ${o =>
		o.elevated === false
			? theme.colors.primaryBorderElevated
			: theme.colors.primaryBorderDepressed};
	border-bottom-color: ${o =>
		o.elevated === false
			? theme.colors.primaryBorderDepressed
			: theme.colors.primaryBorderElevated};
	border-right-color: ${o =>
		o.elevated === false
			? theme.colors.primaryBorderDepressed
			: theme.colors.primaryBorderElevated};
	border-style: ${o => (o.elevated === false ? "inset" : "outset")};
	height: 100%;
`
