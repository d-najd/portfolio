import styled from "@emotion/styled"
import { Alignment, Alignments } from "@/ui/alignment"
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

const Container = styled(WindowContentContainer)`
	${Alignment(Alignments.HorizontallyCentered)};
	display: flex;
	// padding-bottom: 17px;
	box-sizing: border-box;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: flex-start;
	gap: 17px;
`

const Content = styled.iframe`
	width: 100%;
	height: 100%;
`
