import type { Project } from "../projectsSlice"
import { useState } from "react"
import styled from "@emotion/styled"
import {
	Alignment,
	Alignments
} from "../../../../components/common/CommonProps"
import { keyframes } from "@emotion/react"
import { transparentize } from "polished"

const containerWidth = 450
const containerHeight = 275
const hoverContainerInitialHeight = 50

const Container = styled.div`
	display: flex;
	background-color: red;
	height: ${containerHeight}px;
	width: ${containerWidth}px;
`

const ContentContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`

const Video = styled.a`
	background-color: red;
	height: 100%;
	width: 100%;
`

const HoverContainer = styled.div`
	position: absolute;
	${Alignment(Alignments.Bottom)};
	width: ${containerWidth};
	height: ${containerHeight}px;
`

const hoverAppear = keyframes`
	from {
		height: ${hoverContainerInitialHeight}px;
	}
	to {
		height: ${containerHeight}px;
	}
`

const hoverDisappear = keyframes`
	from {
		height: ${hoverContainerInitialHeight}px;
	}
	to {
		height: ${containerHeight}px;
	}
`

const HoverAppear = styled.div<{ animateHover: boolean }>`
	width: ${containerWidth}px;
	height: ${o =>
		o.animateHover ? containerHeight : hoverContainerInitialHeight}px;

	background-color: ${transparentize(0.3, "black")};

	animation: ${o => (o.animateHover ? hoverAppear : "none")} 0.6s;
`
const Title = styled.span``
const Description = styled.span``

interface ProjectWindowContentItemProps {
	project: Project
}

export const ProjectWindowContentItem = ({
	project
}: ProjectWindowContentItemProps) => {
	const [animateHover, setAnimateHover] = useState(false)

	return (
		<>
			<Container onMouseEnter={() => setAnimateHover(true)}>
				<ContentContainer>
					<Video></Video>
					<Title>{project.title}</Title>
				</ContentContainer>
				<HoverContainer>
					<HoverAppear animateHover={animateHover} />
				</HoverContainer>
			</Container>
		</>
	)
}
