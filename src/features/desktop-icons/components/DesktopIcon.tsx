import { DesktopIcon, onSelectDesktopIcon } from "../desktopIconsSlice"
import { selectSelectedDesktopIcon } from "../desktopIconsSlice"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { Column } from "../../../components/Column"
import type { DoubleClickState } from "../DesktopIcons"
import { defaultDoubleClickState, doubleClickTolerance } from "../DesktopIcons"
import type React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { GetActionByDesktopIconType } from "../desktopIconActions"

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
	const dispatch = useAppDispatch()
	const selectedIcon = useAppSelector(selectSelectedDesktopIcon)

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
		pointer-events: none;
		background-color: ${selectedIcon === iconData.id
			? "rgba(0, 0, 255, 0.65)"
			: "transparent"};
		opacity: ${selectedIcon === iconData.id ? 55 : 100}%;
	`

	const Text = styled.span`
		${Alignment(Alignments.HorizontallyCentered)};
		color: white;
		margin-top: 2px;
		padding: 2px 1px;
		font-size: small;
		user-select: none;

		background-color: ${selectedIcon === iconData.id
			? "blue"
			: "transparent"};
		border: ${selectedIcon === iconData.id
			? "rgba(255, 255, 255, 0.7) dotted 2px"
			: "none"};
	`

	const onDoubleClickAction = () => {
		if (
			iconData.id === doubleClickState.id &&
			Date.now() - doubleClickState.timeStamp.getTime() <=
				doubleClickTolerance
		) {
			// Clicked
			setDoubleClickState(defaultDoubleClickState())
			const iconAction = GetActionByDesktopIconType(iconData.iconType)
			iconAction()
		} else {
			dispatch(onSelectDesktopIcon(iconData.id))
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
