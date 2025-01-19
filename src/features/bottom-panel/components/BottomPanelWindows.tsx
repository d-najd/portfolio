import { Row } from "@/components/Row"
import styled from "@emotion/styled"
import { BottomPanelWindow } from "./BottomPanelWindow"
import { useWindows } from "@/features/window/windowSlice"
import { Alignment, Alignments } from "@/ui/alignment"
import React from "react"

export const BottomPanelWindows = React.memo(() => {
	const windows = useWindows()

	return (
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
	)
})

const Container = styled(Row)`
	${Alignment(Alignments.CenteredStart)};
	padding-left: 8px;
	gap: 4px;
`
