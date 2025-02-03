import downArrow from "@/resources/icons/send-mail/styling-menu/down-arrow.png"
import * as S from "./StylingBarDropdown.styles"

interface Props {
	text: string
	enabled?: false
}

/**
 * @remarks this dropdown is always disabled since I don't plan on using the
 * dropdown functionality
 * @remarks if you need spacing add spaces in the text
 */
export const StylingBarDropdown = ({ text, enabled = false }: Props) => {
	return (
		<S.Container>
			<S.Text>{text}</S.Text>
			<S.Icon>
				<S.IconImage src={downArrow} />
			</S.Icon>
		</S.Container>
	)
}
