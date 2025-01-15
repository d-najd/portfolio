import type { Project } from "../projectsSlice"
import type React from "react"
import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import {
	Alignment,
	Alignments
} from "../../../../components/common/CommonProps"
import { transparentize } from "polished"
import { MathExtensions } from "../../../../components/mathExtensions"

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

const HoverAppear = styled.div<{ height: number }>`
	width: ${containerWidth}px;
	height: ${o => o.height}px;
	background-color: ${transparentize(0.3, "black")};
`
const Title = styled.span``
const Description = styled.span``

interface ProjectWindowContentItemProps {
	project: Project
}

const HandleHoverTransition = (
	animateHover: boolean,
	hoverProgress: number,
	setHoverProgress: React.Dispatch<number>
) => {
	useEffect(() => {
		let timer = 0

		const stepTime = 16
		const animationLength = 150
		if (animateHover) {
			timer = setTimeout(() => {
				setHoverProgress(
					Math.min(1, hoverProgress + stepTime / animationLength)
				)
			}, stepTime)
		} else {
			timer = setTimeout(() => {
				setHoverProgress(
					Math.max(0, hoverProgress - stepTime / animationLength)
				)
			}, stepTime)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [animateHover, hoverProgress])
}

export const ProjectWindowContentItem = ({
	project
}: ProjectWindowContentItemProps) => {
	const [animateHover, setAnimateHover] = useState(false)
	const [hoverProgress, setHoverProgress] = useState(0)

	HandleHoverTransition(animateHover, hoverProgress, setHoverProgress)

	// noinspection JSSuspiciousNameCombination
	return (
		<>
			<Container
				onMouseEnter={() => setAnimateHover(true)}
				onMouseLeave={() => setAnimateHover(false)}
			>
				<ContentContainer>
					<Video></Video>
					<Title>{project.title}</Title>
				</ContentContainer>
				<HoverContainer>
					<HoverAppear
						height={MathExtensions.lerp(
							hoverContainerInitialHeight,
							containerHeight,
							hoverProgress
						)}
					></HoverAppear>
				</HoverContainer>
			</Container>
		</>
	)
}
