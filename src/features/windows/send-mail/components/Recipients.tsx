import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { Column } from "@/components/Column"

export const Recipients = () => {
	return (
		<Container>
			<LeftContainer>
				<LeftContainerText>To:</LeftContainerText>
				<LeftContainerText>Cc:</LeftContainerText>
				<LeftContainerText>Bcc:</LeftContainerText>
				<LeftContainerText>Subject:</LeftContainerText>
			</LeftContainer>
			<RightContainer></RightContainer>
		</Container>
	)
}

const paddingVertical = 12

const Container = styled.div`
	display: flex;
	width: 100%;
	border: solid black 1px;
`

const LeftContainer = styled(Column)`
	gap: 8px;
	text-align: right;
	width: fit-content;
	padding: ${paddingVertical}px 6px;
	background-color: ${theme.colors.windowTopBarInactive};
	color: white;
	font-weight: bolder;
`

const LeftContainerText = styled.span``

const RightContainer = styled.div`
	padding: ${paddingVertical}px 0;
	width: 100%;
`
