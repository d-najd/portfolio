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
import theme from "../../../../theme/theme"

const containerWidth = 450
const containerHeight = 275
const hoverContainerInitialHeight = 30
const bottomBarHeight = 75

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
	text-overflow: clip;
`

const HoverAppear = styled.div<{ height: number }>`
	width: ${containerWidth}px;
	height: ${o => o.height}px;
	background-color: ${transparentize(0.3, "black")};
`
const Title = styled.span`
	position: absolute;
	${Alignment(Alignments.Centered)}
	color: ${theme.colors.primaryTextInverted};
	height: ${hoverContainerInitialHeight}px;
	width: 100%;
`

const Description = styled.span<{ height: number }>`
	position: absolute;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: yellow;
	height: ${o => o.height}px;
	width: ${containerWidth}px;
`

const HoverBottomBar = styled.div<{ height: number }>``

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

const getHeight = (hoverProgress: number) => {
	// noinspection JSSuspiciousNameCombination
	return MathExtensions.lerp(
		hoverContainerInitialHeight,
		containerHeight,
		hoverProgress
	)
}

interface HoverContentProps {
	project: Project
	hoverProgress: number
}

const HoverContent = ({ project, hoverProgress }: HoverContentProps) => {
	if (hoverProgress === 0) {
		return <Title>{project.title}</Title>
	}

	const height = getHeight(hoverProgress)
	const descriptionHeight = Math.min(
		height,
		containerHeight - bottomBarHeight
	)

	return (
		<>
			<Description height={descriptionHeight}>
				{project.description}
			</Description>
		</>
	)
}

interface ProjectWindowContentItemProps {
	project: Project
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
				</ContentContainer>
				<HoverContainer>
					<HoverAppear height={getHeight(hoverProgress)}>
						<HoverContent
							project={project}
							hoverProgress={hoverProgress}
						/>
					</HoverAppear>
				</HoverContainer>
			</Container>
		</>
	)
}
