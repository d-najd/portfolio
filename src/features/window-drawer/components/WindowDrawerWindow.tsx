import type { MyWindow } from "../../window/windowSlice"
import useScreenSize from "../../../components/useScreenSize"
import type React from "react"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
	changeActiveWindow,
	selectActiveWindowId,
	WindowState
} from "../windowDrawerSlice"
import { bottomPanelHeight } from "../../bottom-panel/BottomPanel"
import styled from "@emotion/styled"
import theme from "../../../theme/theme"
import { WindowDrawerTopBar, WindowTopBarHeight } from "./WindowDrawerTopBar"
import { GetWindowContentByWindowType } from "../../windows/GetWindowContentByWindowType"
import type { DragState, MousePosition } from "../WindowDrawer"

interface WindowContainerProps {
	size: Transform
	offset: Transform
}

const borderSize = 3
const WindowContainer = styled.div<WindowContainerProps>`
	position: absolute;
	background-color: ${theme.colors.primaryBackground};
	border-top: ${borderSize}px outset ${theme.colors.primaryBorderDepressed};
	border-left: ${borderSize}px outset ${theme.colors.primaryBorderDepressed};
	border-right: ${borderSize}px inset ${theme.colors.primaryBorderElevated};
	border-bottom: ${borderSize}px inset ${theme.colors.primaryBorderElevated};
	width: ${o => o.size.x}px;
	height: ${o => o.size.y}px;
	margin-left: ${o => o.offset.x}px;
	margin-top: ${o => o.offset.y}px;
`

interface WindowDrawerWindowProps {
	myWindow: MyWindow
	dragState: DragState
	mousePosition: MousePosition
	overNonDraggableState: boolean
	setOverNonDraggableState: React.Dispatch<boolean>
	onDragStart: (curWindow: MyWindow) => void
}

export const WindowDrawerWindow = ({
	myWindow,
	dragState,
	mousePosition,
	overNonDraggableState,
	setOverNonDraggableState,
	onDragStart
}: WindowDrawerWindowProps) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)
	const screenSize = useScreenSize()

	const getWindowOffset = useCallback(
		(curWindow: MyWindow): Transform => {
			if (
				WindowState.ShownOrMaximized !==
				(curWindow.state & WindowState.ShownOrMaximized)
			) {
				return {
					x: 0,
					y: 0
				}
			}

			if (dragState.dragging && curWindow.id === dragState.windowId) {
				return {
					x: mousePosition.x - dragState.windowXOffset,
					y: mousePosition.y - dragState.windowYOffset
				}
			}
			return {
				x: curWindow.offsetX,
				y: curWindow.offsetY
			}
		},
		[dragState, mousePosition]
	)

	const getWindowSize = useCallback(
		(curWindow: MyWindow): Transform => {
			// On maximize
			if (
				WindowState.ShownOrMaximized !==
				(curWindow.state & WindowState.ShownOrMaximized)
			) {
				// Size due to borders?
				return {
					x: screenSize.x - borderSize,
					y: screenSize.y - bottomPanelHeight - borderSize
				}
			} else {
				return {
					x: curWindow.width,
					y: curWindow.height
				}
			}
		},
		[screenSize]
	)

	const changeActiveWindowAction = useCallback(
		(curWindow: MyWindow) => {
			if (activeWindowId !== curWindow.id) {
				dispatch(changeActiveWindow(curWindow.id))
			}
		},
		[activeWindowId, dispatch]
	)

	return (
		<>
			<WindowContainer
				key={myWindow.id}
				onPointerDown={() => {
					changeActiveWindowAction(myWindow)
				}}
				size={getWindowSize(myWindow)}
				offset={getWindowOffset(myWindow)}
			>
				<WindowDrawerTopBar
					myWindow={myWindow}
					onDragStart={() => {
						onDragStart(myWindow)
					}}
					nonDraggableState={overNonDraggableState}
					nonDraggableEntered={() => setOverNonDraggableState(true)}
					nonDraggableExited={() => setOverNonDraggableState(false)}
				/>
				<GetWindowContentByWindowType
					myWindow={myWindow}
					contentWidth={getWindowSize(myWindow).x}
					contentHeight={
						getWindowSize(myWindow).y - WindowTopBarHeight
					}
				/>
			</WindowContainer>
		</>
	)
}
