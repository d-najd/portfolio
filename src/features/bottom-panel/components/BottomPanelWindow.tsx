import type { MyWindow } from "@/features/window/windowSlice"
import { unfocus } from "@/features/window/windowSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
	changeActiveWindow,
	selectActiveWindowId,
} from "../../window-drawer/windowDrawerSlice"
import styled from "@emotion/styled"
import {
	WindowsButton,
	WindowsButtonPressedStyle,
} from "@/components/WindowsButton"
import { css } from "@emotion/react"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"
import { desktopEntryFactory } from "@/features/shared/desktopEntry"

interface Props {
	curWindow: MyWindow
}

export const BottomPanelWindow = ({ curWindow }: Props) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)

	return (
		<ContainerButton
			onClick={() => {
				dispatch(unfocus())
				dispatch(changeActiveWindow(curWindow.id))
			}}
			css={pressedButtonStyleOverride(curWindow, activeWindowId)}
		>
			<Row css={Alignment(Alignments.CenteredStart)}>
				<Image src={desktopEntryFactory(curWindow.desktopEntry).icon} />
				<Text>{curWindow.name}</Text>
			</Row>
		</ContainerButton>
	)
}

const pressedButtonStyleOverride = (
	curWindow: MyWindow,
	activeWindowId: number,
) => {
	if (curWindow.id === activeWindowId) {
		return WindowsButtonPressedStyle
	} else {
		return css``
	}
}

const ContainerButton = styled(WindowsButton)`
	width: 125px;
	height: 27px;
	padding-left: 7px;
`

const Image = styled.img`
	width: 18px;
	height: 18px;
`

const Text = styled.span`
	margin-left: 4px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`
