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
const bottomBarHeight = 69

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
	box-sizing: border-box;
	padding-top: 16px;
	padding-left: 12px;
	padding-right: 12px;
	overflow: hidden;
	text-overflow: clip;
	max-height: ${o => o.height}px;
	width: ${containerWidth}px;
	color: ${theme.colors.primaryTextInverted};
	margin-bottom: 100px;
`

const HoverContentContainer = styled.div<{ height: number }>`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: ${o => o.height}px;
`

const HoverBottomBarContainer = styled.div`
	position: absolute;
	${Alignment(Alignments.BottomStart)}
	width: 100%;
	height: 100%;
`

const HoverBottomBar = styled.div<{ height: number }>`
	${Alignment(Alignments.VerticallyCentered)}
	width: 100%;
	height: ${o => o.height}px;
`

const HoverBottomBarTechUsed = styled.span`
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	overflow: hidden;
	color: ${theme.colors.primaryTextInverted};
`

const DescriptionHolder = styled.div`
	margin-bottom: 100px;
	height: 100%;
	width: 100%;
	background-color: yellow;
`

const HandleHoverTransition = (
	animateHover: boolean,
	hoverProgress: number,
	setHoverProgress: React.Dispatch<number>
) => {
	useEffect(() => {
		let timer = 0

		const stepTime = 16
		const animationLength = 1500
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
	const descriptionHeight = Math.max(0, height - bottomBarHeight)

	const bottomBarHeightCalculated = Math.max(
		bottomBarHeight,
		Math.max(bottomBarHeight, 0)
	)

	return (
		<HoverContentContainer height={height}>
			<Description height={descriptionHeight}>
				{project.description}
			</Description>
			<HoverBottomBarContainer>
				<HoverBottomBar height={bottomBarHeightCalculated}>
					<HoverBottomBarTechUsed>HELLO WORLD</HoverBottomBarTechUsed>
				</HoverBottomBar>
			</HoverBottomBarContainer>
		</HoverContentContainer>
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
