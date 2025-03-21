import type { MyWindow } from "@/features/window/windowSlice"
import { unfocus } from "@/features/window/windowSlice"
import useScreenSize from "@/hooks/useScreenSize"
import React, { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
	changeActiveWindow,
	onWindowResize,
	selectMaximizedWindowId,
} from "../windowDrawerSlice"
import { bottomPanelHeight } from "@/features/bottom-panel/BottomPanel.styles"
import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { GetWindowContentByDesktopEntry } from "@/features/windows/GetWindowContentByDesktopEntry"
import type { DragState, MousePosition } from "../WindowDrawer"
import type { Position, Size } from "@/ui/transforms"
import type { Enable } from "re-resizable"
import { Resizable } from "re-resizable"
import { WindowTopBarHeight } from "@/features/window-drawer/components/WindowDrawerTopBar.styles"
import { WindowDrawerTopBar } from "@/features/window-drawer/components/WindowDrawerTopBar"

interface Props {
	myWindow: MyWindow
	dragState: DragState
	mousePosition: MousePosition
	onDragStart: (curWindow: MyWindow) => void
}

export const WindowDrawerWindow = React.memo(
	({ myWindow, dragState, mousePosition, onDragStart }: Props) => {
		const dispatch = useAppDispatch()
		const maximizedWindowId = useAppSelector(selectMaximizedWindowId)
		const screenSize = useScreenSize()

		const [resizeEnabled, setResizeEnabled] = useState<Enable>(
			asResizeEnable(maximizedWindowId !== myWindow.id),
		)

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
				dispatch(unfocus())
				dispatch(changeActiveWindow(curWindow.id))
			},
			[dispatch],
		)

		// Set resize enabled
		useEffect(() => {
			setResizeEnabled(asResizeEnable(maximizedWindowId !== myWindow.id))
		}, [maximizedWindowId, myWindow.id])

		return (
			<Resizable
				size={getWindowSize(myWindow)}
				minWidth={myWindow.minWidth}
				minHeight={myWindow.minHeight}
				style={resizableContainerStyle(getWindowOffset(myWindow))}
				enable={resizeEnabled}
				onResizeStart={() => {
					changeActiveWindowAction(myWindow)
				}}
				onResize={(event, direction, elementRef, delta) => {
					// If we let the state update it will feel clunky, so updating positions here
					const windowOffset = getWindowOffset(myWindow)

					if (
						direction === "bottomLeft" ||
						direction === "left" ||
						direction === "topLeft"
					) {
						elementRef.style.marginLeft =
							windowOffset.x - delta.width + "px"
					}

					if (
						direction === "topLeft" ||
						direction === "top" ||
						direction === "topRight"
					) {
						elementRef.style.marginTop =
							windowOffset.y - delta.height + "px"
					}
				}}
				onResizeStop={(event, direction, elementRef, delta) => {
					const windowOffset = getWindowOffset(myWindow)

					let newX = windowOffset.x
					let newY = windowOffset.y

					if (
						direction === "bottomLeft" ||
						direction === "left" ||
						direction === "topLeft"
					) {
						newX -= delta.width
					}

					if (
						direction === "topLeft" ||
						direction === "top" ||
						direction === "topRight"
					) {
						newY -= delta.height
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
					/>
					<ContentWrapper>
						<GetWindowContentByDesktopEntry
							desktopEntry={myWindow.desktopEntry}
						/>
					</ContentWrapper>
				</WindowContainer>
			</Resizable>
		)
	},
)

/*

					<WindowDrawerTopBar
						myWindow={myWindow}
						onDragStart={() => {
							onDragStart(myWindow)
						}}
					/>

 */

const asResizeEnable = (enabled: boolean): Enable => ({
	top: enabled,
	right: enabled,
	bottom: enabled,
	left: enabled,
	topRight: enabled,
	bottomRight: enabled,
	bottomLeft: enabled,
	topLeft: enabled,
})

const resizableContainerStyle = (offset: Position): React.CSSProperties => ({
	position: "absolute",
	marginLeft: `${offset.x}px`,
	marginTop: `${offset.y}px`,
})

interface WindowContainerProps {
	size: Size
	offset: Position
}

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
`

const ContentWrapper = styled.div`
	width: 100%;
	height: calc(100% - ${WindowTopBarHeight + borderSize}px);
`
