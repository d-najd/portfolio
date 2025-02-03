import styled from "@emotion/styled"
import theme from "@/theme/theme"

export const MailContent = () => {
	return (
		<Container>
			<TextContentContainer />
		</Container>
	)
}

const Container = styled.div`
	flex-grow: 1;
	width: 100%;
	background-color: white;
	margin-bottom: 12px;
	// margin-right: 12px;
	// padding-right: 12px;
	//width: 100%;
	//height: 100%;
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
