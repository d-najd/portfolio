import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { Column } from "@/components/Column"

export const MailContent = () => {
	return (
		<Container>
			<TextContentContainer />
		</Container>
	)
}

const Container = styled(Column)`
	position: relative;
	margin-right: 12px;
	padding-right: 12px;
	width: 100%;
	height: 100%;
`
const TextContentContainer = styled.span`
	width: 100%;
	height: 100%;
	background: white;
	border-style: inset;
	border-width: 2px;
	border-left-color: ${theme.colors.disabled};
	border-top-color: ${theme.colors.disabled};
	border-bottom-color: ${theme.colors.primaryBorderDepressed};
	border-right-color: ${theme.colors.primaryBorderDepressed};
`

const BottomDivider = styled.div`
	min-height: 120px;
	background-color: red;
`
