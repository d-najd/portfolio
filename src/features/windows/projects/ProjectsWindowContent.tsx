import { useAppSelector } from "../../../app/hooks"
import type { Project } from "./projectsSlice"
import { selectWindowProjectsList } from "./projectsSlice"
import styled from "@emotion/styled"
import type { MyWindow } from "../../window/windowSlice"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { transparentize } from "polished"
import { useState } from "react"
import { keyframes } from "@emotion/react"

interface ProjectsWindowContentProps {
	myWindow: MyWindow
	/** px */
	contentWidth: number
	/** px */
	contentHeight: number
}

const containerWidth = 450
const containerHeight = 275
const hoverContainerInitialHeight = 50

export const ProjectsWindowContent = ({
	myWindow,
	contentWidth,
	contentHeight
}: ProjectsWindowContentProps) => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	const Root = styled.div`
		${Alignment(Alignments.HorizontallyCentered)}
		position: absolute;
		width: ${contentWidth}px;
		height: ${contentHeight}px;
		padding-top: 17px;
		overflow: hidden;
		display: flex;
		background-color: yellow;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 17px;
	`

	return (
		<Root>
			{listProjects.map((o, index) => {
				return <ProjectWindowContentItem project={o} key={index} />
			})}
		</Root>
	)
}

interface ProjectWindowContentItemProps {
	project: Project
}

const ProjectWindowContentItem = ({
	project
}: ProjectWindowContentItemProps) => {
	const [animateHover, setAnimateHover] = useState(false)

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

	/*
	
		height: ${animateHover
			? containerHeight
			: hoverContainerInitialHeight}px;
	 */

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
		height: ${animateHover
			? containerHeight
			: hoverContainerInitialHeight}px;

		background-color: ${transparentize(0.3, "black")};

		animation: ${animateHover ? hoverAppear : "none"} 0.6s;
	`
	const Title = styled.span``
	const Description = styled.span``

	return (
		<>
			<Container onMouseEnter={o => setAnimateHover(true)}>
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
