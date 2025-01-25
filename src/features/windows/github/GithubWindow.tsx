import styled from "@emotion/styled"
import React from "react"
import { WindowContentContainer } from "@/components/WindowContentContainer"
import useExternalHtml from "@/hooks/useExternalHtml"

export const GithubWindow = React.memo(() => {
	const githubHtml = useExternalHtml(new URL("https://github.com/d-najd"))

	return (
		<Container>
			<Content srcDoc={githubHtml} />
		</Container>
	)
})

const Container = styled(WindowContentContainer)``

const Content = styled.iframe`
	width: 100%;
	height: 100%;
`
