import styled from "@emotion/styled"
import { selectDesktopIcons } from "./DesktopIconsSlice"
import { DesktopIconTSX } from "./components/DesktopIcon"
import { useAppSelector } from "../../app/hooks"
import useScreenSize from "../../components/useScreenSize"
import { bottomPanelHeight } from "../bottom-panel/BottomPanel"

export const DesktopIcons = () => {
	const desktopIcons = useAppSelector(selectDesktopIcons)
	const screenSize = useScreenSize()
	
	const Container = styled.div`
		padding: 14px;
		position: absolute;
		width: 100%;
		height: ${screenSize.height - bottomPanelHeight}px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
		row-gap: 14px;
		column-gap: 7px;
	`

	return (
		<>
			<Container>
				{desktopIcons.map(icon => {
					return <DesktopIconTSX data={icon} onClick={() => { }}/>
				})}
			</Container>
		</>
	)
}
