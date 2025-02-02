import styled from "@emotion/styled"
import { Alignment, Alignments } from "@/ui/alignment"
import {
	WindowsButtonIdleStyle,
	WindowsButtonPressedStyle,
} from "@/components/WindowsButton"

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
