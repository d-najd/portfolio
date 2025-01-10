import type { MyWindow } from "../window/windowSlice"
import { useWindows } from "../window/windowSlice"
import styled from "@emotion/styled"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import theme from "../../theme/theme"
import React, { useEffect, useRef, useState } from "react"
import {
	changeActiveWindow,
	moveWindow,
	selectActiveWindowId,
	WindowState
} from "./windowDrawerSlice"
import { WindowDrawerTopBar } from "./components/WindowDrawerTopBar"
import { bottomPanelHeight } from "../bottom-panel/BottomPanel"
import useScreenSize from "../../components/useScreenSize"
import {
	GetWindowContentByWindowType
} from "../windows/GetWindowContentByWindowType"
import { Column } from "../../components/Column"

/**
 * Position of the mouse in pixels
 */
interface MousePosition {
	x: number
	y: number
}

/**
 * The current drag state
 * @remarks only one window can be dragged at a time so there is no need to store more than one drag state
 * @remarks this is needed because dragging does not work properly on firefox for some godforsaken reason
 */
interface DragState {
	windowId: number
	dragging: boolean
	/**
	 * The window needs to be offset-ted certain amount to account for x and y differences between the cursor and window
	 * origin
	 */
	windowXOffset: number
	/**
	 * The window needs to be offset-ted certain amount to account for x and y differences between the cursor and window
	 * origin
	 */
	windowYOffset: number
}

const defaultWindowState: DragState = {
	windowId: -1,
	dragging: false,
	windowXOffset: -1,
	windowYOffset: -1
}

/**
 * Should be fine since all windows have the same top bar height
 */
let WindowDrawerTopBarHeight = 0

/**
 * Handles drawing of the windows
 *
 * @remarks dragging does not work properly in firefox so it had to be re-implemented, if interactables (buttons) don't
 * work properly check setOverNonDraggableState
 */
export const WindowDrawer = () => {
	const dispatch = useAppDispatch()
	const windows = useWindows()
	const activeWindowId = useAppSelector(selectActiveWindowId)
	const screenSize = useScreenSize()

	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0
	})

	/**
	 * Whether left mouse click is pressed or not
	 */
	const [mouseDown, setMouseDown] = useState(false)

	const [dragState, setDragState] = useState<DragState>(defaultWindowState)

	/**
	 * Non-draggable are components like buttons, use the setter if the same behaviour breaks.
	 */
	const [overNonDraggableState, setOverNonDraggableState] = useState(false)

	const onDragStart = (curWindow: MyWindow) => {
		setDragState({
			windowId: curWindow.id,
			dragging: true,
			windowXOffset: mousePosition.x - curWindow.offsetX,
			windowYOffset: mousePosition.y - curWindow.offsetY
		})
		setMouseDown(true)
		document.body.style.userSelect = "none"
	}

	MousePositionHandler(setMouseDown, setMousePosition, overNonDraggableState)

	useEffect(() => {
		/**
		 * Gets invoked when dragging ends
		 * @remarks may get invoked multiple times
		 */
		if (dragState.dragging && !mouseDown) {
			const offsetX = mousePosition.x - dragState.windowXOffset
			const offsetY = mousePosition.y - dragState.windowYOffset
			const curWindow = windows.find(o => o.id === dragState.windowId)

			// The event gets called multiple times, avoiding the second call
			if (
				!(
					curWindow !== undefined &&
					curWindow.offsetX === offsetX &&
					curWindow.offsetY === offsetY
				)
			) {
				document.body.style.userSelect = ""

				dispatch(
					moveWindow({
						id: dragState.windowId,
						offsetX: offsetX,
						offsetY: offsetY
					})
				)
				setDragState(defaultWindowState)
			}
		}
	}, [dispatch, dragState, mouseDown, mousePosition, windows])

	const getWindowOffset = (curWindow: MyWindow) => {
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
	}

	const borderSize = 3

	const getWindowSize = (curWindow: MyWindow) => {
		// On maximize
		if (
			WindowState.ShownOrMaximized !==
			(curWindow.state & WindowState.ShownOrMaximized)
		) {
			// Size due to borders?
			return {
				width: screenSize.width - borderSize,
				height: screenSize.height - bottomPanelHeight - borderSize
			}
		} else {
			return {
				width: curWindow.width,
				height: curWindow.height
			}
		}
	}

	const WindowContainer = styled.div<{ curWindow: MyWindow }>`
		position: absolute;
		background-color: ${theme.colors.primaryBackground};
		border-top: ${borderSize}px outset
			${theme.colors.primaryBorderDepressed};
		border-left: ${borderSize}px outset
			${theme.colors.primaryBorderDepressed};
		border-right: ${borderSize}px inset
			${theme.colors.primaryBorderElevated};
		border-bottom: ${borderSize}px inset
			${theme.colors.primaryBorderElevated};
		width: ${o => getWindowSize(o.curWindow).width}px;
		height: ${o => getWindowSize(o.curWindow).height}px;
		margin-left: ${o => getWindowOffset(o.curWindow).x}px;
		margin-top: ${o => getWindowOffset(o.curWindow).y}px;
	`

	const changeActiveWindowAction = (curWindow: MyWindow) => {
		if (activeWindowId !== curWindow.id) {
			dispatch(changeActiveWindow(curWindow.id))
		}
	}

	const windowTopBarHeight = useRef<HTMLDivElement | null>(null)
	if (windowTopBarHeight.current) {
		WindowDrawerTopBarHeight = windowTopBarHeight.current.offsetHeight
	}

	return (
		<>
			{windows
				.filter(
					o =>
						WindowState.Minimized !==
						(o.state & WindowState.Minimized)
				)
				.sort((b, o) => o.drawOrder - b.drawOrder)
				.map(window => {
					return (
						<React.Fragment key={window.id}>
							<WindowContainer
								key={window.id}
								curWindow={window}
								onPointerDown={() => {
									changeActiveWindowAction(window)
								}}
							>
								<Column>
									<div ref={windowTopBarHeight}>
										<WindowDrawerTopBar
											curWindow={window}
											onDragStart={() => {
												onDragStart(window)
											}}
											nonDraggableState={
												overNonDraggableState
											}
											nonDraggableEntered={() =>
												setOverNonDraggableState(true)
											}
											nonDraggableExited={() =>
												setOverNonDraggableState(false)
											}
										/>
									</div>
								</Column>
								<GetWindowContentByWindowType
									myWindow={window}
									contentWidth={window.width}
									contentHeight={
										window.height - WindowDrawerTopBarHeight
									}
								/>
							</WindowContainer>
						</React.Fragment>
					)
				})}
		</>
	)
}

/**
 * Updates the state for various mouse events
 * @remarks This cursed piece of code is necessary due to firefox deciding it does not want to support drag event
 * position
 */
const MousePositionHandler = (
	setMouseDown: React.Dispatch<boolean>,
	setMousePosition: React.Dispatch<MousePosition>,
	overNonDraggableState: boolean
) => {
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({
				x: event.clientX,
				y: event.clientY
			})
		}

		const handleMouseUp = () => {
			setMouseDown(false)
		}

		window.addEventListener("pointerup", handleMouseUp)
		window.addEventListener("pointermove", handleMouseMove)

		return () => {
			window.removeEventListener("pointerup", handleMouseUp)
			window.removeEventListener("pointermove", handleMouseMove)
		}
	}, [overNonDraggableState, setMouseDown, setMousePosition])
}
