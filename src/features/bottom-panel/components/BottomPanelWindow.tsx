import type { MyWindow } from "@/features/window/windowSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
	changeActiveWindow,
	selectActiveWindowId
} from "../../window-drawer/windowDrawerSlice"
import styled from "@emotion/styled"
import {
	WindowsButton,
	WindowsButtonPressedStyle
} from "@/components/WindowsButton"
import { css } from "@emotion/react"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"

interface Props {
	curWindow: MyWindow
}

export const BottomPanelWindow = ({ curWindow }: Props) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)

	return (
		<ContainerButton
			onClick={() => dispatch(changeActiveWindow(curWindow.id))}
			css={pressedButtonStyleOverride(curWindow, activeWindowId)}
		>
			<Row css={Alignment(Alignments.CenteredStart)}>
				<Image />
				<Text>{curWindow.name}</Text>
			</Row>
		</ContainerButton>
	)
}

const pressedButtonStyleOverride = (
	curWindow: MyWindow,
	activeWindowId: number
) => {
	if (curWindow.id === activeWindowId) {
		return WindowsButtonPressedStyle
	} else {
		return css``
	}
}

const ContainerButton = styled(WindowsButton)`
	padding-left: 7px;
	height: 27px;
	width: 107px;
`

const Image = styled.image`
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
