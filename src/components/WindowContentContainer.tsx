import styled from "@emotion/styled"
import {
	WindowTopBarHeight,
} from "@/features/window-drawer/components/WindowDrawerTopBar.styles"
import { Column } from "@/components/Column"

/**
 * Each content for the window much extend this style otherwise horrible things
 * will happen
 */
export const WindowContentContainer = styled(Column)`
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: scroll;
	scrollbar-width: none;

	// Hours wasted trying to come up with better solution counter: 1.75h

	&:after {
		height: ${WindowTopBarHeight}px;
		color: rgba(0, 0, 0, 0%);
		pointer-events: none;
		user-select: none;
		content: "Spacer";
	}
`
