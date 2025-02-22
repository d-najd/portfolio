import styled from "@emotion/styled"
import { Column } from "@/components/Column"
import { Row } from "@/components/Row"
import theme from "@/theme/theme"
import { WindowsButton } from "@/components/WindowsButton"
import { Alignment, Alignments } from "@/ui/alignment"
import { ContentSeparator } from "@/components/ContentSeparator"

const bottomPanelHeightTopLine = 2
const bottomPanelHeightContainer = 33
export const bottomPanelHeight =
	bottomPanelHeightContainer + bottomPanelHeightTopLine

export const Container = styled(Column)`
	position: absolute;
	bottom: 0;
	pointer-events: none; // for now pressing the bottom bar is ok
`

export const BottomBar = styled(Row)`
	${Alignment(Alignments.CenteredStart)};
	width: 100vw;
	height: ${bottomPanelHeightContainer}px;
	background-color: ${theme.colors.primaryBackground};
`

export const Separator = styled(ContentSeparator)`
	height: 21px;
	margin-left: 4px;
`

export const BottomBarTopLine = styled.div`
	width: 100vw;
	height: ${bottomPanelHeightTopLine}px;
	background-color: ${theme.colors.primaryBorderDepressed};
`

export const StartButton = styled(WindowsButton)`
	margin-left: 4px;
`

export const WindowsImage = styled.img`
	width: 20px;
	height: 20px;
	pointer-events: none;
	user-select: none;
`

export const WindowsImageText = styled.span`
	padding-left: 4px;
	font-size: 16px;
	font-weight: bolder;
`
