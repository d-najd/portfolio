import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectActiveWindowId } from "../WindowDrawerSlice"
import styled from "@emotion/styled"
import { Row } from "../../../components/Row"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import theme from "../../../theme/theme"
import type { MyWindow } from "../../window/WindowSlice"
import { closeWindow } from "../../window/WindowSlice"
import { WindowsButton } from "../../../components/WindowsButton"
import minimizeIcon from "../../../resources/icons/minimize-icon.png"
import maximizeIcon from "../../../resources/icons/maximize-icon.png"
import closeIcon from "../../../resources/icons/close-icon.png"

export interface TopBarPreps {
	curWindow: MyWindow
	onDragStart: () => void
	nonDraggableState: boolean
	nonDraggableEntered: () => void
	nonDraggableExited: () => void
}

/**
 * Size of the top bar, this is here
 */
const topBarSize = 1.75

/**
 * Top bar of the window, the thing that can be grabbed and contains buttons for managing the window
 * @param curWindow The current window
 * @param onDragStart state for starting drag
 * @param nonDraggableState
 * @param nonDraggableEntered
 * @param nonDraggableExited
 */
export const WindowDrawerTopBar = ({
	curWindow,
	onDragStart,
	nonDraggableState,
	nonDraggableEntered,
	nonDraggableExited,
}: TopBarPreps) => {
	const dispatch = useAppDispatch()
	const activeWindowId = useAppSelector(selectActiveWindowId)

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
		background-color: ${curWindow.id === activeWindowId
			? theme.colors.windowTopBarActive
			: theme.colors.windowTopBarInactive};
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
				onPointerDown={handleDrag}
				onPointerEnter={nonDraggableExited}
			>
				<StyledImage />
				<Text>{curWindow.name}</Text>
				<Divider />
				<ActionsContainer>
					<TopBarButton
						onPointerEnter={nonDraggableEntered}
						onPointerLeave={nonDraggableExited}
					>
						<Icon src={minimizeIcon} />
					</TopBarButton>
					<TopBarButton
						onPointerEnter={nonDraggableEntered}
						onPointerLeave={nonDraggableExited}
					>
						<Icon src={maximizeIcon} />
					</TopBarButton>
					<TopBarButton
						onPointerEnter={nonDraggableEntered}
						onPointerLeave={nonDraggableExited}
						onClick={() => dispatch(closeWindow(curWindow.id))}
					>
						<Icon src={closeIcon} />
					</TopBarButton>
				</ActionsContainer>
			</Container>
		</Root>
	)
}
