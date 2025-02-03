import styled from "@emotion/styled"
import theme from "@/theme/theme"
import type React from "react"

interface Props {
	body: string
	setBody: React.Dispatch<string>
}

export const MailContent = ({ body, setBody }: Props) => {
	return (
		<Content
			value={body}
			onChange={o => {
				setBody(o.target.value)
			}}
		/>
	)
}

const Content = styled.textarea`
	padding: 8px;
	box-sizing: border-box;
	width: 100%;
	flex-grow: 1;
	margin-top: 8px;
	margin-bottom: 26px;
	background-color: white;
	border-style: inset;
	border-width: 2px;
	border-left-color: ${theme.colors.disabled};
	border-top-color: ${theme.colors.disabled};
	border-bottom-color: ${theme.colors.primaryBorderDepressed};
	border-right-color: ${theme.colors.primaryBorderDepressed};
	resize: none;
`
