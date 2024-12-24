import { selectWindows } from "../bottom-panel/bottomPanelSlice"
import type { Window } from "../window-manager/windowManagerSlice"
import styled from "@emotion/styled"
import { useAppSelector } from "../../app/hooks"
import theme from "../../theme/theme"
import { Column } from "../../components/Column"
import { Row } from "../../components/Row"
import { Alignment, Alignments } from "../../components/common/CommonProps"
import { WindowsButton } from "../../components/WindowsButton"
import minimizeIcon from "../../resources/icons/minimize-icon.png"
import maximizeIcon from "../../resources/icons/maximize-icon.png"
import closeIcon from "../../resources/icons/close-icon.png"
import React, { useEffect, useState } from "react"

/**
 * Position of the mouse in pixels
 */
interface MousePosition {
	x: number
	y: number
}

/**
 * The current drag state
 * @remarks only one window can be dragged at a time so there is no need to
 * store more than one drag state
 * @remarks this is needed because dragging does not work properly on firefox
 * for some godforsaken reason
 */
interface DragState {
	windowId: number
	isThisDragged: boolean
	dragging: boolean
}

/**
 * Size of the top bar, this is here
 */
const topBarSize = 1.75

export const WindowDrawer = () => {
	const windows = useAppSelector(selectWindows)

	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	})

	const [mouseDown, setMouseDown] = useState<boolean>(false)

	const [dragState, setDragState] = useState<DragState>({
		windowId: -1,
		isThisDragged: false,
		dragging: false,
	})

	const [overNonDraggableState, setOverNonDraggableState] =
		useState<boolean>(false)

	const getWindowOffset = (window: Window) => {
		if (dragState.dragging && window.id === dragState.windowId) {
			const fontSize = parseFloat(
				getComputedStyle(document.body).fontSize,
			)
			return {
				x: mousePosition.x / fontSize,
				y: mousePosition.y / fontSize,
			}
		}
		return {
			x: window.offsetX,
			y: window.offsetY,
		}
	}

	const WindowContainer = styled.div<{ window: Window }>`
		position: absolute;
		background-color: ${theme.colors.primaryBackground};
		border-top: 0.15em outset ${theme.colors.primaryBorderDepressed};
		border-left: 0.15em outset ${theme.colors.primaryBorderDepressed};
		border-right: 0.15em inset ${theme.colors.primaryBorderElevated};
		border-bottom: 0.15em inset ${theme.colors.primaryBorderElevated};
		width: ${o => o.window.width}em;
		height: ${o => o.window.height}em;
		margin-left: ${o => getWindowOffset(o.window).x}em;
		margin-top: ${o => getWindowOffset(o.window).y}em;
	`

	const onDragStart = (window: Window) => {
		setDragState({
			windowId: window.id,
			isThisDragged: true,
			dragging: false,
		})
	}

	if (dragState.isThisDragged && mouseDown && !dragState.dragging) {
		setDragState({ ...dragState, dragging: true })
	}

	if (dragState.isThisDragged && dragState.dragging && !mouseDown) {
		setDragState({ windowId: -1, isThisDragged: false, dragging: false })
		console.log("DRAG STOP")
	}

	const handleDragStart = (window: Window) => {
		onDragStart(window)
		setMouseDown(true)
	}

	MousePositionHandler(setMouseDown, setMousePosition, overNonDraggableState)

	return (
		<>
			{windows.map(window => {
				return (
					<React.Fragment key={window.id}>
						<WindowContainer key={window.id} window={window}>
							<Column>
								<TopBar
									curWindow={window}
									onDragStart={() => {
										handleDragStart(window)
									}}
									nonDraggableState={overNonDraggableState}
									nonDraggableEntered={() =>
										setOverNonDraggableState(true)
									}
									nonDraggableExited={() =>
										setOverNonDraggableState(false)
									}
								></TopBar>
							</Column>
							{window.name}
						</WindowContainer>
					</React.Fragment>
				)
			})}
		</>
	)
}

// This cursed piece of code is necessary due to firefox deciding it does not want to support drag event position
const MousePositionHandler = (
	setMouseDown: React.Dispatch<boolean>,
	setMousePosition: React.Dispatch<MousePosition>,
	overNonDraggableState: boolean,
) => {
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({
				x: event.clientX,
				y: event.clientY,
			})
		}

		const handleMouseUp = () => {
			setMouseDown(false)
			// console.log("MOUSE UP")
		}

		window.addEventListener("mouseup", handleMouseUp)
		window.addEventListener("mousemove", handleMouseMove)

		return () => {
			window.removeEventListener("mouseup", handleMouseUp)
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [overNonDraggableState, setMouseDown, setMousePosition])
}

interface TopBarPreps {
	curWindow: Window
	onDragStart: () => void
	nonDraggableState: boolean
	nonDraggableEntered: () => void
	nonDraggableExited: () => void
}

const TopBar = ({
	curWindow,
	onDragStart,
	nonDraggableState,
	nonDraggableEntered,
	nonDraggableExited,
}: TopBarPreps) => {
	const Root = styled.div`
		padding-right: 0.55em;
		padding-left: 0.1em;
		padding-top: 0.1em;
	`

	const Container = styled(Row)`
		${Alignment(Alignments.VerticallyCentered)}
		padding: 0.075em 0.2em;
		height: ${topBarSize}5em;
		width: 100%;
		background-color: ${theme.colors.windowTopBar};
	`
	const StyledImage = styled.img`
		min-width: 1.5em;
		min-height: 1.5em;
		background-color: red;
		user-select: none;
	`

	const Text = styled.span`
		color: ${theme.colors.primaryTextInverted};
		padding-left: 0.25em;
		font-weight: 500;
		min-width: fit-content;
		user-select: none;
	`

	const ActionsContainer = styled(Row)`
		${Alignment(Alignments.End)}
		display: flex;
		justify-content: flex-end;
		gap: 0.125em;
	`

	const Divider = styled.div`
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
	`

	const TopBarButton = styled(WindowsButton)`
		${Alignment(Alignments.Centered)};
		min-width: 1.5em;
		min-height: 1.5em;
		max-width: 1.5em;
		max-height: 1.5em;
		user-select: none;
	`

	const Icon = styled.img`
		width: 1em;
		height: 1em;
		user-select: none;
	`

	const sendDragStarted = () => {
		if (!nonDraggableState) {
			onDragStart()
		}
	}

	const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.button === 0) {
			sendDragStarted()
		}
	}

	return (
		<Root>
			<Container
				onMouseDown={handleDrag}
				onMouseEnter={nonDraggableExited}
			>
				<StyledImage />
				<Text>{curWindow.name}</Text>
				<Divider />
				<ActionsContainer>
					<TopBarButton
						onMouseEnter={nonDraggableEntered}
						onMouseLeave={nonDraggableExited}
					>
						<Icon src={minimizeIcon} />
					</TopBarButton>
					<TopBarButton
						onMouseEnter={nonDraggableEntered}
						onMouseLeave={nonDraggableExited}
					>
						<Icon src={maximizeIcon} />
					</TopBarButton>
					<TopBarButton
						onMouseEnter={nonDraggableEntered}
						onMouseLeave={nonDraggableExited}
					>
						<Icon src={closeIcon} />
					</TopBarButton>
				</ActionsContainer>
			</Container>
		</Root>
	)
}
