import {
	WindowTopBarHeight,
} from "@/features/window-drawer/components/WindowDrawerTopBar.styles"
import styled from "@emotion/styled"

/**
 * Each content for the window much extend this style otherwise horrible things
 * will happen
 */
export const WindowContentContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: scroll;
	scrollbar-width: none;

	// Hours wasted trying to come up with better solution counter: 1.75h

	&:after {
		height: ${WindowTopBarHeight / 2}px;
		color: rgba(0, 0, 0, 0%);
		pointer-events: none;
		user-select: none;
	}
`
