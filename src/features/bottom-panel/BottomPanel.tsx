import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/components/common/CommonProps"
import { BottomPanelWindows } from "./components/BottomPanelWindows"
import windowsIco from "@/resources/windows_95_icons/Windows/Windows logo (without text).ico"
import * as S from "./BottomPanel.styles"

export const BottomPanel = () => {
	return (
		<S.Container>
			<S.BottomBarTopLine />
			<S.BottomBar>
				<S.StartButton>
					<Row css={Alignment(Alignments.CenteredStart)}>
						<S.WindowsImage
							src={windowsIco}
							alt={"Windows 95 logo"}
						/>
						<S.WindowsImageText>Start</S.WindowsImageText>
					</Row>
				</S.StartButton>
				<BottomPanelWindows />
			</S.BottomBar>
		</S.Container>
	)
}
