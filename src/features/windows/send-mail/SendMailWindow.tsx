import styled from "@emotion/styled"
import { WindowContentContainer } from "@/components/WindowContentContainer"
import { MenuBar } from "@/features/windows/send-mail/components/MenuBar"
import React from "react"

export const SendMailWindow = React.memo(() => {
	return (
		<Container>
			<MenuBar />
		</Container>
	)
})

const Container = styled(WindowContentContainer)``
