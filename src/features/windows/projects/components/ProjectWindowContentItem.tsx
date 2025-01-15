import styled from "@emotion/styled"
import {
	Alignment,
	Alignments,
	AlignmentSelf
} from "@/components/common/CommonProps"
import { transparentize } from "polished"
import theme from "../../../../theme/theme"
import { Row } from "@/components/Row"
import { Column } from "@/components/Column"
import type React from "react"
import { useEffect, useState } from "react"
import { MathExtensions } from "@/components/mathExtensions"
import type { Project } from "@/features/windows/projects/projectsSlice"
import githubIco from "@/resources/icons/GitHub_Invertocat_Light.svg"

const containerWidth = 450
const containerHeight = 270
const hoverContainerInitialHeight = 30
const bottomBarHeight = 69

const containerPaddingHorizontal = 12

const Container = styled.div`
	display: flex;
	background-color: red;
	width: ${containerWidth}px;
	height: ${containerHeight}px;
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
	overflow: hidden;
	text-overflow: clip;
	font-size: 0.9em;
	max-height: ${o => o.height}px;
	width: ${containerWidth}px;
	color: ${theme.colors.primaryTextInverted};
	margin-bottom: 100px;
	padding-left: ${containerPaddingHorizontal}px;
	padding-right: ${containerPaddingHorizontal}px;
`

const HoverContentContainer = styled.div<{ height: number }>`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: ${o => o.height}px;
`

const HoverBottomBarContainer = styled.div`
	position: absolute;
	${Alignment(Alignments.BottomStart)};
	width: 100%;
	height: 100%;
`

const HoverBottomBar = styled(Row)<{ height: number }>`
	width: 100%;
	height: ${o => o.height}px;
	padding-left: ${containerPaddingHorizontal}px;
	padding-right: ${containerPaddingHorizontal}px;
	box-sizing: border-box;
`

const HoverBottomBarTechUsedHolder = styled(Column)`
	${Alignment(Alignments.TopStart)};
	height: 100%;
	width: 100%;
	overflow: hidden;
	color: ${theme.colors.primaryTextInverted};
`

const HoverBottomBarTechUsed = styled.b`
	margin-top: 8px;
	${AlignmentSelf(Alignments.TopStart)}
	width: 100%;
	overflow: hidden;
	font-weight: bold;
`

const HoverBottomBarTechUsedText = styled.span`
	${AlignmentSelf(Alignments.HorizontallyCentered)};
	font-size: 0.825em;
	padding-top: 10px;
	overflow: hidden;
`

const HoverBottomIconHolder = styled(Column)`
	height: 100%;
	width: 42px;
	margin-right: 4px;
	gap: 6px;
	${AlignmentSelf(Alignments.End)};
	${Alignment(Alignments.Centered)}
`

const HoverBottomIcon = styled.img`
	width: 34px;
	height: 34px;
`

const HoverBottomIconText = styled.span`
	color: ${theme.colors.primaryTextInverted};
	font-size: 0.8em;
	font-weight: 500;
`

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
	}, [animateHover, hoverProgress, setHoverProgress])
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
					<HoverBottomBarTechUsedHolder>
						<HoverBottomBarTechUsed>
							Technologies used:
						</HoverBottomBarTechUsed>
						<HoverBottomBarTechUsedText>
							{project.technologiesUsed}
						</HoverBottomBarTechUsedText>
					</HoverBottomBarTechUsedHolder>
					<HoverBottomIconHolder>
						<HoverBottomIcon src={githubIco} />
						<HoverBottomIconText>Repo</HoverBottomIconText>
					</HoverBottomIconHolder>
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
					<Video />
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
