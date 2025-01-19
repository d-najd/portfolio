import React, { useEffect, useState } from "react"
import type { Project } from "@/features/windows/projects/projectsSlice"
import { HoverContent } from "@/features/windows/projects/components/ProjectsWindowItemHoverContent"
import * as S from "./ProjectWindowItem.styles"

interface Props {
	project: Project
}

export const ProjectWindowItem = React.memo(({ project }: Props) => {
	const [animateHover, setAnimateHover] = useState(false)
	const [hoverProgress, setHoverProgress] = useState(0)

	HandleHoverTransition(animateHover, hoverProgress, setHoverProgress)

	// noinspection JSSuspiciousNameCombination
	return (
		<>
			<S.Container
				onMouseEnter={() => setAnimateHover(true)}
				onMouseLeave={() => setAnimateHover(false)}
			>
				<S.ContentContainer>
					<S.Video />
				</S.ContentContainer>
				<S.HoverContainer>
					<HoverContent
						project={project}
						hoverProgress={hoverProgress}
					/>
				</S.HoverContainer>
			</S.Container>
		</>
	)
})

/**
 * Handles animating the hover transition
 */
const HandleHoverTransition = (
	animateHover: boolean,
	hoverProgress: number,
	setHoverProgress: React.Dispatch<number>
) => {
	useEffect(() => {
		let timer = 0

		/**
		 * How many ms should pass before each animation update
		 */
		const stepTime = 16
		/**
		 * How long should the animation last in ms
		 */
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
