import styled from "@emotion/styled"
import { WindowsButton } from "@/components/WindowsButton"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"
import downArrow from "@/resources/icons/send-mail/styling-menu/down-arrow.png"
import theme from "@/theme/theme"

interface Props {
	text: string
	enabled?: false
}

/**
 * @remarks this dropdown is always disabled since I don't plan on using the
 * dropdown functionality
 * @remarks if you need spacing add spaces in the text
 */
export const StylingBarDropdown = ({ text, enabled = false }: Props) => {
	return (
		<Container>
			<Text>{text}</Text>
			<Icon>
				<IconImage src={downArrow} />
			</Icon>
		</Container>
	)
}

const Container = styled(Row)`
	${Alignment(Alignments.CenteredStart)};
	height: 100%;
	border-style: inset;
	border-width: 2px;
	border-left-color: ${theme.colors.disabled};
	border-top-color: ${theme.colors.disabled};
	border-bottom-color: ${theme.colors.primaryBorderDepressed};
	border-right-color: ${theme.colors.primaryBorderDepressed};
`

const Text = styled.span`
	margin-left: 3px;
	color: ${theme.colors.disabled};
	white-space: pre;
`

const Icon = styled(WindowsButton)`
	${Alignment(Alignments.Centered)};
	height: 100%;
	padding: 0 2px;
	pointer-events: none;
	user-select: none;
`

const IconImage = styled.img`
	height: 8px;
	pointer-events: none;
`
