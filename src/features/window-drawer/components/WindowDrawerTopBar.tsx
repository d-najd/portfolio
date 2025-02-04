import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
	minimizeWindow,
	selectActiveWindowId,
	toggleMaximizeWindow,
} from "../windowDrawerSlice"
import type { MyWindow } from "@/features/window/windowSlice"
import { closeWindow } from "@/features/window/windowSlice"
import minimizeIcon from "@/resources/icons/minimize-icon.png"
import maximizeIcon from "@/resources/icons/maximize-icon.png"
import closeIcon from "@/resources/icons/close-icon.png"
import React, { useCallback } from "react"
import * as S from "./WindowDrawerTopBar.styles"
import { desktopEntryFactory } from "@/features/shared/desktopEntry"

export interface Props {
	myWindow: MyWindow
	onDragStart: () => void
}

/**
 * Top bar of the window, the thing that can be grabbed and contains buttons for managing the window
 * @param curWindow The current window
 * @param onDragStart state for starting drag
 * @param nonDraggableState
 * @param nonDraggableEntered
 * @param nonDraggableExited
 */
export const WindowDrawerTopBar = React.memo(
	({ myWindow, onDragStart }: Props) => {
		const dispatch = useAppDispatch()
		const activeWindowId = useAppSelector(selectActiveWindowId)

		const sendDragStarted = useCallback(() => {
			onDragStart()
		}, [onDragStart])

		const handleDrag = useCallback(
			(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				// console.log(e.relatedTarget)
				// console.log(e.target)
				// console.log(e.currentTarget)
				if (e.button === 0 && e.target === e.currentTarget) {
					sendDragStarted()
				}
			},
			[sendDragStarted],
		)

		return (
			<S.Container
				onPointerDown={handleDrag}
				activeWindowId={activeWindowId}
				curWindowId={myWindow.id}
			>
				<S.StyledImage
					src={desktopEntryFactory(myWindow.desktopEntry).icon}
				/>
				<S.Text>{myWindow.name}</S.Text>
				<S.ActionsContainer>
					<S.TopBarButton
						onPointerUp={() =>
							dispatch(minimizeWindow(myWindow.id))
						}
					>
						<S.Icon src={minimizeIcon} />
					</S.TopBarButton>
					<S.TopBarButton
						onPointerUp={() =>
							dispatch(toggleMaximizeWindow(myWindow.id))
						}
					>
						<S.Icon src={maximizeIcon} />
					</S.TopBarButton>
					<S.TopBarButton
						onPointerUp={() => dispatch(closeWindow(myWindow.id))}
					>
						<S.Icon src={closeIcon} />
					</S.TopBarButton>
				</S.ActionsContainer>
			</S.Container>
		)
	},
)
