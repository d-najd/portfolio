import { Row } from "../../../components/Row"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import type { MyWindow } from "../../window/WindowSlice"
import { useWindows } from "../../window/WindowSlice"
import { WindowsButton } from "../../../components/WindowsButton"

/**
 * List of opened windows on the bottom panel
 */
export const BottomPanelWindows = () => {
	const windows = useWindows()

	const Container = styled(Row)`
        ${Alignment(Alignments.CenteredStart)};
        padding-left: .5em;
		gap: 0.25em;
	`

	return (
		<>
			<Container>
				{windows.map(curWindow => {
					return <WindowsContainer curWindow={curWindow}/>
				})}
			</Container>
		</>
	)
}

interface WindowContainerProps {
	curWindow: MyWindow
}

export const WindowsContainer = ({ curWindow }: WindowContainerProps) => {
	const ContainerButton = styled(WindowsButton)`
		min-height: 2em;
	`

	const ContainerContent = styled(Row)`
        ${Alignment(Alignments.CenteredStart)};
        padding-left: .2em;
        padding-right: .2em;
	`

	const WindowImage = styled.image`
        min-width: 1em;
        min-height: 1em;
        background-color: red;
	`
	
	const Text = styled.span`
		margin-left: .2em;
	`

	return (<>
		<ContainerButton>
			<ContainerContent>
				<WindowImage/>
				<Text>
					{curWindow.name}
				</Text>
			</ContainerContent>
		</ContainerButton>
	</>)
}