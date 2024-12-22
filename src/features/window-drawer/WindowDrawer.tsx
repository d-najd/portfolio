import { selectWindows } from "../bottom-panel/bottomPanelSlice"
import type { Window } from "../window-manager/windowManagerSlice"
import styled from "@emotion/styled"
import { useAppSelector } from "../../app/hooks"
import { CurTheme } from "../../theme/theme"

export const WindowDrawer = () => {
	const windows = useAppSelector(selectWindows)
	
	const WindowContainer = styled.div<{window: Window}>`
		position: absolute;
		background-color: ${CurTheme().colors.primaryBackground};
		border: ${CurTheme().colors.primaryBorderElevated};
		width: ${o => o.window.width}mm;
		height: ${o => o.window.height}mm;
        margin-left: ${o => o.window.offsetX}mm;
		margin-top: ${o => o.window.offsetY}mm;
	`
	
	return (<>
		{windows.map(window => {
			return (
				<>
					<WindowContainer window={window}>
						{window.name}
					</WindowContainer>
				</>
			)
		})}
	</>)
}
