import type { Project } from "@/features/windows/projects/projectsSlice"
import * as S from "./ProjectsWindowItemHoverContent.styles"
import React, { useMemo } from "react"
import { openAndFocusTab } from "@/utils/openAndFocusTab"

interface Props {
	project: Project
	hoverProgress: number
}

const useHeights = (hoverProgress: number) =>
	useMemo(() => {
		const height = S.getHeight(hoverProgress)
		const descriptionHeight = Math.max(0, height - S.bottomBarHeight)
		return [height, descriptionHeight]
	}, [hoverProgress])

export const HoverContent = React.memo(({ project, hoverProgress }: Props) => {
	const [height, descriptionHeight] = useHeights(hoverProgress)
	const bottomBarHeightCalculated = Math.max(
		S.bottomBarHeight,
		Math.max(S.bottomBarHeight, 0),
	)

	if (hoverProgress === 0) {
		return (
			<S.Container height={height}>
				<S.Title>{project.title}</S.Title>
			</S.Container>
		)
	}

	return (
		<S.Container height={height}>
			<S.Description height={descriptionHeight}>
				{project.description}
			</S.Description>
			<S.BottomBar height={bottomBarHeightCalculated}>
				<S.TechUsed>
					<S.TechUsedTitle>Technologies used:</S.TechUsedTitle>
					<S.TechUsedText>{project.technologiesUsed}</S.TechUsedText>
				</S.TechUsed>
				{project.projectLinks.map(projectLink => {
					return (
						<S.BottomBarIconHolder
							key={projectLink.name}
							onClick={o => {
								openAndFocusTab(projectLink.link)
							}}
						>
							<S.BottomBarIcon src={projectLink.icon} />
							<S.BottomBarIconText>
								{projectLink.name}
							</S.BottomBarIconText>
						</S.BottomBarIconHolder>
					)
				})}
			</S.BottomBar>
		</S.Container>
	)
})
