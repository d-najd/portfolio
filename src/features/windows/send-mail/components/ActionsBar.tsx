import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import theme from "@/theme/theme"
import {
	WindowsButtonIdleStyle,
	WindowsButtonPressedStyle,
} from "@/components/WindowsButton"
import sendMailIcon from "@/resources/windows_95_icons/Mail & Letters/White letter.ico"
import { Alignment, Alignments } from "@/ui/alignment"
import { SendMailDivider } from "@/features/windows/send-mail/components/SendMailDivider"

export const ActionsBar = () => {
	return (
		<Container>
			<ContainerInner>
				<Button>
					<Icon src={sendMailIcon} />
					<SendText>Send</SendText>
				</Button>
				<SendMailDivider />
				<Button>
					<Icon src={sendMailIcon} />
					<SendText>Send</SendText>
				</Button>
			</ContainerInner>
		</Container>
	)
}

const ContainerInner = styled(Row)`
	width: 100%;
	height: 100%;
	border: white 2px;
	border-style: solid solid none solid;
`

const Container = styled.div`
	width: 100%;
	border: ${theme.colors.borderColor} 2px;
	border-style: solid solid none solid;
`

const Button = styled.button`
	${Alignment(Alignments.VerticallyCentered)}
	background-color: transparent;
	border-color: transparent;

	&:hover {
		${WindowsButtonIdleStyle}
	}

	&:active {
		${WindowsButtonPressedStyle}
	}
`

const Icon = styled.img`
	height: 18px;
`

const SendText = styled.span`
	font-weight: bolder;
	margin-left: 4px;
`
