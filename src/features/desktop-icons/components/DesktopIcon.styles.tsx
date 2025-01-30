import styled from "@emotion/styled"
import { Alignment, Alignments } from "@/ui/alignment"
import type { DesktopIcon } from "@/features/desktop-icons/desktopIconsSlice"
import { Column } from "@/components/Column"

export const Container = styled(Column)`
	${Alignment(Alignments.VerticallyCentered)};
	width: 74px;
	height: 74px;
	text-align: center;
	user-select: all;
	cursor: pointer;
	pointer-events: all;
`

interface IconProps {
	selectedIcon: number
	iconData: DesktopIcon
}

export const Icon = styled.img<IconProps>`
	width: 42px;
	height: 42px;
	image-rendering: pixelated;
	user-select: none;
	pointer-events: none;
	background-color: ${o =>
		o.selectedIcon === o.iconData.id
			? "rgba(0, 0, 255, 0.65)"
			: "transparent"};
	opacity: ${o => (o.selectedIcon === o.iconData.id ? 55 : 100)}%;
`

export const Text = styled.span<IconProps>`
	${Alignment(Alignments.HorizontallyCentered)};
	margin-top: 2px;
	padding: 2px 1px;
	color: white;
	font-size: small;
	user-select: none;

	background-color: ${o =>
		o.selectedIcon === o.iconData.id ? "blue" : "transparent"};
	border: ${o =>
		o.selectedIcon === o.iconData.id
			? "rgba(255, 255, 0, 1) dotted 2px"
			: "none"};
`
