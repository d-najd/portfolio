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
import { css } from "@emotion/react"
import * as S from "./ActionsBar.styles"

export const ActionsBar = () => {
	return (
		<S.Container>
			<S.ContainerInner>
				<S.Button>
					<S.Icon height={20} src={sendMailIcon} />
					<S.SendText>Send</S.SendText>
				</S.Button>
				<SendMailDivider />
				<S.Button disabled={true}>
					<S.Icon height={15} src={undoIcon} />
				</S.Button>
				<S.Button disabled={true}>
					<S.Icon height={25} src={cutIcon} />
				</S.Button>
				<S.Button disabled={true}>
					<S.Icon height={24} src={copyIcon} />
				</S.Button>
				<S.Button disabled={true}>
					<S.Icon height={24} src={pasteIcon} />
				</S.Button>
				<SendMailDivider />
				<S.Button>
					<S.Icon height={24} src={checkNamesIcon} />
				</S.Button>
				<S.Button>
					<S.Icon height={23} src={selectRecipientsIcon} />
				</S.Button>
				<SendMailDivider />
				<S.Button>
					<S.Icon height={25} src={insertFileIcon} />
				</S.Button>
				<S.Button disabled={true}>
					<S.Icon height={25} src={insertSignatureIcon} />
				</S.Button>
				<SendMailDivider />
				<S.Button>
					<S.Icon
						css={css`
							margin-bottom: 4px;
						`}
						height={21}
						src={digitallySignMessageIcon}
					/>
				</S.Button>
				<S.Button>
					<S.Icon
						css={css`
							margin-top: 4px;
						`}
						height={21}
						src={encryptMessageIcon}
					/>
				</S.Button>
			</S.ContainerInner>
		</S.Container>
	)
}
