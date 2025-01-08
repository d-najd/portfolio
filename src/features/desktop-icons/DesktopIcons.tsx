import styled from "@emotion/styled"
import { selectDesktopIcons } from "./desktopIconsSlice"
import { DesktopIconTSX } from "./components/DesktopIcon"
import { useAppSelector } from "../../app/hooks"
import useScreenSize from "../../components/useScreenSize"
import { bottomPanelHeight } from "../bottom-panel/BottomPanel"
import { useState } from "react"

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

export const DesktopIcons = () => {
	const desktopIcons = useAppSelector(selectDesktopIcons)
	const screenSize = useScreenSize()
	const extraBottomPanelHeight = 14

	const [doubleClickState, setDoubleClickState] = useState<DoubleClickState>(
		defaultDoubleClickState()
	)

	const Container = styled.div`
		padding: 14px;
		position: absolute;
		width: 100%;
		height: ${screenSize.height -
		bottomPanelHeight -
		extraBottomPanelHeight}px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
		row-gap: 14px;
		column-gap: 7px;
	`

	return (
		<>
			<Container>
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
		</>
	)
}
