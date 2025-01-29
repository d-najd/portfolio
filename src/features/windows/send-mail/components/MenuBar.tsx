import { useRef } from "react"
import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import { ContentSeparator } from "@/components/ContentSeparator"
import { useFullyVisibleChildrenCount } from "@/hooks/useFullyVisibleChildrenCount"
import theme from "@/theme/theme"

interface MenuBarItemData {
	text: string
	underlinedIndex: number
}

export const MenuBar = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const visibleChildren = useFullyVisibleChildrenCount(containerRef)

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
		<Container ref={containerRef}>
			<Separator
				height={containerRef.current?.children[1].clientHeight}
			/>
			{data.map((e, i) => {
				return (
					<Item key={i} visible={i < visibleChildren}>
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
	border: inset gray 2px;
	padding: 1px 4px;
	width: 100%;
	overflow: hidden;
`

interface PropsTest {
	visible: boolean
}

const Item = styled.button<PropsTest>`
	padding: 8px 4px;
	background-color: transparent;
	border-color: transparent;
	font-size: 1.1em;
	visibility: ${o => (o.visible === true ? "visible" : "hidden")};
	pointer-events: all;

	&:active {
		background-color: ${theme.colors.windowTopBarActive};
		color: white;
	}
`

const Separator = styled(ContentSeparator)<{ height?: number }>`
	margin-right: 12px;
	height: ${o => (o.height !== undefined ? o.height - 2 : 0)}px;
`
