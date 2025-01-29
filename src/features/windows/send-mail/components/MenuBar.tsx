import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import { ContentSeparator } from "@/components/ContentSeparator"

export const MenuBar = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [visibleChildren, setVisibleChildren] = useState(0)

	const data = [{ name: "ITEM1" }, { name: "ITEM2" }, { name: "ITEM3" }]

	useEffect(() => {
		if (!containerRef.current) return

		const observer = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const parent = entry.target
				const children = Array.from(parent.children)
				console.log(entry.target.getBoundingClientRect())

				for (let i = 1; i < children.length; i++) {
					const child = children[i]
					if (
						child.getBoundingClientRect().right >=
						entry.target.getBoundingClientRect().right
					) {
						console.log(child.getBoundingClientRect())
						console.log(`SETTING ${i}`)
						setVisibleChildren(i - 1)
						break
					} else if (i === children.length - 1) {
						console.log("HEELLOOO")
						setVisibleChildren(i)
					}
				}

				console.log(visibleChildren)
			})
		})

		observer.observe(containerRef.current)

		return () => {
			observer.disconnect()
		}
	}, [containerRef, visibleChildren])

	// setContainerRect(containerRef.current?.getBoundingClientRect() ?? undefined)

	/*
	useEffect(() => {
		if (containerRef.current) {
		}
	}, [containerRef])
	
	 */
	/*
			<MenuBarItem disabled={true}>
				<u>F</u>ile
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				<u>E</u>dit
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				<u>V</u>iew
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				<u>I</u>nsert
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				F<u>o</u>rmat
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				<u>T</u>ools
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				<u>M</u>essage
			</MenuBarItem>
			<MenuBarItem disabled={true}>
				<u>H</u>elp
			</MenuBarItem>
	
				<MenuBarItem text={"Insert"} containerRect={containerRect} />
			<MenuBarItem text={"Format"} containerRect={containerRect} />
			<MenuBarItem text={"Tools"} containerRect={containerRect} />
			<MenuBarItem text={"Message"} containerRect={containerRect} />
			<MenuBarItem text={"Help"} containerRect={containerRect} />
	 */

	return (
		<Container ref={containerRef}>
			<Separator />
			{data.map((e, i) => {
				return (
					<Item visible={i < visibleChildren} disabled={true}>
						{e.name}
					</Item>
				)
			})}
		</Container>
	)
}

const Container = styled(Row)`
	border: inset gray 2px;
	padding: 2px;
	gap: 25px;
	width: 100%;
	overflow: hidden;
`

interface PropsTest {
	visible: boolean
}

const Item = styled.button<PropsTest>`
	padding: 2px 4px;
	background-color: transparent;
	border-color: transparent;
	font-size: 1em;
	visibility: ${o => (o.visible === true ? "visible" : "hidden")};
`

const Separator = styled(ContentSeparator)`
	margin-right: 12px;
	height: 1.25em;
`
