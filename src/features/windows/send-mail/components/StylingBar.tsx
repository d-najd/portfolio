import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import { StylingBarDropdown } from "@/features/windows/send-mail/components/StylingBarDropdown"
import React from "react"
import styleTagIcon from "@/resources/icons/send-mail/styling-menu/style-tag.png"
import boldIcon from "@/resources/icons/send-mail/styling-menu/bold.png"
import italicIcon from "@/resources/icons/send-mail/styling-menu/italic.png"
import underscoreIcon from "@/resources/icons/send-mail/styling-menu/underscore.png"
import fontColorIcon from "@/resources/icons/send-mail/styling-menu/font-color.png"
import formattingNumbersIcon from "@/resources/icons/send-mail/styling-menu/formatting-numbers.png"
import formattingBulletsIcon from "@/resources/icons/send-mail/styling-menu/formatting-bullets.png"
import decreaseIndentationIcon from "@/resources/icons/send-mail/styling-menu/decrease-indentation.png"
import increaseIndentationIcon from "@/resources/icons/send-mail/styling-menu/increase-indentation.png"
import alignLeftIcon from "@/resources/icons/send-mail/styling-menu/align-left.png"
import alignCenterIcon from "@/resources/icons/send-mail/styling-menu/align-center.png"
import alignRightIcon from "@/resources/icons/send-mail/styling-menu/align-right.png"
import insertHorizontalLineIcon from "@/resources/icons/send-mail/styling-menu/insert-horizontal-line.png"
import insertHyperlinkIcon from "@/resources/icons/send-mail/styling-menu/insert-hyperlink.png"
import insertPictureIcon from "@/resources/icons/send-mail/styling-menu/insert-picture.png"
import { SendMailDivider } from "@/features/windows/send-mail/components/SendMailDivider"

export const StylingBar = () => {
	return (
		<Container>
			<StylingBarDropdown
				text={"Arial                                 "}
			></StylingBarDropdown>
			<StylingBarDropdown text={"10   "}></StylingBarDropdown>
			<Icon src={styleTagIcon}></Icon>
			<SendMailDivider />
			<Icon src={boldIcon}></Icon>
			<Icon src={italicIcon}></Icon>
			<Icon src={underscoreIcon}></Icon>
			<Icon src={fontColorIcon}></Icon>
			<SendMailDivider />
			<Icon src={formattingNumbersIcon}></Icon>
			<Icon src={formattingBulletsIcon}></Icon>
			<Icon src={decreaseIndentationIcon}></Icon>
			<Icon src={increaseIndentationIcon}></Icon>
			<SendMailDivider />
			<Icon src={alignLeftIcon}></Icon>
			<Icon src={alignCenterIcon}></Icon>
			<Icon src={alignRightIcon}></Icon>
			<SendMailDivider />
			<Icon src={insertHorizontalLineIcon}></Icon>
			<Icon src={insertHyperlinkIcon}></Icon>
			<Icon src={insertPictureIcon}></Icon>
		</Container>
	)
}

const Container = styled(Row)`
	min-height: 24px;
	padding-left: 12px;
	margin-top: 8px;
	gap: 15px;
	overflow: hidden;
`

const Icon = styled.img`
	height: 100%;
`
