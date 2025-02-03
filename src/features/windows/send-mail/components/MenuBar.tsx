import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import theme from "@/theme/theme"

interface MenuBarItemData {
	text: string
	underlinedIndex: number
}

export const MenuBar = () => {
	const data: MenuBarItemData[] = [
		{ text: "File", underlinedIndex: 0 },
		{ text: "Edit", underlinedIndex: 0 },
		{ text: "View", underlinedIndex: 0 },
		{ text: "Insert", underlinedIndex: 0 },
		{ text: "Format", underlinedIndex: 1 },
		{ text: "Tools", underlinedIndex: 0 },
		{ text: "Compose", underlinedIndex: 0 },
		{ text: "Help", underlinedIndex: 0 },
	]

	return (
		<Container>
			{data.map((e, i) => {
				return (
					<Item key={i}>
						{e.text.slice(0, e.underlinedIndex)}
						<u>{e.text.charAt(e.underlinedIndex)}</u>
						{e.text.slice(e.underlinedIndex + 1)}
					</Item>
				)
			})}
		</Container>
	)
}

const Container = styled(Row)`
	width: 100%;
	padding: 1px 0;
	flex-direction: row;
	flex-wrap: wrap;
`

const Item = styled.button`
	padding: 2px 7px;
	background-color: transparent;
	border-color: transparent;
	pointer-events: all;
	font-size: 0.925em;

	&:active {
		background-color: ${theme.colors.windowTopBarActive};
		color: white;
	}
`