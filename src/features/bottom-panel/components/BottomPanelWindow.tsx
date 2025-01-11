import type { MyWindow } from "../../window/windowSlice"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
	changeActiveWindow,
	selectActiveWindowId
} from "../../window-drawer/windowDrawerSlice"
import styled from "@emotion/styled"
import {
	WindowsButton,
	WindowsButtonPressedStyle
} from "../../../components/WindowsButton"
import { css } from "@emotion/react"
import { Row } from "../../../components/Row"
import { Alignment, Alignments } from "../../../components/common/CommonProps"

const ContainerButton = styled(WindowsButton)`
	min-height: 27px;
	min-width: 107px;
	max-width: 107px;
`

const extraButtonStyle = (curWindow: MyWindow, activeWindowId: number) => {
	if (curWindow.id === activeWindowId) {
		return WindowsButtonPressedStyle
	} else {
		return css``
	}
}

const ContainerContent = styled(Row)`
	${Alignment(Alignments.CenteredStart)};
	padding-left: 3px;
	padding-right: 3px;
`

const WindowImage = styled.image`
	min-width: 14px;
	min-height: 14px;
	background-color: red;
`

const Text = styled.span`
	margin-left: 3px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

export interface BottomPanelWindowProps {
	curWindow: MyWindow
}

export const BottomPanelWindow = ({ curWindow }: BottomPanelWindowProps) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)

	return (
		<>
			<ContainerButton
				onClick={() => dispatch(changeActiveWindow(curWindow.id))}
				css={extraButtonStyle(curWindow, activeWindowId)}
			>
				<ContainerContent>
					<WindowImage />
					<Text>{curWindow.name}</Text>
				</ContainerContent>
			</ContainerButton>
		</>
	)
}
