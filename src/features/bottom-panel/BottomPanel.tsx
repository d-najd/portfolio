import styled from "@emotion/styled"
import { css } from "@emotion/react"
import theme from "../../theme/theme"
import { WindowsButton } from "../../components/WindowsButton"
import { Row } from "../../components/Row"
import { Alignment, Alignments } from "../../components/common/CommonProps"
import { Column } from "../../components/Column"
import { BottomPanelWindows } from "./components/BottomPanelWindows"
import windowsIco from "../../resources/windows_95_icons/Windows/Windows logo (without text).ico"

const bottomPanelHeightTopLine = 2
const bottomPanelHeightContainer = 33
export const bottomPanelHeight =
	bottomPanelHeightContainer + bottomPanelHeightTopLine

export const BottomPanel = () => {
	const Container = styled.div`
		position: absolute;
		pointer-events: none;
		height: 100%;
	`

	const BottomBar = styled(Row)`
		background-color: ${theme.colors.primaryBackground};
		max-height: ${bottomPanelHeightContainer}px;
		min-height: ${bottomPanelHeightContainer}px;
		width: 100vw;
	`

	const BottomBarTopLine = styled.div`
		width: 100vw;
		max-height: ${bottomPanelHeightTopLine}px;
		min-height: ${bottomPanelHeightTopLine}px;
		background-color: ${theme.colors.primaryBorderDepressed};
	`

	const StartButtonStyle = css`
		margin-left: 4px;
		margin-bottom: 1px;
	`

	const WindowsImage = styled.img`
		width: 20px;
		height: 20px;
		pointer-events: none;
		user-select: none;
	`

	const WindowsImageText = styled.span`
		font-size: 16px;
		font-weight: bolder;
		padding-left: 4px;
		height: fit-content;
	`

	return (
		<>
			<Container css={Alignment(Alignments.Bottom)}>
				<Column>
					<BottomBarTopLine />
					<BottomBar css={Alignment(Alignments.CenteredStart)}>
						<WindowsButton css={StartButtonStyle}>
							<Row css={Alignment(Alignments.CenteredStart)}>
								<WindowsImage
									src={windowsIco}
									alt={"Windows 95 logo"}
								/>
								<WindowsImageText>Start</WindowsImageText>
							</Row>
						</WindowsButton>
						<BottomPanelWindows />
					</BottomBar>
				</Column>
			</Container>
		</>
	)
}
