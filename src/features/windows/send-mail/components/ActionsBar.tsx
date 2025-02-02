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
import { SendMailDivider } from "@/features/windows/send-mail/components/SendMailDivider"
import { Button } from "@/features/windows/send-mail/components/Button"
import { css } from "@emotion/react"
import * as S from "./ActionsBar.styles"

export const ActionsBar = () => {
	return (
		<S.Container>
			<S.ContainerInner>
				<Button>
					<S.Icon height={16} src={sendMailIcon} />
					<S.SendText>Send</S.SendText>
				</Button>
				<SendMailDivider />
				<Button disabled={true}>
					<S.Icon height={12} src={undoIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={20} src={cutIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={19} src={copyIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={19} src={pasteIcon} />
				</Button>
				<SendMailDivider />
				<Button>
					<S.Icon height={19} src={checkNamesIcon} />
				</Button>
				<Button>
					<S.Icon height={18} src={selectRecipientsIcon} />
				</Button>
				<SendMailDivider />
				<Button>
					<S.Icon height={20} src={insertFileIcon} />
				</Button>
				<Button disabled={true}>
					<S.Icon height={20} src={insertSignatureIcon} />
				</Button>
				<SendMailDivider />
				<Button>
					<S.Icon
						css={css`
							margin-bottom: 4px;
						`}
						height={18}
						src={digitallySignMessageIcon}
					/>
				</Button>
				<Button>
					<S.Icon
						css={css`
							margin-top: 4px;
						`}
						height={19}
						src={encryptMessageIcon}
					/>
				</Button>
			</S.ContainerInner>
		</S.Container>
	)
}
