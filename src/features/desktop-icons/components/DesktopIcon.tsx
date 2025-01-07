import type { DesktopIcon } from "../DesktopIconsSlice"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { Column } from "../../../components/Column"
import type { DoubleClickState } from "../DesktopIcons"
import { defaultDoubleClickState, doubleClickTolerance } from "../DesktopIcons"
import type React from "react"

interface DesktopIconTSXType {
	iconData: DesktopIcon
	doubleClickState: DoubleClickState
	setDoubleClickState: React.Dispatch<DoubleClickState>
}

export const DesktopIconTSX = ({
	iconData,
	doubleClickState,
	setDoubleClickState
}: DesktopIconTSXType) => {
	const Container = styled(Column)`
		${Alignment(Alignments.VerticallyCentered)};
		width: 74px;
		height: 74px;
		text-align: center;
		user-select: all;
		cursor: pointer;
	`

	const Icon = styled.img`
		min-width: 42px;
		min-height: 42px;
		max-width: 42px;
		max-height: 42px;
		image-rendering: pixelated;
		user-select: none;
	`

	const Text = styled.span`
		${Alignment(Alignments.HorizontallyCentered)};
		color: white;
		margin-top: 6px;
		font-size: small;
		user-select: none;
	`

	const onDoubleClickAction = () => {
		if (
			iconData.id === doubleClickState.id &&
			Date.now() - doubleClickState.timeStamp.getTime() <=
				doubleClickTolerance
		) {
			// Clicked
			setDoubleClickState(defaultDoubleClickState())
			iconData.action()
		} else {
			setDoubleClickState({
				timeStamp: new Date(),
				id: iconData.id
			})
		}
	}

	return (
		<>
			<Container onClick={onDoubleClickAction}>
				<Icon src={iconData.iconUrl} />
				<Text>{iconData.name}</Text>
			</Container>
		</>
	)
}
