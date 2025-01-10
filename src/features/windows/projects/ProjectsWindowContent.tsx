import { useAppSelector } from "../../../app/hooks"
import { selectWindowProjectsList } from "./projectsSlice"
import styled from "@emotion/styled"
import type { MyWindow } from "../../window/windowSlice"

interface ProjectsWindowContentProps {
	myWindow: MyWindow
	/** px */
	contentWidth: number
	/** px */
	contentHeight: number
}

export const ProjectsWindowContent = ({
	myWindow,
	contentWidth,
	contentHeight
}: ProjectsWindowContentProps) => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	const Root = styled.div`
		position: absolute;
		width: ${contentWidth}px;
		height: ${contentHeight}px;
		overflow: hidden;
	`

	const ContentContainer = styled.div`
		background-color: green;
		width: 500px;
		height: 500px;
	`

	const Video = styled.a`
		background-color: red;
	`
	const Title = styled.span``
	const Description = styled.span``

	return (
		<>
			{listProjects.map(o => {
				return (
					<Root key={o.title}>
						<ContentContainer>
							<Video></Video>
							<Title>{o.title}</Title>
						</ContentContainer>
					</Root>
				)
			})}
		</>
	)
}
