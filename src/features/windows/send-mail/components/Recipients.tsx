import recipientIcon from "@/resources/icons/send-mail/recipient.png"
import edgeIcon from "@/resources/icons/send-mail/edge-1.png"
import * as S from "./Recipients.styles"
import { mailRecipient } from "@/features/windows/send-mail/SendMailWindow"
import type React from "react"

interface Props {
	subject: string
	setSubject: React.Dispatch<string>
}

export const Recipients = ({ subject, setSubject }: Props) => {
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
					<S.MiddleContainerText>
						{mailRecipient}
					</S.MiddleContainerText>
				</S.MiddleSubContainer>
				<S.MiddleSubContainer>
					<S.RecipientIcon src={recipientIcon} />
					<S.MiddleContainerText>
						{mailRecipient}
					</S.MiddleContainerText>
				</S.MiddleSubContainer>
				<S.MiddleSubContainer>
					<S.RecipientIcon src={recipientIcon} />
					<S.MiddleContainerText>
						{mailRecipient}
					</S.MiddleContainerText>
				</S.MiddleSubContainer>
				<S.SubjectText
					placeholder={"< click here to enter the subject >"}
					value={subject}
					onChange={o => {
						setSubject(o.target.value)
					}}
				></S.SubjectText>
			</S.MiddleContainer>
			<S.RightContainer>
				<S.EdgeIcon src={edgeIcon}></S.EdgeIcon>
			</S.RightContainer>
		</S.Container>
	)
}
