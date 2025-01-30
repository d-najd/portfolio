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
import checkNamesIcon from "@/resources/icons/send-mail/check-names.png"
import selectRecipientsIcon from "@/resources/icons/send-mail/select-recipients.png"
import insertFileIcon from "@/resources/icons/send-mail/insert-file.png"
import insertSignatureIcon from "@/resources/icons/send-mail/insert-signature.png"
import digitallySignMessageIcon from "@/resources/icons/send-mail/digitally-sign-message.png"
import encryptMessageIcon from "@/resources/icons/send-mail/encrypt-message.png"
import { Alignment, Alignments } from "@/ui/alignment"
import { SendMailDivider } from "@/features/windows/send-mail/components/SendMailDivider"
import { css } from "@emotion/react"

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
					<Icon height={19} src={copyIcon} />
				</Button>
				<Button disabled={true}>
					<Icon height={19} src={pasteIcon} />
				</Button>
				<SendMailDivider />
				<Button>
					<Icon height={19} src={checkNamesIcon} />
				</Button>
				<Button>
					<Icon height={18} src={selectRecipientsIcon} />
				</Button>
				<SendMailDivider />
				<Button>
					<Icon height={20} src={insertFileIcon} />
				</Button>
				<Button disabled={true}>
					<Icon height={20} src={insertSignatureIcon} />
				</Button>
				<SendMailDivider />
				<Button>
					<Icon
						css={css`
							margin-bottom: 3px;
						`}
						height={17}
						src={digitallySignMessageIcon}
					/>
				</Button>
				<Button>
					<Icon
						css={css`
							padding-top: 3px;
						`}
						height={17}
						src={encryptMessageIcon}
					/>
				</Button>
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
	gap: 5px;
	border-width: 2px;
	border-color: white white ${theme.colors.borderColor} white;
	border-style: solid;
`

interface ButtonProps {
	disabled?: boolean
}

const Button = styled.button<ButtonProps>`
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
