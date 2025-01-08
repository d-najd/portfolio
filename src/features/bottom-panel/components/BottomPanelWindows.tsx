import { Row } from "../../../components/Row"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import type { MyWindow } from "../../window/windowSlice"
import { useWindows } from "../../window/windowSlice"
import {
	WindowsButton,
	WindowsButtonPressedStyle
} from "../../../components/WindowsButton"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
	changeActiveWindow,
	selectActiveWindowId
} from "../../window-drawer/windowDrawerSlice"
import { css } from "@emotion/react"

/**
 * List of opened windows on the bottom panel
 */
export const BottomPanelWindows = () => {
	const windows = useWindows()

	const Container = styled(Row)`
		${Alignment(Alignments.CenteredStart)};
		padding-left: 8px;
		gap: 4px;
	`

	return (
		<>
			<Container>
				{windows.map(curWindow => {
					return <WindowsContainer curWindow={curWindow} />
				})}
			</Container>
		</>
	)
}

interface WindowContainerProps {
	curWindow: MyWindow
}

export const WindowsContainer = ({ curWindow }: WindowContainerProps) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)

	const ContainerButton = styled(WindowsButton)`
		min-height: 27px;
		min-width: 107px;
		max-width: 107px;
	`

	const extraButtonStyle = () => {
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

	return (
		<>
			<ContainerButton
				onClick={o => dispatch(changeActiveWindow(curWindow.id))}
				css={extraButtonStyle}
			>
				<ContainerContent>
					<WindowImage />
					<Text>{curWindow.name}</Text>
				</ContainerContent>
			</ContainerButton>
		</>
	)
}
