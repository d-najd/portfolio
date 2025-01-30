import styled from "@emotion/styled"
import { WindowContentContainer } from "@/components/WindowContentContainer"
import { MenuBar } from "@/features/windows/send-mail/components/MenuBar"
import React from "react"
import { ActionsBar } from "@/features/windows/send-mail/components/ActionsBar"

export const SendMailWindow = React.memo(() => {
	return (
		<Container>
			<MenuBar />
			<ActionsBar />
		</Container>
	)
})

const Container = styled(WindowContentContainer)``
