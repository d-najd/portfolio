import recipientIcon from "@/resources/icons/send-mail/recipient.png"
import edgeIcon from "@/resources/icons/send-mail/edge-1.png"
import * as S from "./Recipients.styles"

export const Recipients = () => {
	const mailText = "dimitar.najdovskiw@gmail.com"

	return (
		<S.Container>
			<S.LeftContainer>
				<S.LeftContainerText>To:</S.LeftContainerText>
				<S.LeftContainerText>Cc:</S.LeftContainerText>
				<S.LeftContainerText>Bcc:</S.LeftContainerText>
				<S.LeftContainerText>Subject:</S.LeftContainerText>
			</S.LeftContainer>
			<S.MiddleContainer>
				<S.MiddleSubContainer>
					<S.RecipientIcon src={recipientIcon} />
					<S.MiddleContainerText>{mailText}</S.MiddleContainerText>
				</S.MiddleSubContainer>
				<S.MiddleSubContainer>
					<S.RecipientIcon src={recipientIcon} />
					<S.MiddleContainerText>{mailText}</S.MiddleContainerText>
				</S.MiddleSubContainer>
				<S.MiddleSubContainer>
					<S.RecipientIcon src={recipientIcon} />
					<S.MiddleContainerText>{mailText}</S.MiddleContainerText>
				</S.MiddleSubContainer>
				<S.SubjectText></S.SubjectText>
			</S.MiddleContainer>
			<S.RightContainer>
				<S.EdgeIcon src={edgeIcon}></S.EdgeIcon>
			</S.RightContainer>
		</S.Container>
	)
}
