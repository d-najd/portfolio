import { Row } from "../../../components/Row"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import type { MyWindow } from "../../window/WindowSlice"
import { useWindows } from "../../window/WindowSlice"
import { WindowsButton, WindowsButtonPressedStyle } from "../../../components/WindowsButton"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { changeActiveWindow, selectActiveWindowId } from "../../window-drawer/WindowDrawerSlice"
import { css } from "@emotion/react"

/**
 * List of opened windows on the bottom panel
 */
export const BottomPanelWindows = () => {
	const windows = useWindows()

	const Container = styled(Row)`
		${Alignment(Alignments.CenteredStart)};
		padding-left: 0.5em;
		gap: 0.25em;
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
		min-height: 2em;
		min-width: 8em;
		max-width: 8em;
	`
	
	const extraButtonStyle = () => {
		if (curWindow.id === activeWindowId) {
			return WindowsButtonPressedStyle
		}
		else {
			return css``
		}
	}

	const ContainerContent = styled(Row)`
		${Alignment(Alignments.CenteredStart)};
		padding-left: 0.2em;
		padding-right: 0.2em;
	`

	const WindowImage = styled.image`
		min-width: 1em;
		min-height: 1em;
		background-color: red;
	`

	const Text = styled.span`
		margin-left: 0.2em;
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