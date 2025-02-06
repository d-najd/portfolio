import type { DesktopIcon } from "../desktopIconsSlice"
import {
	onSelectDesktopIcon,
	selectSelectedDesktopIcon,
} from "../desktopIconsSlice"
import type { DoubleClickState } from "../DesktopIcons"
import { defaultDoubleClickState, doubleClickTolerance } from "../DesktopIcons"
import type React from "react"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { ExecuteActionByDesktopIconType } from "../desktopIconActions"
import * as S from "./DesktopIcon.styles"
import { desktopEntryFactory } from "@/features/shared/desktopEntry"
import { unfocus } from "@/features/window/windowSlice"

interface Props {
	iconData: DesktopIcon
	doubleClickState: DoubleClickState
	setDoubleClickState: React.Dispatch<DoubleClickState>
}

export const DesktopIconTSX = ({
	iconData,
	doubleClickState,
	setDoubleClickState,
}: Props) => {
	const dispatch = useAppDispatch()
	const selectedIcon = useAppSelector(selectSelectedDesktopIcon)

	const handleDoubleClick = useCallback(() => {
		if (
			iconData.id === doubleClickState.id &&
			Date.now() - doubleClickState.timeStamp.getTime() <=
				doubleClickTolerance
		) {
			setDoubleClickState(defaultDoubleClickState())
			ExecuteActionByDesktopIconType(iconData.iconType, dispatch)
		} else {
			// Clicked
			dispatch(unfocus())
			dispatch(onSelectDesktopIcon(iconData.id))
			setDoubleClickState({
				timeStamp: new Date(),
				id: iconData.id,
			})
		}
	}, [iconData, doubleClickState, setDoubleClickState, dispatch])

	return (
		<S.Container onClick={handleDoubleClick}>
			<S.Icon
				src={desktopEntryFactory(iconData.iconType).icon}
				selectedIcon={selectedIcon}
				iconData={iconData}
			/>
			<S.Text selectedIcon={selectedIcon} iconData={iconData}>
				{iconData.iconType}
			</S.Text>
		</S.Container>
	)
}
