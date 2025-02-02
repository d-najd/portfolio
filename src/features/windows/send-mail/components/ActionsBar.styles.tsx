import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { Row } from "@/components/Row"

export const Container = styled.div`
	width: 100%;
	border-width: 2px;
	border-color: ${theme.colors.borderColor} ${theme.colors.borderColor} white
		${theme.colors.borderColor};
	border-style: solid;
`
export const ContainerInner = styled(Row)`
	width: 100%;
	height: 100%;
	gap: 6px;
	border-width: 2px;
	border-color: white white ${theme.colors.borderColor} white;
	border-style: solid;
`

interface IconProps {
	height: number
}

export const Icon = styled.img<IconProps>`
	height: ${o => o.height}px;
	padding: 2px 0;
	image-rendering: pixelated;
`

export const SendText = styled.span`
	font-size: 1.25em;
	margin-top: 2px;
	margin-left: 6px;
`
