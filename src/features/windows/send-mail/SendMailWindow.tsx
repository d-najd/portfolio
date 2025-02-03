import styled from "@emotion/styled"
import { MenuBar } from "@/features/windows/send-mail/components/MenuBar"
import React, { useCallback, useState } from "react"
import { ActionsBar } from "@/features/windows/send-mail/components/ActionsBar"
import { Recipients } from "@/features/windows/send-mail/components/Recipients"
import { StylingBar } from "@/features/windows/send-mail/components/StylingBar"
import { MailContent } from "@/features/windows/send-mail/components/MailContent"
import { WindowContentContainer } from "@/components/WindowContentContainer"
import { mailto } from "@/utils/mailTo"

export const mailRecipient = "dimitar.najdovskiw@gmail.com"

export const SendMailWindow = React.memo(() => {
	const [subject, setSubject] = useState("")
	const [body, setBody] = useState("")

	const onSendClicked = useCallback(() => {
		mailto(mailRecipient, subject, body)
	}, [body, subject])

	return (
		<Container>
			<MenuBar />
			<ActionsBar onSendClicked={onSendClicked} />
			<Recipients subject={subject} setSubject={setSubject} />
			<StylingBar />
			<MailContent body={body} setBody={setBody} />
		</Container>
	)
})

const horizontalMargin = 6

const Container = styled(WindowContentContainer)`
	width: calc(100% - ${horizontalMargin * 2}px);
	margin-left: ${horizontalMargin}px;
	flex-direction: column;
`
