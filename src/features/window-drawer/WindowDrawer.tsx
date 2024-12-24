import { selectWindows } from "../bottom-panel/bottomPanelSlice"
import type { Window } from "../window-manager/windowManagerSlice"
import styled from "@emotion/styled"
import { useAppSelector } from "../../app/hooks"
import { CurTheme } from "../../theme/theme"
import { Column } from "../../components/Column"
import { Row } from "../../components/Row"
import { Alignment, Alignments } from "../../components/common/CommonProps"
import { WindowsButton } from "../../components/WindowsButton"
import minimizeIcon from "../../resources/icons/minimize-icon.png"
import maximizeIcon from "../../resources/icons/maximize-icon.png"
import closeIcon from "../../resources/icons/close-icon.png"
import { useEffect, useState } from "react"
import React from "react"

export const WindowDrawer = () => {
	const windows = useAppSelector(selectWindows)

	const WindowContainer = styled.div<{ window: Window }>`
		position: absolute;
		background-color: ${CurTheme().colors.primaryBackground};
		border-top: 0.15em outset ${CurTheme().colors.primaryBorderDepressed};
		border-left: 0.15em outset ${CurTheme().colors.primaryBorderDepressed};
		border-right: 0.15em inset ${CurTheme().colors.primaryBorderElevated};
		border-bottom: 0.15em inset ${CurTheme().colors.primaryBorderElevated};
		width: ${o => o.window.width}em;
		height: ${o => o.window.height}em;
		margin-left: ${o => o.window.offsetX}em;
		margin-top: ${o => o.window.offsetY}em;
	`

	const [mousePosition, setMousePosition] = useState<{
		x: number
		y: number
	}>({
		x: 0,
		y: 0,
	})

	const [mouseDown, setMouseDown] = useState<{
		isDown: boolean
	}>({
		isDown: false,
	})

	const [dragState, setDragState] = useState<{
		windowId: number
		isThisDragged: boolean
		dragging: boolean
	}>({
		windowId: -1,
		isThisDragged: false,
		dragging: false,
	})

	console.log(
		`DRAG STATE ${Boolean(dragState.dragging)} ${Boolean(dragState.isThisDragged)} mouse ${Boolean(mouseDown.isDown)} pos ${Number(mousePosition.x)}`,
	)

	const onDragStart = (window: Window) => {
		setDragState({
			windowId: window.id,
			isThisDragged: true,
			dragging: false,
		})
	}

	if (dragState.isThisDragged && mouseDown.isDown && !dragState.dragging) {
		setDragState({ ...dragState, dragging: true })
	}

	if (dragState.isThisDragged && dragState.dragging && !mouseDown.isDown) {
		setDragState({ windowId: -1, isThisDragged: false, dragging: false })
		console.log("DRAG STOP")
	}

	if (dragState.dragging) {
		console.log("IS DRAGGING")
	}

	MousePositionHandler(setMouseDown, setMousePosition)

	return (
		<>
			{windows.map(window => {
				return (
					<React.Fragment key={window.id}>
						<WindowContainer key={window.id} window={window}>
							<Column>
								<TopBar
									curWindow={window}
									mousePosition={mousePosition}
									dragging={
										window.id === dragState.windowId &&
										dragState.dragging
									}
									onDragStart={() => onDragStart(window)}
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
	setMouseDown: React.Dispatch<React.SetStateAction<{ isDown: boolean }>>,
	setMousePosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>,
) => {
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({
				x: event.clientX,
				y: event.clientY,
			})
		}

		const handleMouseUp = () => {
			setMouseDown({ isDown: false })
			console.log("MOUSE UP")
		}

		const handleMouseDown = () => {
			setMouseDown({ isDown: true })
			console.log("MOUSE DOWN")
		}

		window.addEventListener("mouseup", handleMouseUp)
		window.addEventListener("mousedown", handleMouseDown)
		window.addEventListener("mousemove", handleMouseMove)

		return () => {
			window.removeEventListener("mouseup", handleMouseUp)
			window.removeEventListener("mousedown", handleMouseDown)
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [setMouseDown, setMousePosition])
}

interface TopBarPreps {
	curWindow: Window
	mousePosition: { x: number; y: number }
	dragging: boolean
	onDragStart: () => void
}

const TopBar = ({
	curWindow,
	mousePosition,
	dragging,
	onDragStart,
}: TopBarPreps) => {
	const Root = styled.div`
		padding-right: 0.55em;
		padding-left: 0.1em;
		padding-top: 0.1em;
	`

	const Container = styled(Row)`
		${Alignment(Alignments.VerticallyCentered)}
		padding: 0.075em 0.2em;
		height: 1.75em;
		width: 100%;
		background-color: ${CurTheme().colors.windowTopBar};
	`
	const StyledImage = styled.img`
		min-width: 1.5em;
		min-height: 1.5em;
		background-color: red;
		user-select: none;
	`

	const Text = styled.span`
		color: ${CurTheme().colors.primaryTextInverted};
		padding-left: 0.25em;
		font-weight: 500;
		min-width: fit-content;
		user-select: none;
	`

	const ActionsContainer = styled(Row)`
		${Alignment(Alignments.End)}
		display: flex;
		justify-content: flex-end;
		width: 100%;
		gap: 0.125em;
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

	/*
	const fontSize = parseFloat(getComputedStyle(document.body).fontSize)
	 */

	return (
		<Root onMouseDown={() => onDragStart()}>
			<Container>
				<StyledImage />
				<Text>{curWindow.name}</Text>
				<ActionsContainer>
					<TopBarButton>
						<Icon src={minimizeIcon} />
					</TopBarButton>
					<TopBarButton>
						<Icon src={maximizeIcon} />
					</TopBarButton>
					<TopBarButton>
						<Icon src={closeIcon} />
					</TopBarButton>
				</ActionsContainer>
			</Container>
		</Root>
	)
}
