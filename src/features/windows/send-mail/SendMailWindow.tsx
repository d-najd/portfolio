import styled from "@emotion/styled"
import { WindowContentContainer } from "@/components/WindowContentContainer"
import { MenuBar } from "@/features/windows/send-mail/components/MenuBar"
import React from "react"
import { ActionsBar } from "@/features/windows/send-mail/components/ActionsBar"
import { Recipients } from "@/features/windows/send-mail/components/Recipients"
import { StylingBar } from "@/features/windows/send-mail/components/StylingBar"

export const SendMailWindow = React.memo(() => {
	return (
		<Container>
			<MenuBar />
			<ActionsBar />
			<Recipients />
			<StylingBar />
		</Container>
	)
})

const Container = styled(WindowContentContainer)``
