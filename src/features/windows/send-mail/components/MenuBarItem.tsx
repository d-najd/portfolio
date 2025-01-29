/*
export const MenuBarItem = () => {
	return (
		<Container disabled={true}>File</Container>
	)
}
 */

import styled from "@emotion/styled"
import { useRef } from "react"

interface Props {
	text: string
	containerRect?: DOMRect
}

export const MenuBarItem = ({ text, containerRect }: Props) => {
	const buttonRef = useRef<HTMLButtonElement>(null)

	const test = new ResizeObserver((p, b) => {})

	/*
	useEffect(() => {
		console.log(text)
		console.log(buttonRef.current?.getBoundingClientRect())
		console.log(containerRect)
	}, [buttonRef, containerRect, text])
	 */

	/*
	if (
		buttonRef.current !== null &&
		containerRect !== undefined &&
		buttonRef.current.getBoundingClientRect().right > containerRect.right
	) {
		return <></>
	}
	 */

	return (
		<Container ref={buttonRef} disabled={true}>
			{text}
		</Container>
	)
}

const Container = styled.button`
	padding: 2px 4px;
	background-color: transparent;
	border-color: transparent;
	font-size: 1em;
`
