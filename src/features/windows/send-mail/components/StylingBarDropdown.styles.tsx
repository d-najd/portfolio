import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"
import theme from "@/theme/theme"
import { WindowsButton } from "@/components/WindowsButton"

export const Container = styled(Row)`
	${Alignment(Alignments.CenteredStart)};
	height: 100%;
	border-style: inset;
	border-width: 2px;
	box-sizing: border-box;
	border-left-color: ${theme.colors.disabled};
	border-top-color: ${theme.colors.disabled};
	border-bottom-color: ${theme.colors.primaryBorderDepressed};
	border-right-color: ${theme.colors.primaryBorderDepressed};
	user-select: none;
	pointer-events: none;
`

export const Text = styled.span`
	margin-left: 3px;
	color: ${theme.colors.disabled};
	white-space: pre;
`

export const Icon = styled(WindowsButton)`
	${Alignment(Alignments.Centered)};
	height: 100%;
	padding: 0 2px;
	pointer-events: none;
	user-select: none;
`

export const IconImage = styled.img`
	height: 8px;
`
