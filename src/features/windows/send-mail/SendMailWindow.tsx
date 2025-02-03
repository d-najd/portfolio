import styled from "@emotion/styled"
import { MenuBar } from "@/features/windows/send-mail/components/MenuBar"
import React from "react"
import { ActionsBar } from "@/features/windows/send-mail/components/ActionsBar"
import { Recipients } from "@/features/windows/send-mail/components/Recipients"
import { StylingBar } from "@/features/windows/send-mail/components/StylingBar"
import { MailContent } from "@/features/windows/send-mail/components/MailContent"
import { WindowContentContainer } from "@/components/WindowContentContainer"

export const SendMailWindow = React.memo(() => {
	return (
		<Container>
			<MenuBar />
			<ActionsBar />
			<Recipients />
			<StylingBar />
			<MailContent />
		</Container>
	)
})

const Container = styled(WindowContentContainer)`
	flex-direction: column;
`
