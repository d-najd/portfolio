import { Row } from "../../../components/Row"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { useWindows } from "../../window/windowSlice"
import { BottomPanelWindow } from "./BottomPanelWindow"

const Container = styled(Row)`
	${Alignment(Alignments.CenteredStart)};
	padding-left: 8px;
	gap: 4px;
`

/**
 * List of opened windows on the bottom panel
 */
export const BottomPanelWindows = () => {
	const windows = useWindows()

	return (
		<>
			<Container>
				{windows.map(curWindow => {
					return (
						<BottomPanelWindow
							curWindow={curWindow}
							key={curWindow.id}
						/>
					)
				})}
			</Container>
		</>
	)
}
