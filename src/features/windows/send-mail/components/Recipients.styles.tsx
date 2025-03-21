import styled from "@emotion/styled"
import { Column } from "@/components/Column"
import theme from "@/theme/theme"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"

const paddingTop = 20
const paddingBottom = 8
const rowGap = 8
const fieldHeight = 18

export const Container = styled.div`
	width: 100%;
	margin-top: 6px;
	display: flex;
	box-sizing: border-box;
	border: solid black 2px;
`

export const LeftContainer = styled(Column)`
	padding: ${paddingTop}px 7px ${paddingBottom}px 7px;
	gap: ${rowGap}px;
	text-align: right;
	background-color: ${theme.colors.disabled};
	color: white;
	pointer-events: none;
	user-select: none;
`

export const LeftContainerText = styled.span`
	height: ${fieldHeight}px;
	font-weight: 1000;
`

export const MiddleContainer = styled(Column)`
	width: 100%;
	padding: ${paddingTop}px 4px ${paddingBottom}px 4px;
	gap: ${rowGap}px;
	overflow: hidden;
	background-color: white;
`

export const MiddleSubContainer = styled(Row)`
	${Alignment(Alignments.VerticallyCentered)};
`

export const RecipientIcon = styled.img`
	width: min-content;
	height: ${fieldHeight}px;
	user-select: none;
	pointer-events: none;
`

export const MiddleContainerText = styled.u`
	width: 200px;
	height: ${fieldHeight}px;
	margin-left: 4px;
	font-size: 0.9em;
`

export const SubjectText = styled.input`
	height: ${fieldHeight}px;
	box-sizing: border-box;
	outline: none;
	border: none;
	font-size: 0.9em;

	&:focus::placeholder {
		color: transparent;
	}

	&:active {
		border-bottom: 1px outset ${theme.colors.primaryBorderDepressed};
		border-right: 1px outset ${theme.colors.primaryBorderDepressed};
		border-top: 2px inset ${theme.colors.primaryBorderDepressed};
		border-left: 2px inset ${theme.colors.primaryBorderDepressed};
	}

	&:focus {
		border-bottom: 1px outset ${theme.colors.primaryBorderDepressed};
		border-right: 1px outset ${theme.colors.primaryBorderDepressed};
		border-top: 2px inset ${theme.colors.primaryBorderDepressed};
		border-left: 2px inset ${theme.colors.primaryBorderDepressed};
	}
`

export const RightContainer = styled.div`
	${Alignment(Alignments.TopEnd)}
	width: 50px;
	padding: 8px;
	box-sizing: border-box;
	background-color: white;
`

export const EdgeIcon = styled.img`
	height: 26px;
	image-rendering: pixelated;
	user-select: none;
	pointer-events: none;
`
