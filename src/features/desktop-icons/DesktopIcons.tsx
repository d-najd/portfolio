import styled from "@emotion/styled"

import { selectDesktopIcons } from "./desktopIconsSlice"
import { DesktopIconTSX } from "./components/DesktopIcon"
import { useAppSelector } from "@/app/hooks"
import useScreenSize from "@/hooks/useScreenSize"
import { bottomPanelHeight } from "@/features/bottom-panel/BottomPanel.styles"
import React, { useState } from "react"
import type { Size } from "@/ui/transforms"

/**
 * Used for keeping track of whether the user has double-clicked an icon so that
 * its action can be executed
 */
export interface DoubleClickState {
	/**
	 * When did the first click happen
	 */
	timeStamp: Date
	/**
	 * ID of the icon that was clicked
	 */
	id: number
}

export const defaultDoubleClickState = (): DoubleClickState => ({
	timeStamp: new Date(),
	id: -1
})

/**
 * how fast does the double-clicking need to be for it to be considered a double
 * click and execute the action
 */
export const doubleClickTolerance = 500
const extraBottomPanelHeight = 14

interface Props {
	screenSize: Size
}

export const DesktopIcons = React.memo(() => {
	const desktopIcons = useAppSelector(selectDesktopIcons)
	const screenSize = useScreenSize()

	const [doubleClickState, setDoubleClickState] = useState<DoubleClickState>(
		defaultDoubleClickState()
	)

	return (
		<Container screenSize={screenSize}>
			{desktopIcons.map(icon => {
				return (
					<DesktopIconTSX
						iconData={icon}
						doubleClickState={doubleClickState}
						setDoubleClickState={setDoubleClickState}
						key={icon.id}
					/>
				)
			})}
		</Container>
	)
})

const Container = styled.div<Props>`
	position: absolute;
	display: flex;
	width: 100%;
	height: ${o =>
		o.screenSize.height - bottomPanelHeight - extraBottomPanelHeight}px;
	padding: 14px;
	flex-direction: column;
	flex-wrap: wrap;
	align-content: flex-start;
	row-gap: 14px;
	column-gap: 7px;
`
