import styled from "@emotion/styled"
import theme from "@/theme/theme"

export const SendMailDivider = () => {
	return (
		<Container>
			<Left />
			<Right />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	min-height: 100%;
`

const Left = styled.div`
	display: flex;
	height: 100%;
	border-right: solid ${theme.colors.borderColor} 2px;
`
const Right = styled.div`
	display: flex;
	height: 100%;
	border-right: solid white 2px;
`
