import { Row } from "@/components/Row"
import { BottomPanelWindows } from "./components/BottomPanelWindows"
import windowsIco from "@/resources/windows_95_icons/Windows/Windows logo (without text).ico"
import * as S from "./BottomPanel.styles"
import { Alignment, Alignments } from "@/ui/alignment"
import React from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { StartMenu } from "@/features/bottom-panel/components/StartMenu"
import {
	onSetStartMenuSelected,
	selectStartMenuSelected,
} from "@/features/bottom-panel/bottomPanelSlice"
import { unfocus } from "@/features/window/windowSlice"

export const BottomPanel = React.memo(() => {
	const dispatch = useAppDispatch()
	const startMenuSelected = useAppSelector(selectStartMenuSelected)

	return (
		<>
			<S.Container>
				<S.BottomBarTopLine />
				<S.BottomBar>
					<S.StartButton
						onClick={() => {
							const prevState = startMenuSelected

							dispatch(unfocus())
							dispatch(onSetStartMenuSelected(!prevState))
						}}
					>
						<Row css={Alignment(Alignments.CenteredStart)}>
							<S.WindowsImage
								src={windowsIco}
								alt={"Windows 95 logo"}
							/>
							<S.WindowsImageText>Start</S.WindowsImageText>
						</Row>
					</S.StartButton>
					<S.Separator />
					<BottomPanelWindows />
				</S.BottomBar>
			</S.Container>
			{startMenuSelected && <StartMenu />}
		</>
	)
})
