import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
	minimizeWindow,
	selectActiveWindowId,
	toggleMaximizeWindow
} from "../windowDrawerSlice"
import type { MyWindow } from "@/features/window/windowSlice"
import { closeWindow } from "@/features/window/windowSlice"
import minimizeIcon from "@/resources/icons/minimize-icon.png"
import maximizeIcon from "@/resources/icons/maximize-icon.png"
import closeIcon from "@/resources/icons/close-icon.png"
import type React from "react"
import { useCallback } from "react"
import * as S from "./WindowDrawerTopBar.styles"

export interface Props {
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
}: Props) => {
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
		<S.Container
			onPointerDown={handleDrag}
			onPointerEnter={nonDraggableExited}
			activeWindowId={activeWindowId}
			curWindowId={myWindow.id}
		>
			<S.StyledImage />
			<S.Text>{myWindow.name}</S.Text>
			<S.ActionsContainer>
				<S.TopBarButton
					onPointerEnter={nonDraggableEntered}
					onPointerLeave={nonDraggableExited}
					onClick={() => dispatch(minimizeWindow(myWindow.id))}
				>
					<S.Icon src={minimizeIcon} />
				</S.TopBarButton>
				<S.TopBarButton
					onPointerEnter={nonDraggableEntered}
					onPointerLeave={nonDraggableExited}
					onClick={() => dispatch(toggleMaximizeWindow(myWindow.id))}
				>
					<S.Icon src={maximizeIcon} />
				</S.TopBarButton>
				<S.TopBarButton
					onPointerEnter={nonDraggableEntered}
					onPointerLeave={nonDraggableExited}
					onClick={() => dispatch(closeWindow(myWindow.id))}
				>
					<S.Icon src={closeIcon} />
				</S.TopBarButton>
			</S.ActionsContainer>
		</S.Container>
	)
}
