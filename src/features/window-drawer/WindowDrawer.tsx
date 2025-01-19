import type { MyWindow } from "../window/windowSlice"
import { useWindows } from "../window/windowSlice"
import { useAppDispatch } from "@/app/hooks"
import React, { useCallback, useEffect, useState } from "react"
import { moveWindow, WindowState } from "./windowDrawerSlice"
import { WindowDrawerWindow } from "./components/WindowDrawerWindow"

/**
 * Position of the mouse in pixels
 */
export interface MousePosition {
	x: number
	y: number
}

/**
 * The current drag state
 * @remarks only one window can be dragged at a time so there is no need to store more than one drag state
 * @remarks this is needed because dragging does not work properly on firefox for some godforsaken reason
 */
export interface DragState {
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
	windowYOffset: -1,
}

/**
 * Should be fine since all windows have the same top bar height
 */
// let WindowDrawerTopBarHeight = 0

/**
 * Handles drawing of the windows
 *
 * @remarks dragging does not work properly in firefox so it had to be re-implemented, if interactables (buttons) don't
 * work properly check setOverNonDraggableState
 */
export const WindowDrawer = React.memo(() => {
	const dispatch = useAppDispatch()
	const windows = useWindows()

	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
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

	const handleDragStart = useCallback(
		(curWindow: MyWindow) => {
			setDragState({
				windowId: curWindow.id,
				dragging: true,
				windowXOffset: mousePosition.x - curWindow.offsetX,
				windowYOffset: mousePosition.y - curWindow.offsetY,
			})
			setMouseDown(true)
			document.body.style.userSelect = "none"
		},
		[mousePosition.x, mousePosition.y],
	)

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
						offsetY: offsetY,
					}),
				)
				setDragState(defaultWindowState)
			}
		}
	}, [dispatch, dragState, mouseDown, mousePosition, windows])

	return (
		<>
			{windows
				.filter(
					o =>
						WindowState.Minimized !==
						(o.state & WindowState.Minimized),
				)
				.sort((b, o) => o.drawOrder - b.drawOrder)
				.map(myWindow => {
					return (
						<WindowDrawerWindow
							myWindow={myWindow}
							dragState={dragState}
							mousePosition={mousePosition}
							overNonDraggableState={overNonDraggableState}
							setOverNonDraggableState={setOverNonDraggableState}
							onDragStart={handleDragStart}
							key={myWindow.id}
						/>
					)
				})}
		</>
	)
})

/**
 * Updates the state for various mouse events
 * @remarks This cursed piece of code is necessary due to firefox deciding it does not want to support drag event
 * position
 */
const MousePositionHandler = (
	setMouseDown: React.Dispatch<boolean>,
	setMousePosition: React.Dispatch<MousePosition>,
	overNonDraggableState: boolean,
) => {
	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			setMousePosition({
				x: event.clientX,
				y: event.clientY,
			})
		},
		[setMousePosition],
	)

	const handleMouseUp = useCallback(() => {
		setMouseDown(false)
	}, [setMouseDown])

	useEffect(() => {
		window.addEventListener("pointerup", handleMouseUp)
		window.addEventListener("pointermove", handleMouseMove)

		return () => {
			window.removeEventListener("pointerup", handleMouseUp)
			window.removeEventListener("pointermove", handleMouseMove)
		}
	}, [
		handleMouseMove,
		handleMouseUp,
		overNonDraggableState,
		setMouseDown,
		setMousePosition,
	])
}
