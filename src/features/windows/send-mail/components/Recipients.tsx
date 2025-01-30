import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { Column } from "@/components/Column"
import recipientIcon from "@/resources/icons/send-mail/recipient.png"
import React from "react"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"

export const Recipients = () => {
	const mailText = "dimitar.najdovskiw@gmail.com"

	return (
		<Container>
			<LeftContainer>
				<LeftContainerText>To:</LeftContainerText>
				<LeftContainerText>Cc:</LeftContainerText>
				<LeftContainerText>Bcc:</LeftContainerText>
				<LeftContainerText>Subject:</LeftContainerText>
			</LeftContainer>
			<RightContainer>
				<RightSubContainer>
					<RecipientIcon src={recipientIcon} />
					<RightContainerText>{mailText}</RightContainerText>
				</RightSubContainer>
				<RightSubContainer>
					<RecipientIcon src={recipientIcon} />
					<RightContainerText>{mailText}</RightContainerText>
				</RightSubContainer>
				<RightSubContainer>
					<RecipientIcon src={recipientIcon} />
					<RightContainerText>{mailText}</RightContainerText>
				</RightSubContainer>
				<SubjectText></SubjectText>
			</RightContainer>
		</Container>
	)
}

const paddingTop = 16
const paddingBottom = 8
const rowGap = 8
const fieldHeight = 18

const Container = styled.div`
	margin-top: 4px;
	display: flex;
	width: 100%;
	border: solid black 1px;
`

const LeftContainer = styled(Column)`
	gap: ${rowGap}px;
	text-align: right;
	width: fit-content;
	padding: ${paddingTop}px 7px ${paddingBottom}px 7px;
	background-color: ${theme.colors.windowTopBarInactive};
	color: white;
`

const LeftContainerText = styled.span`
	font-weight: 1000;
	height: ${fieldHeight}px;
`

const RightContainer = styled(Column)`
	gap: ${rowGap}px;
	padding: ${paddingTop}px 4px ${paddingBottom}px 4px;
	width: 100%;
	background-color: white;
`

const RightSubContainer = styled(Row)`
	${Alignment(Alignments.VerticallyCentered)};
`

const RecipientIcon = styled.img`
	height: ${fieldHeight}px;
	width: min-content;
`

const RightContainerText = styled.u`
	width: 200px;
	height: ${fieldHeight}px;
	font-size: 0.9em;
	margin-left: 4px;
`

const SubjectText = styled.input`
	box-sizing: border-box;
	height: ${fieldHeight}px;
	outline: none;
	border: none;
	font-size: 0.9em;

	&:active {
		border: solid 1px ${theme.colors.windowTopBarInactive};
	}

	&:focus {
		border: solid 1px ${theme.colors.windowTopBarInactive};
	}
`
