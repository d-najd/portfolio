import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
	minimizeWindow,
	selectActiveWindowId,
	toggleMaximizeWindow
} from "../windowDrawerSlice"
import styled from "@emotion/styled"
import { Row } from "../../../components/Row"
import theme from "../../../theme/theme"
import type { MyWindow } from "../../window/windowSlice"
import { closeWindow } from "../../window/windowSlice"
import { WindowsButton } from "../../../components/WindowsButton"
import minimizeIcon from "../../../resources/icons/minimize-icon.png"
import maximizeIcon from "../../../resources/icons/maximize-icon.png"
import closeIcon from "../../../resources/icons/close-icon.png"
import type React from "react"
import { useCallback } from "react"
import { Alignment, Alignments } from "@/ui/alignment"

/**
 * Size of the top bar, this is here
 */
const topBarContentHeight = 28
const topBarBorderHeight = 3
export const WindowTopBarHeight = topBarContentHeight + topBarBorderHeight

const Root = styled.div`
	padding-right: 6px;
	height: 31px;
`

interface ContainerProps {
	curWindowId: number
	activeWindowId: number
}

const Container = styled(Row)<ContainerProps>`
	${Alignment(Alignments.VerticallyCentered)}
	padding: 2px ${topBarBorderHeight}px;
	height: ${topBarContentHeight}px;
	width: 100%;
	background-color: ${o =>
		o.curWindowId === o.activeWindowId
			? theme.colors.windowTopBarActive
			: theme.colors.windowTopBarInactive};
`

const StyledImage = styled.img`
	min-width: 24px;
	min-height: 24px;
	background-color: red;
	user-select: none;
`

const Text = styled.span`
	color: ${theme.colors.primaryTextInverted};
	padding-left: 3px;
	font-weight: 500;
	min-width: fit-content;
	user-select: none;
`

const ActionsContainer = styled(Row)`
	${Alignment(Alignments.End)}
	display: flex;
	justify-content: flex-end;
	gap: 2px;
`

const Divider = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
`

const TopBarButton = styled(WindowsButton)`
	${Alignment(Alignments.Centered)};
	min-width: 20px;
	min-height: 20px;
	max-width: 20px;
	max-height: 20px;
	user-select: none;
`

const Icon = styled.img`
	width: 13px;
	height: 13px;
	user-select: none;
`

export interface TopBarPreps {
	myWindow: MyWindow
	onDragStart: () => void
	nonDraggableState: boolean
	nonDraggableEntered: () => void
	nonDraggableExited: () => void
}

/**
 * Top bar of the window, the thing that can be grabbed and contains buttons for managing the window
 * @param curWindow The current window
 * @param onDragStart state for starting drag
 * @param nonDraggableState
 * @param nonDraggableEntered
 * @param nonDraggableExited
 */
export const WindowDrawerTopBar = ({
	myWindow,
	onDragStart,
	nonDraggableState,
	nonDraggableEntered,
	nonDraggableExited
}: TopBarPreps) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)

	const sendDragStarted = useCallback(() => {
		if (!nonDraggableState) {
			onDragStart()
		}
	}, [nonDraggableState, onDragStart])

	const handleDrag = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (e.button === 0) {
				sendDragStarted()
			}
		},
		[sendDragStarted]
	)

	return (
		<Root>
			<Container
				onPointerDown={handleDrag}
				onPointerEnter={nonDraggableExited}
				activeWindowId={activeWindowId}
				curWindowId={myWindow.id}
			>
				<StyledImage />
				<Text>{myWindow.name}</Text>
				<Divider />
				<ActionsContainer>
					<TopBarButton
						onPointerEnter={nonDraggableEntered}
						onPointerLeave={nonDraggableExited}
						onClick={() => dispatch(minimizeWindow(myWindow.id))}
					>
						<Icon src={minimizeIcon} />
					</TopBarButton>
					<TopBarButton
						onPointerEnter={nonDraggableEntered}
						onPointerLeave={nonDraggableExited}
						onClick={() =>
							dispatch(toggleMaximizeWindow(myWindow.id))
						}
					>
						<Icon src={maximizeIcon} />
					</TopBarButton>
					<TopBarButton
						onPointerEnter={nonDraggableEntered}
						onPointerLeave={nonDraggableExited}
						onClick={() => dispatch(closeWindow(myWindow.id))}
					>
						<Icon src={closeIcon} />
					</TopBarButton>
				</ActionsContainer>
			</Container>
		</Root>
	)
}
