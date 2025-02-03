import styled from "@emotion/styled"
import { WindowTopBarHeight } from "@/features/window-drawer/components/WindowDrawerTopBar.styles"

interface Props {
	paddingBottom?: number
}

// This code is cursed for the love of god don't try to change it
// hours wasted: 3h
export const WindowContentContainer = styled.div<Props>`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	overflow: scroll;
	scrollbar-width: none;

	/*

	position: absolute;
	width: 100%;
	height: 100%;
	overflow: scroll;
	padding-bottom: ${o =>
		o.paddingBottom === undefined
			? WindowTopBarHeight
			: o.paddingBottom + WindowTopBarHeight}px;
	scrollbar-width: none;
	*/
`
