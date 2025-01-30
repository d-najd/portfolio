import styled from "@emotion/styled"
import theme from "@/theme/theme"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"
import {
	WindowsButtonIdleStyle,
	WindowsButtonPressedStyle,
} from "@/components/WindowsButton"

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
	gap: 5px;
	border-width: 2px;
	border-color: white white ${theme.colors.borderColor} white;
	border-style: solid;
`

interface ButtonProps {
	disabled?: boolean
}

export const Button = styled.button<ButtonProps>`
	${Alignment(Alignments.VerticallyCentered)};
	background-color: transparent;
	border-color: transparent;
	pointer-events: ${o => (o.disabled === true ? "none" : "inherit")};

	&:hover {
		${WindowsButtonIdleStyle}
	}

	&:active {
		${WindowsButtonPressedStyle}
	}
`

interface IconProps {
	height: number
}

export const Icon = styled.img<IconProps>`
	padding: 2px 0;
	image-rendering: pixelated;
	height: ${o => o.height}px;
`

export const SendText = styled.span`
	font-weight: bolder;
	margin-top: 2px;
	margin-left: 4px;
`
