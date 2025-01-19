import styled from "@emotion/styled"
import { WindowTopBarHeight } from "@/features/window-drawer/components/WindowDrawerTopBar.styles"

interface Props {
	paddingBottom?: number
}

export const WindowContentContainer = styled.div<Props>`
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: scroll;
	padding-bottom: ${o =>
		o.paddingBottom === undefined
			? WindowTopBarHeight
			: o.paddingBottom + WindowTopBarHeight}px;
	scrollbar-width: none;
`
