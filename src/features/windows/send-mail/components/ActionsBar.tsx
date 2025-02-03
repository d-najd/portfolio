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
import { css } from "@emotion/react"
import * as S from "./ActionsBar.styles"
import { Button } from "@/features/windows/send-mail/components/Button"

interface Props {
	onSendClicked: () => void
}

export const ActionsBar = ({ onSendClicked }: Props) => {
	return (
		<S.Container>
			<S.ContainerInner>
				<Button onClick={onSendClicked}>
					<S.Icon height={18} src={sendMailIcon} />
					<S.SendText>Send</S.SendText>
				</Button>
				<S.Divider />
				<Button disabled={true}>
					<S.Icon height={13} src={undoIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={22} src={cutIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={22} src={copyIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={22} src={pasteIcon} />
				</Button>
				<S.Divider />
				<Button>
					<S.Icon height={22} src={checkNamesIcon} />
				</Button>
				<Button>
					<S.Icon height={20} src={selectRecipientsIcon} />
				</Button>
				<S.Divider />
				<Button>
					<S.Icon height={22} src={insertFileIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={22} src={insertSignatureIcon} />
				</Button>
				<S.Divider />
				<Button>
					<S.Icon
						css={css`
							margin-bottom: 5px;
						`}
						height={19}
						src={digitallySignMessageIcon}
					/>
				</Button>
				<Button>
					<S.Icon
						css={css`
							margin-top: 5px;
						`}
						height={19}
						src={encryptMessageIcon}
					/>
				</Button>
			</S.ContainerInner>
		</S.Container>
	)
}
