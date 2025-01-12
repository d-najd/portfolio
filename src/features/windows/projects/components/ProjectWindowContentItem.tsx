import type { Project } from "../projectsSlice"
import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import {
	Alignment,
	Alignments
} from "../../../../components/common/CommonProps"
import { keyframes } from "@emotion/react"
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

interface HoverTimer {
	percentage: number
	lastUpdate: number
}

const animationLength = 600

/*
	animation: ${o => (o.animateHover ? hoverAppear : "none")}
		${animationLength}ms;
		
	animation: ${o =>
			o.animateHover === HoverState.Idle
				? "none"
				: o.animateHover === HoverState.Hovering
					? hoverAppear
					: hoverDisappear}
		${animationLength}ms;
	animation-play-state: paused;
	
	height: ${o =>
		o.animateHover === HoverState.Hovering
			? containerHeight
			: hoverContainerInitialHeight}px;
 */

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

export const ProjectWindowContentItem = ({
	project
}: ProjectWindowContentItemProps) => {
	const [animateHover, setAnimateHover] = useState(false)
	const [hoverTimer, setHoverTimer] = useState(0)

	useEffect(() => {
		let timer = 0

		const stepTime = 12
		const stepSize = 8 * stepTime
		if (animateHover) {
			timer = setTimeout(() => {
				setHoverTimer(
					Math.min(1, hoverTimer + stepSize / animationLength)
				)
			}, stepTime)
		} else {
			timer = setTimeout(() => {
				setHoverTimer(
					Math.max(0, hoverTimer - stepSize / animationLength)
				)
			}, stepTime)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [animateHover, hoverTimer])

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
							hoverTimer
						)}
					/>
				</HoverContainer>
			</Container>
		</>
	)
}
