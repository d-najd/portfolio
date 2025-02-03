import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { Row } from "@/components/Row"

export const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	border-width: 2px;
	border-color: ${theme.colors.borderColor} white white
		${theme.colors.borderColor};
	border-style: solid;
	overflow: hidden;
`
export const ContainerInner = styled(Row)`
	width: 100%;
	height: 100%;
	gap: 6px;
	box-sizing: border-box;
	border-width: 2px;
	border-color: white ${theme.colors.borderColor} ${theme.colors.borderColor}
		white;
	border-style: solid;
	overflow: hidden;
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
	margin-top: 2px;
	margin-left: 6px;
	font-size: 1.25em;
`
