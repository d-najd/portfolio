import type { MyWindow } from "@/features/window/windowSlice"
import useScreenSize from "@/hooks/useScreenSize"
import React, { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
	changeActiveWindow,
	onWindowResize,
	selectMaximizedWindowId,
} from "../windowDrawerSlice"
import { bottomPanelHeight } from "@/features/bottom-panel/BottomPanel.styles"
import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { WindowDrawerTopBar } from "./WindowDrawerTopBar"
import { GetWindowContentByWindowType } from "@/features/windows/GetWindowContentByWindowType"
import type { DragState, MousePosition } from "../WindowDrawer"
import type { Position, Size } from "@/ui/transforms"
import { Resizable } from "re-resizable"

interface Props {
	myWindow: MyWindow
	dragState: DragState
	mousePosition: MousePosition
	overNonDraggableState: boolean
	setOverNonDraggableState: React.Dispatch<boolean>
	onDragStart: (curWindow: MyWindow) => void
}

export const WindowDrawerWindow = React.memo(
	({
		myWindow,
		dragState,
		mousePosition,
		overNonDraggableState,
		setOverNonDraggableState,
		onDragStart,
	}: Props) => {
		const dispatch = useAppDispatch()
		const maximizedWindowId = useAppSelector(selectMaximizedWindowId)
		const screenSize = useScreenSize()

		const getWindowOffset = useCallback(
			(curWindow: MyWindow): Position => {
				if (curWindow.id === maximizedWindowId) {
					return {
						x: 0,
						y: 0,
					}
				}

				if (dragState.dragging && curWindow.id === dragState.windowId) {
					return {
						x: mousePosition.x - dragState.windowXOffset,
						y: mousePosition.y - dragState.windowYOffset,
					}
				}
				return {
					x: curWindow.offsetX,
					y: curWindow.offsetY,
				}
			},
			[dragState, mousePosition, maximizedWindowId],
		)

		const getWindowSize = useCallback(
			(curWindow: MyWindow): Size => {
				// On maximize
				if (curWindow.id === maximizedWindowId) {
					// Size due to borders?
					return {
						width: screenSize.width - borderSize,
						height:
							screenSize.height - bottomPanelHeight - borderSize,
					}
				} else {
					return {
						width: curWindow.width,
						height: curWindow.height,
					}
				}
			},
			[screenSize, maximizedWindowId],
		)

		const changeActiveWindowAction = useCallback(
			(curWindow: MyWindow) => {
				dispatch(changeActiveWindow(curWindow.id))
			},
			[dispatch],
		)

		return (
			<Resizable
				size={getWindowSize(myWindow)}
				style={resizableContainerStyle(getWindowOffset(myWindow))}
				onResize={(event, direction, elementRef, delta) => {
					// If we let the state update it will feel clunky, so updating positions here
					if (
						direction === "left" ||
						direction === "top" ||
						direction === "topLeft"
					) {
						const windowOffset = getWindowOffset(myWindow)
						elementRef.style.marginLeft =
							windowOffset.x - delta.width + "px"

						elementRef.style.marginTop =
							windowOffset.y - delta.height + "px"
					}
				}}
				onResizeStop={(event, direction, elementRef, delta) => {
					const windowOffset = getWindowOffset(myWindow)

					let newX = 0
					let newY = 0

					if (
						direction === "left" ||
						direction === "top" ||
						direction === "topLeft"
					) {
						newX = windowOffset.x - delta.width
						newY = windowOffset.y - delta.height
					} else {
						newX = windowOffset.x
						newY = windowOffset.y
					}

					dispatch(
						onWindowResize({
							id: myWindow.id,
							width: myWindow.width + delta.width,
							height: myWindow.height + delta.height,
							x: newX,
							y: newY,
						}),
					)
				}}
			>
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
						nonDraggableEntered={() =>
							setOverNonDraggableState(true)
						}
						nonDraggableExited={() =>
							setOverNonDraggableState(false)
						}
					/>
					<GetWindowContentByWindowType
						windowType={myWindow.windowType}
					/>
				</WindowContainer>
			</Resizable>
		)
	},
)

interface WindowContainerProps {
	size: Size
	offset: Position
}

const resizableContainerStyle = (offset: Position): React.CSSProperties => ({
	position: "absolute",
	marginLeft: `${offset.x}px`,
	marginTop: `${offset.y}px`,
})

// Resizing using grab on the borders feels better, thats why this is wrapped
const borderSize = 3
const WindowContainer = styled.div<WindowContainerProps>`
	position: absolute;
	width: 100%;
	height: 100%;
	border-top: ${borderSize}px outset ${theme.colors.primaryBorderDepressed};
	border-left: ${borderSize}px outset ${theme.colors.primaryBorderDepressed};
	border-right: ${borderSize}px inset ${theme.colors.primaryBorderElevated};
	border-bottom: ${borderSize}px inset ${theme.colors.primaryBorderElevated};
	background-color: ${theme.colors.primaryBackground};
	overflow: hidden;
`
