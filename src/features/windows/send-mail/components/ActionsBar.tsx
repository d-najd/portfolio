import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import theme from "@/theme/theme"
import {
	WindowsButtonIdleStyle,
	WindowsButtonPressedStyle,
} from "@/components/WindowsButton"
import sendMailIcon from "@/resources/icons/send-mail/send-mail.png"
import undoIcon from "@/resources/icons/send-mail/undo.png"
import cutIcon from "@/resources/icons/send-mail/cut.png"
import copyIcon from "@/resources/icons/send-mail/copy.png"
import pasteIcon from "@/resources/icons/send-mail/paste.png"
import { Alignment, Alignments } from "@/ui/alignment"
import { SendMailDivider } from "@/features/windows/send-mail/components/SendMailDivider"

export const ActionsBar = () => {
	return (
		<Container>
			<ContainerInner>
				<Button>
					<Icon height={16} src={sendMailIcon} />
					<SendText>Send</SendText>
				</Button>
				<SendMailDivider />
				<Button disabled={true}>
					<Icon height={12} src={undoIcon} />
				</Button>
				<Button disabled={true}>
					<Icon height={20} src={cutIcon} />
				</Button>
				<Button disabled={true}>
					<Icon height={20} src={copyIcon} />
				</Button>
				<Button disabled={true}>
					<Icon height={20} src={pasteIcon} />
				</Button>
				<SendMailDivider />
			</ContainerInner>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	border-width: 2px;
	border-color: ${theme.colors.borderColor} ${theme.colors.borderColor} white
		${theme.colors.borderColor};
	border-style: solid;
`
const ContainerInner = styled(Row)`
	width: 100%;
	height: 100%;
	gap: 4px;
	border-width: 2px;
	border-color: white white ${theme.colors.borderColor} white;
	border-style: solid;
`

const Button = styled.button`
	${Alignment(Alignments.VerticallyCentered)};
	background-color: transparent;
	border-color: transparent;

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

const Icon = styled.img<IconProps>`
	padding: 2px 0;
	image-rendering: pixelated;
	height: ${o => o.height}px;
`

const SendText = styled.span`
	font-weight: bolder;
	margin-top: 2px;
	margin-left: 4px;
`
