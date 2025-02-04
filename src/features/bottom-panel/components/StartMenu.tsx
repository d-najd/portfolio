import styled from "@emotion/styled"
import { bottomPanelHeight } from "@/features/bottom-panel/BottomPanel.styles"
import theme from "@/theme/theme"
import windowsLogo from "@/resources/images/bottom-bar-start-windows-logo.png"
import { Row } from "@/components/Row"
import { Column } from "@/components/Column"
import { Alignment, Alignments } from "@/ui/alignment"
import {
	desktopEntryFactory,
	DesktopEntryType,
} from "@/features/shared/desktopEntry"

export const StartMenu = () => {
	const myItems = [
		{ type: DesktopEntryType.Projects },
		{ type: DesktopEntryType.Resume },
		{ type: DesktopEntryType.SendMail },
		{ type: DesktopEntryType.Github },
		{ type: DesktopEntryType.LinkedIn },
	]

	return (
		<Container>
			<LeftContainer>
				<LeftWindowsLogo src={windowsLogo} />
			</LeftContainer>
			<RightContainer>
				{myItems.map(item => (
					<RightItemContainer key={item.type}>
						<RightItemIcon
							src={desktopEntryFactory(item.type).icon}
						/>
						<RightItemText>{item.type}</RightItemText>
					</RightItemContainer>
				))}
			</RightContainer>
		</Container>
	)
}

const Container = styled(Row)`
	position: absolute;
	width: 170px;
	height: 255px;
	bottom: 0;
	margin-bottom: ${bottomPanelHeight}px;
	margin-left: 2px;
	box-sizing: border-box;
	background-color: ${theme.colors.primaryBackground};
	border-style: outset;
	border-width: 2px;
	border-left-color: ${theme.colors.primaryBorderDepressed};
	border-top-color: ${theme.colors.primaryBorderDepressed};
	border-right-color: ${theme.colors.primaryBorderElevated};
	border-bottom-color: ${theme.colors.primaryBorderElevated};
`

const leftContainerWidth = 24

const LeftContainer = styled.div`
	align-content: end;
	min-width: ${leftContainerWidth}px;
	height: 100%;
	background-color: ${theme.colors.disabled};
`

const windowsLogoWidth = 16

const LeftWindowsLogo = styled.img`
	margin-left: ${(leftContainerWidth - windowsLogoWidth) / 2}px;
	margin-bottom: 2px;
	width: ${windowsLogoWidth}px;
`

const rightContentPadding = 10

const RightContainer = styled(Column)`
	justify-content: end;
	margin-bottom: ${rightContentPadding}px;
	gap: 18px;
	width: 100%;
	box-sizing: border-box;
`

const RightItemContainer = styled(Row)`
	${Alignment(Alignments.VerticallyCentered)};
	margin-left: ${rightContentPadding}px;
	width: calc(100% - ${rightContentPadding * 2}px);
`

const rightIconSize = 30

const RightItemIcon = styled.img`
	width: ${rightIconSize}px;
	height: ${rightIconSize}px;
`

const rightTextMargin = 4

const RightItemText = styled.span`
	width: calc(
		100% - ${rightIconSize + rightContentPadding * 2 + rightTextMargin}px
	);
	margin-left: ${rightTextMargin}px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`
