import { MathExtensions } from "@/utils/mathExtensions"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "@/ui/alignment"
import theme from "@/theme/theme"
import { Row } from "@/components/Row"
import { Column } from "@/components/Column"
import { transparentize } from "polished"

export const containerWidth = 450
export const hoverContainerInitialHeight = 30
export const containerHeight = 272

const containerPaddingHorizontal = 12
export const bottomBarHeight = 69

export const getHeight = (hoverProgress: number) => {
	// noinspection JSSuspiciousNameCombination
	return MathExtensions.lerp(
		hoverContainerInitialHeight,
		containerHeight,
		hoverProgress,
	)
}

export const Title = styled.span`
	${Alignment(Alignments.Centered)}
	position: absolute;
	width: 100%;
	height: ${hoverContainerInitialHeight}px;
	color: ${theme.colors.primaryTextInverted};
`

export const Container = styled.div<{ height: number }>`
	background-color: ${transparentize(0.3, "black")};
	width: ${containerWidth}px;
	height: ${o => o.height}px;
`

export const Description = styled.span<{ height: number }>`
	position: absolute;
	width: ${containerWidth}px;
	max-height: ${o => o.height}px;
	margin-bottom: 100px;
	padding-top: 16px;
	padding-left: ${containerPaddingHorizontal}px;
	padding-right: ${containerPaddingHorizontal}px;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: clip;
	font-size: 0.9em;
	color: ${theme.colors.primaryTextInverted};
`

export const BottomBar = styled(Row)<{ height: number }>`
	position: absolute;
	width: 100%;
	height: ${o => o.height}px;
	padding-left: ${containerPaddingHorizontal}px;
	padding-right: ${containerPaddingHorizontal}px;
	bottom: 0;
	box-sizing: border-box;
`

export const TechUsed = styled(Column)`
	${Alignment(Alignments.TopStart)};
	width: 100%;
	height: 100%;
	overflow: hidden;
	color: ${theme.colors.primaryTextInverted};
`

export const TechUsedTitle = styled.b`
	width: 100%;
	margin-top: 8px;
	overflow: hidden;
	font-weight: bold;
`

export const TechUsedText = styled.span`
	padding-top: 10px;
	font-size: 0.825em;
	overflow: hidden;
`

export const BottomBarIconHolder = styled(Column)`
	${Alignment(Alignments.Centered)}
	width: 42px;
	height: 100%;
	gap: 6px;
	cursor: pointer;
	padding-left: 4px;
	padding-right: 4px;
	user-select: none;

	&:hover {
		background-color: ${transparentize(0.95, "white")};
	}
`

export const BottomBarIcon = styled.img`
	width: 34px;
	height: 34px;
	pointer-events: none;
	user-select: none;
`

export const BottomBarIconText = styled.span`
	color: ${theme.colors.primaryTextInverted};
	font-size: 0.8em;
	font-weight: 500;
	user-select: none;
	pointer-events: none;
`
