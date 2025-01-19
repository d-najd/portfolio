import styled from "@emotion/styled"
import { WindowTopBarHeight } from "@/features/window-drawer/components/WindowDrawerTopBar.styles"

export const WindowContentContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: scroll;
	scrollbar-width: none;

	&:after {
		height: ${WindowTopBarHeight / 2}px;
		color: rgba(0, 0, 0, 0%);
		content: "Please don't touch this";
		pointer-events: none;
		user-select: none;
	}
`
