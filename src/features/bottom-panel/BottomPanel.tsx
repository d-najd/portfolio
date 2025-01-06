import styled from "@emotion/styled"
import { css } from "@emotion/react"
import theme from "../../theme/theme"
import { WindowsButton } from "../../components/WindowsButton"
import { Row } from "../../components/Row"
import { Alignment, Alignments } from "../../components/common/CommonProps"
import { Column } from "../../components/Column"
import { BottomPanelWindows } from "./components/BottomPanelWindows"

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

	// height: ${temp}px;
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

	const WindowsImage = styled.image` 
		width: 20px;
		height: 20px;
	`

	const windowsImageStyle = css`
		rotate: -22.5deg;
		width: 20px;
		height: 20px;
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
								<WindowsImage>
									<img
										css={windowsImageStyle}
										src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Logo_%281992-2001%29.svg"
										alt={"Windows 95 logo"}
									/>
								</WindowsImage>
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
