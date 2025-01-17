import styled from "@emotion/styled"
import { transparentize } from "polished"
import type React from "react"
import { useEffect, useState } from "react"
import type { Project } from "@/features/windows/projects/projectsSlice"
import { Alignment, Alignments } from "@/ui/alignment"
import {
	containerHeight,
	containerWidth,
	getHeight,
	HoverContent
} from "@/features/windows/projects/components/ProjectsWindowItemHoverContent"

const Container = styled.div`
	display: flex;
	background-color: gray;
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

interface ProjectWindowContentItemProps {
	project: Project
}

export const ProjectWindowItem = ({
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
