import styled from "@emotion/styled"
import {
	containerHeight,
	containerWidth
} from "@/features/windows/projects/components/ProjectsWindowItemHoverContent.styles"
import { Alignment, Alignments } from "@/ui/alignment"
import { transparentize } from "polished"

export const Container = styled.div`
	width: ${containerWidth}px;
	height: ${containerHeight}px;
	background-color: gray;
`

export const ContentContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`

export const Video = styled.a`
	height: 100%;
	width: 100%;
`

/**
 * Needed to properly determine the height of the container with correct
 * positioning, tried to get rid of this component but couldn
 */
export const HoverContainer = styled.div`
	${Alignment(Alignments.Bottom)};
	position: absolute;
	width: ${containerWidth};
	height: ${containerHeight}px;
	text-overflow: clip;
`

export const HoverAppear = styled.div<{ height: number }>`
	width: ${containerWidth}px;
	height: ${o => o.height}px;
	background-color: ${transparentize(0.3, "black")};
`
