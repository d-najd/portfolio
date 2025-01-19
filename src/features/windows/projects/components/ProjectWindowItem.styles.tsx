import styled from "@emotion/styled"
import {
	containerHeight,
	containerWidth,
} from "@/features/windows/projects/components/ProjectsWindowItemHoverContent.styles"
import { Alignment, Alignments } from "@/ui/alignment"

export const Container = styled.div`
	width: ${containerWidth}px;
	height: ${containerHeight}px;
	background-color: gray;
`

export const ContentContainer = styled.div`
	position: absolute;
	width: ${containerWidth}px;
	height: ${containerHeight}px;
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
	width: ${containerWidth}px;
	height: ${containerHeight}px;
	text-overflow: clip;
`
