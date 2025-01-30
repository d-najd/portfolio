import styled from "@emotion/styled"
import theme from "@/theme/theme"

export const SendMailDivider = () => {
	return (
		<>
			<Left />
			<Right />
		</>
	)
}

const Left = styled.div`
	height: 100%;
	margin-top: 1px;
	border-right: solid ${theme.colors.borderColor} 2px;

	&:before {
		content: "\\200B"; // zero width char
	}
`
const Right = styled.div`
	height: 100%;
	margin-top: 1px;
	border-right: solid white 2px;

	&:before {
		content: "\\200B"; // zero width char
	}
`
