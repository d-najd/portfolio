import { ProjectsWindow } from "./projects/components/ProjectsWindow"
import type { ReactNode } from "react"
import React from "react"
import { WindowType } from "@/features/window-drawer/windowDrawerSlice"
import styled from "@emotion/styled"
import {
	WindowTopBarHeight,
} from "@/features/window-drawer/components/WindowDrawerTopBar.styles"

/**
 * Each content for the window much extend this style otherwise horrible things
 * will happen
 *
 * @remarks this is placed here because each time window content type is added
 * you will have to see this (and thus remember)
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

interface Props {
	windowType: WindowType
}

export const GetWindowContentByWindowType = React.memo(
	({ windowType }: Props): ReactNode => {
		switch (windowType) {
			case WindowType.Projects:
				return <ProjectsWindow />
			default:
				return <>{windowType}</>
		}
	},
)
