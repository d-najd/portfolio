import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import theme from "@/theme/theme"
import { Alignment, Alignments } from "@/ui/alignment"
import { WindowsButton } from "@/components/WindowsButton"

/**
 * Size of the top bar, this is here
 */
const topBarContentHeight = 28
const topBarBorderHeight = 3
const contentHorizontalPadding = 3
export const WindowTopBarHeight = topBarContentHeight + topBarBorderHeight

interface ContainerProps {
	curWindowId: number
	activeWindowId: number
}

export const Container = styled(Row)<ContainerProps>`
	${Alignment(Alignments.VerticallyCentered)};
	width: 100%;
	height: ${topBarContentHeight}px;
	padding: ${topBarBorderHeight}px 0px;
	background-color: ${o =>
		o.curWindowId === o.activeWindowId
			? theme.colors.windowTopBarActive
			: theme.colors.windowTopBarInactive};
`

export const StyledImage = styled.img`
	width: 24px;
	height: 24px;
	margin-left: ${contentHorizontalPadding}px;
	background-color: red;
	pointer-events: none;
	user-select: none;
`

export const Text = styled.span`
	padding-left: 4px;
	color: ${theme.colors.primaryTextInverted};
	font-weight: bolder;
	user-select: none;
`

export const ActionsContainer = styled(Row)`
	position: absolute;
	right: ${contentHorizontalPadding}px;
	gap: 2px;
`

export const TopBarButton = styled(WindowsButton)`
	${Alignment(Alignments.Centered)};
	width: 20px;
	height: 20px;
`

export const Icon = styled.img`
	width: 13px;
	height: 13px;
	pointer-events: none;
`
