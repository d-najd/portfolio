import type { DesktopIcon as DesktopIconData } from "../desktopIconsSlice"
import {
	onSelectDesktopIcon,
	selectSelectedDesktopIcon
} from "../desktopIconsSlice"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { Column } from "../../../components/Column"
import type { DoubleClickState } from "../DesktopIcons"
import { defaultDoubleClickState, doubleClickTolerance } from "../DesktopIcons"
import type React from "react"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { ExecuteActionByDesktopIconType } from "../desktopIconActions"

const Container = styled(Column)`
	${Alignment(Alignments.VerticallyCentered)};
	width: 74px;
	height: 74px;
	text-align: center;
	user-select: all;
	cursor: pointer;
`

interface DefaultProps {
	selectedIcon: number
	iconData: DesktopIconData
}

const Icon = styled.img<DefaultProps>`
	min-width: 42px;
	min-height: 42px;
	max-width: 42px;
	max-height: 42px;
	image-rendering: pixelated;
	user-select: none;
	pointer-events: none;
	background-color: ${o =>
		o.selectedIcon === o.iconData.id
			? "rgba(0, 0, 255, 0.65)"
			: "transparent"};
	opacity: ${o => (o.selectedIcon === o.iconData.id ? 55 : 100)}%;
`

const Text = styled.span<DefaultProps>`
	${Alignment(Alignments.HorizontallyCentered)};
	color: white;
	margin-top: 2px;
	padding: 2px 1px;
	font-size: small;
	user-select: none;

	background-color: ${o =>
		o.selectedIcon === o.iconData.id ? "blue" : "transparent"};
	border: ${o =>
		o.selectedIcon === o.iconData.id
			? "rgba(255, 255, 255, 0.7) dotted 2px"
			: "none"};
`

interface DesktopIconType {
	iconData: DesktopIconData
	doubleClickState: DoubleClickState
	setDoubleClickState: React.Dispatch<DoubleClickState>
}

export const DesktopIcon = ({
	iconData,
	doubleClickState,
	setDoubleClickState
}: DesktopIconType) => {
	const dispatch = useAppDispatch()
	const selectedIcon = useAppSelector(selectSelectedDesktopIcon)

	const handleDoubleClick = useCallback(() => {
		if (
			iconData.id === doubleClickState.id &&
			Date.now() - doubleClickState.timeStamp.getTime() <=
				doubleClickTolerance
		) {
			setDoubleClickState(defaultDoubleClickState())
			ExecuteActionByDesktopIconType(iconData.iconType, dispatch)
		} else {
			// Clicked
			dispatch(onSelectDesktopIcon(iconData.id))
			setDoubleClickState({
				timeStamp: new Date(),
				id: iconData.id
			})
		}
	}, [iconData, doubleClickState, setDoubleClickState, dispatch])

	return (
		<>
			<Container onClick={handleDoubleClick}>
				<Icon
					src={iconData.iconUrl}
					selectedIcon={selectedIcon}
					iconData={iconData}
				/>
				<Text selectedIcon={selectedIcon} iconData={iconData}>
					{iconData.name}
				</Text>
			</Container>
		</>
	)
}
