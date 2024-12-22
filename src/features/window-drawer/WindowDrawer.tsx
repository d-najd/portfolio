import { selectWindows } from "../bottom-panel/bottomPanelSlice"
import type { Window } from "../window-manager/windowManagerSlice"
import styled from "@emotion/styled"
import { useAppSelector } from "../../app/hooks"
import { CurTheme } from "../../theme/theme"
import { Column } from "../../components/Column"
import { Row } from "../../components/Row"
import { Alignment, Alignments } from "../../components/common/CommonProps"
import { WindowsButton } from "../../components/WindowsButton"

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

	return (
		<>
			{windows.map(window => {
				return (
					<>
						<WindowContainer window={window}>
							<Column>
								<TopBar window={window}></TopBar>
							</Column>
							{window.name}
						</WindowContainer>
					</>
				)
			})}
		</>
	)
}

interface TopBarPreps {
	window: Window
}

const TopBar = (window: TopBarPreps) => {
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
		user-select: none;
	`

	const ActionsContainer = styled(Row)`
		${Alignment(Alignments.End)}
		display: flex;
		justify-content: flex-end;
		width: 100%;
		gap: 0.125em;
	`
	
	// <Row css={Alignment(Alignments.VerticallyCentered)}>

	return (
		<Root>
			<Container>
				<StyledImage />
				<Text>Biography</Text>
				<ActionsContainer>
					<WindowsButton>X</WindowsButton>
					<WindowsButton>X</WindowsButton>
					<WindowsButton>X</WindowsButton>
				</ActionsContainer>
			</Container>
		</Root>
	)
}
